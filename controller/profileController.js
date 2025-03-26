const path = require("path");
const User = require("../models/User");
const updatedProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/${
      req.file.filename
    }`;

    res
      .status(200)
      .json({ message: "Profile picture updated", imageUrl: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const updateProfile = async (req, res) => {
  try {
    debugger;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" }); // Handle user not found
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error); // Log the error for debugging
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = { updatedProfilePic, updateProfile };
