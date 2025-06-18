const express = require("express");
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controller/authController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", auth, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
