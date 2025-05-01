const auth = require("../middlewares/auth");
const express = require("express");
const { uploadFile } = require("../controller/resumeController");
const upload = require("../middlewares/multerResume");

const router = express.Router();

router.post("/resume/upload", auth, upload.single("resume"), uploadFile);

module.exports = router;
