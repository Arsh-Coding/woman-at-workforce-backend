const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true },
    resumeUrl: { type: String },
    website: { type: String },
    jobDescription: { type: String },
    address: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    zipCode: { type: String },
    google: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    verificationEmail: { type: String },
    imageUrl: { type: String },
    password: { type: String, required: true },
    appliedJobs: [
      {
        jobId: { type: Number, required: true },
        dateApplied: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
module.exports = mongoose.model("User", userSchema);
