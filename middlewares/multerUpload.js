const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//file type validation
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|svg/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("error: only images (JPG, JPEG, PNG) are allowed!");
  }
};

const upload = multer({
  storage: storage,
  limits: { file: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
});

module.exports = upload;
