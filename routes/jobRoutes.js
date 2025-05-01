const express = require("express");
const {
  getJobs,
  getJobById,
  getJobStats,
} = require("../controller/jobController");

const router = express.Router();

router.get("/job-stats", getJobStats);
router.get("/", getJobs);
router.get("/:id", getJobById);

module.exports = router;
