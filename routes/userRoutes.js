const express = require("express");
const {
  getUserProfile,
  applyToJob,
  removeAppliedJob,
} = require("../controller/userController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/:userId", auth, getUserProfile);
router.post("/apply", auth, applyToJob);
router.post("/remove-applied-job", auth, removeAppliedJob);

module.exports = router;
