const express = require("express");
const {
  getJobs,
  getJobById,
  getJobStats,
  postJob,
  getAppliedJobs,
  getPostedJobs,
  updateJob,
} = require("../controller/jobController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/getJobs", getJobs);
router.get("/applied", auth, getAppliedJobs);
router.get("/posted", auth, getPostedJobs);
router.get("/job-stats", auth, getJobStats);
router.put("/update-job/:id", auth, updateJob);
router.get("/:id", getJobById);
router.post("/", auth, postJob);

module.exports = router;
