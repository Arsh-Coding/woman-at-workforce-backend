const mongoose = require("mongoose");

const jobDataSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  featured: { type: Boolean, required: true },
  remote: { type: Boolean, required: true }, // Adjusted based on the JSON
  categoryIds: [{ type: Number }], // Array of numbers for categoryIds
  jobType: { type: String, required: true, default: "Full-time" }, // Default value added for jobType
  datePosted: { type: String, required: true },
  description: { type: String, required: true },
  featured: { type: Boolean, required: true }, // Adjusted to Boolean instead of string
  companyId: { type: Number, required: true },
});

module.exports = mongoose.model("JobData", jobDataSchema, "jobData");
