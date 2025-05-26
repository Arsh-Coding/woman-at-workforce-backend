const JobData = require("../models/job.model");
const User = require("../models/User.model");
const Company = require("../models/company.model");

const getJobs = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const jobs = await JobData.find().skip(offset).limit(limit);

    const totalJobs = await JobData.countDocuments();

    res.json({ jobs, totalJobs });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await JobData.findOne({ id: parseInt(req.params.id) });
    if (!job) return res.status(404).json({ error: "Job not found" });

    const company = await Company.findOne({ id: job.companyId });
    res.json({ job, company });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const getJobStats = async (req, res) => {
  try {
    const totalJobs = await JobData.countDocuments();

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const activeJobs = await JobData.countDocuments({
      datePosted: { $gte: oneYearAgo },
    });

    const users = await User.findById(req.user._id);
    const appliedJobs = users?.appliedJobs?.length;

    res.json({ totalJobs, activeJobs, appliedJobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postJob = async (req, res) => {
  try {
    const user = req.user;

    if (!user || user.role !== "employer") {
      return res.status(403).json({
        success: false,
        message: "Only employers can post jobs",
      });
    }

    const {
      id,
      title,
      location,
      remote,
      categoryIds,
      jobType,
      description,
      featured,
      salary,
      roles,
    } = req.body;

    const companyDetails = user.companyDetails;
    const companyId = companyDetails?.companyId;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Company ID missing in user profile",
      });
    }

    let company = await Company.findOne({ companyId });

    if (!company) {
      company = new Company({
        ...companyDetails,
        createdBy: user._id,
      });
      await company.save();
    }

    if (
      !id ||
      !title ||
      !location ||
      !description ||
      !Array.isArray(roles) ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const job = new JobData({
      id,
      title,
      location,
      remote,
      categoryIds,
      jobType,
      description,
      featured,
      salary,
      roles,
      companyId,
      datePosted: new Date(),
    });

    await job.save();

    await Company.findOneAndUpdate(
      { companyId },
      {
        $addToSet: {
          jobsPosted: {
            jobId: id,
            datePosted: new Date(),
          },
        },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (err) {
    console.error("Error posting job:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { getJobs, getJobById, getJobStats, postJob };

// Let's say "active" jobs are those posted in the last 30 days
// const today = new Date();
// const oneYearAgo = new Date();
// oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
// console.log(oneYearAgo);
// const lastYear = oneYearAgo.toISOString().split("T")[0];
// const activeJobs = await JobData.countDocuments({
//   datePosted: {
//     $gte: oneYearAgo,
//     $lte: today,
//   },
// });
// console.log(today);

// get employer name with the company/
// const company = await Company.findOne({ companyId }).populate("createdBy", "username email");
