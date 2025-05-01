const User = require("../models/User.model");

const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/resume/${
    req.file.filename
  }`;
  try {
    await User.findByIdAndUpdate(req.user.id, { resumeUrl: fileUrl });
    res.json({ fileUrl, message: "Resume uploaded and saved to profile" });
  } catch (e) {
    console.error("Error saving resume URL: ", e);
    res.status(500).json({ e: "Internal server error" });
  }
};

module.exports = { uploadFile };
