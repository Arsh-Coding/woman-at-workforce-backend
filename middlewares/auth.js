const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    // console.log("recieved token: ", token);

    if (!token) throw new Error("Token missing");

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // console.log(decoded);
    const user = await User.findById(decoded.userId);
    if (!user) throw new Error("Authentication failed");

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: "Please authenticate" });
  }
};

module.exports = auth;
