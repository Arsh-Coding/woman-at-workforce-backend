const express = require("express");
const router = express.Router();
const { getApplicantsByJobId } = require("../controller/applicantsController");

// Route to get applicants for a job
router.get("/:jobId", getApplicantsByJobId);

module.exports = router;
