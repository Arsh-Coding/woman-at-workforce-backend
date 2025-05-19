const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    companyId: { type: Number, required: true },
    companyName: { type: String, required: true },
    companyDescription: { type: String },
    companyEmail: { type: String },
    companyWebsite: { type: String },
    companySize: { type: String },
    companyAddress: { type: String },
    companyIndustry: { type: String },
    jobsPosted: [
      {
        jobId: { type: Number, required: true },
        datePosted: { type: Date, default: Date.now },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema, "companies");
