const JobData = require("../models/job.model");
const User = require("../models/User.model");
const Company = require("../models/company.model");

const getJobs = async (req, res) => {
  try {
    const jobs = await JobData.find();
    res.json(jobs);
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

module.exports = { getJobs, getJobById, getJobStats };
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