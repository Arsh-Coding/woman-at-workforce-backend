const express = require("express");
const {
  getUserProfile,
  applyToJob,
  removeAppliedJob,
  removePostedJob,
  deleteProfile,
} = require("../controller/userController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/:userId", auth, getUserProfile);
router.post("/apply", auth, applyToJob);
router.post("/remove-applied-job", auth, removeAppliedJob);
router.post("/delete-job", auth, removePostedJob);
router.delete("/delete-profile", auth, deleteProfile);

module.exports = router;
