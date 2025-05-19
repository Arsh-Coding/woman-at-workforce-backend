const User = require("../models/User.model");

// Get all applicants for a specific job ID
const getApplicantsByJobId = async (req, res) => {
  try {
    const jobId = parseInt(req.params.jobId, 10);
    // console.log(jobId);

    if (isNaN(jobId)) {
      return res.status(400).json({ error: "Invalid job ID" });
    }

    const applicants = await User.find({ "appliedJobs.jobId": jobId }).select(
      "username email phone resumeUrl"
    );

    res.status(200).json(applicants);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getApplicantsByJobId,
};
