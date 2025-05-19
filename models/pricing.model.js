const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    jobPostings: Number,
    candidateViews: Number,
    jobDescriptionLength: String,
    resumeDownloadLimit: Number,
    jobVisibilityDays: Number,
    featuredJobs: Boolean,
    emailAlerts: Boolean,
    profileAnalytics: Boolean,
    supportPriority: String,
    branding: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);
