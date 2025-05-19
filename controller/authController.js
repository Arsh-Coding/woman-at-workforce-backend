const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
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

module.exports = { signup, login, logout };
