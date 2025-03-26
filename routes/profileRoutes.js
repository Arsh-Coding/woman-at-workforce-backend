const express = require("express");
const upload = require("../middlewares/multerUpload"); // Import Multer middleware
const { updatedProfilePic } = require("../controller/profileController");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controller/userController");
const auth = require("../middlewares/auth");

const router = express.Router();

// Route to handle profile picture upload
router.post(
  "/uploadProfilePic",
  upload.single("profilePic"),
  updatedProfilePic
);
router.put("/:userId", auth, updateUserProfile);
router.get("/:userId", auth, getUserProfile);

module.exports = router;
