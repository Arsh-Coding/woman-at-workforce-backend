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

    // Let's say "active" jobs are those posted in the last 30 days
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));

    const activeJobs = await JobData.countDocuments({
      datePosted: { $gte: thirtyDaysAgo.toISOString().split("T")[0] },
    });

    const users = await User.find({}, "appliedJobs");
    const appliedJobsSet = new Set();

    users.forEach((user) => {
      user.appliedJobs.forEach((jobId) => {
        if (typeof jobId === "number" && jobId > 0 && jobIdSet.has(jobId)) {
          appliedJobsSet.add(jobId);
        }
      });
    });

    const appliedJobs = appliedJobsSet.size;

    res.json({ totalJobs, activeJobs, appliedJobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getJobs, getJobById, getJobStats };
