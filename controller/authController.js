const User = require("../models/User.model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { generateToken } = require("../services/jwtServices");

const signup = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      role, // "employer" or "jobseeker"
      companyName,
      companyId,
      ...otherProfileData
    } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = {
      username,
      email,
      password: hashedPassword,
      role: role || "jobseeker",
      ...otherProfileData,
    };

    // Only store companyName now if employer
    if (role === "employer") {
      newUserData.companyDetails = {
        companyName,
        companyId,
        phone,
      };
    }

    const user = new User(newUserData);
    const token = generateToken({ userId: user._id });

    user.tokens = [{ token }];

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        companyDetails: user.companyDetails || null,
      },
    });
  } catch (error) {
    console.error("encountered an error -", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ userId: user._id });

    res.json({
      message: "Logged in successfully",
      token,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        ...user._doc,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

const logout = (req, res) => {
  res.json({ message: "Logged out successfully" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist." });
    }
    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <h3>Hello ${user.username},</h3>
        <p>You requested a password reset.</p>
        <p><a href="${resetLink}">Click here to reset your password</a></p>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    console.error("Forgot password Error:", err);
    res.status(500).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "password has been reset successfully" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: err.message });
  }
};
const changePassword = async (req, res) => {
  try {
    const userId = req.user._id; // From middleware after verifying JWT
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Change Password Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
};
