const express = require("express");
const {
  getJobs,
  getJobById,
  getJobStats,
} = require("../controller/jobController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/job-stats", auth, getJobStats);
router.get("/", getJobs);
router.get("/:id", getJobById);

module.exports = router;
