require("dotenv").config();
const mongoose = require("mongoose");
// console.log(process.env.MONGO_URL);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to MongoDB");
  } catch (error) {
    console.error("Error conneting to mongoDB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
