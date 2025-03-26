const upload = require("../middlewares/multerResume");

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    fileUrl: `${req.protocol}://${req.get("host")}/resume/${req.file.filename}`,
  });
};

module.exports = { uploadFile };
