const express = require("express");
const {
  getJobs,
  getJobById,
  getJobStats,
  postJob,
} = require("../controller/jobController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/job-stats", auth, getJobStats);
router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", auth, postJob);

module.exports = router;
