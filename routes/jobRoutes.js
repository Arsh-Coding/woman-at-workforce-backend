const express = require("express");
const {
  getJobs,
  getJobById,
  getJobStats,
  postJob,
  getAppliedJobs,
  getPostedJobs,
} = require("../controller/jobController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/applied", auth, getAppliedJobs);
router.get("/posted", auth, getPostedJobs);
router.get("/job-stats", auth, getJobStats);
router.get("/:id", getJobById);
router.post("/", auth, postJob);
router.get("/", getJobs);

module.exports = router;
