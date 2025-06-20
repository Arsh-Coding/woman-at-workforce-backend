const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  // role: { type: String, required: true },
  requirements: [{ type: String }],
  responsibilities: [{ type: String }],
  optionalConditions: [{ type: String }],
  importantDetails: [{ type: String }],
});

const jobDataSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  remote: { type: Boolean, required: true }, // Adjusted based on the JSON
  categoryIds: [{ type: Number }], // Array of numbers for categoryIds
  jobType: { type: String, required: true, default: "Full-time" }, // Default value added for jobType
  datePosted: { type: Date, required: true },
  description: { type: String, required: true },
  featured: { type: Boolean, required: true }, // Adjusted to Boolean instead of string
  companyId: { type: Number, required: true },
  salary: { type: String, required: true }, // New: formatted salary string
  roles: [roleSchema],
});

module.exports = mongoose.model("JobData", jobDataSchema, "jobData");
