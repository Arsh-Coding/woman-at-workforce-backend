const JobData = require("../models/jobModel");
const Company = require("../models/companyModel");

const getJobs = async (req, res) => {
  try {
    const jobs = await JobData.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

getJobById = async (req, res) => {
  try {
    const job = await JobData.findOne({ id: parseInt(req.params.id) });
    if (!job) return res.status(404).json({ error: "Job not found" });

    const company = await Company.findOne({ id: job.companyId });
    res.json({ job, company });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
module.exports = { getJobs, getJobById };
