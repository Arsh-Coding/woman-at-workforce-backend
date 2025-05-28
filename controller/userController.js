const User = require("../models/User.model");
const Jobs = require("../models/job.model");
const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const {
      _id,
      username,
      email,
      phone,
      website,
      address,
      country,
      jobDescription,
      state,
      city,
      imageUrl,
      zipCode,
      google,
      role,
      facebook,
      twitter,
      linkedin,
      verificationEmail,
      createdAt,
      companyDetails,
      resumeUrl,
      appliedJobs,
    } = user;

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: {
        _id,
        username,
        email,
        phone,
        website,
        address,
        country,
        jobDescription,
        state,
        city,
        imageUrl,
        zipCode,
        google,
        facebook,
        role,
        twitter,
        linkedin,
        verificationEmail,
        createdAt,
        companyDetails,
        resumeUrl,
        appliedJobs,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Error fetching profile" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = req.user; // Auth middleware must populate this
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Basic user fields that can be updated
    const updatableFields = [
      "username",
      "email",
      "phone",
      "website",
      "jobDescription",
      "address",
      "country",
      "state",
      "city",
      "zipCode",
      "google",
      "facebook",
      "twitter",
      "linkedin",
      "imageUrl",
      "verificationEmail",
      "role", // ✅ Allow role update
    ];

    // Update simple fields
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    // ✅ Update company details if provided
    if (req.body.companyDetails) {
      const companyFields = [
        "companyId",
        "companyName",
        "companyWebsite",
        "companyEmail",
        "companySize",
        "companyIndustry",
        "companyAddress",
        "companyDescription",
      ];

      user.companyDetails = user.companyDetails || {};

      companyFields.forEach((field) => {
        if (req.body.companyDetails[field] !== undefined) {
          user.companyDetails[field] = req.body.companyDetails[field];
        }
      });
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user, // optionally filter sensitive fields
    });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Could not update profile.",
    });
  }
};

const applyToJob = async (req, res) => {
  try {
    const user = req.user;
    const { jobId } = req.body; // jobId will be a number like 1, 2, 3...

    if (!jobId && jobId !== 0) {
      return res
        .status(400)
        .json({ success: false, message: "Job ID required" });
    }

    // Check if already applied
    if (user.appliedJobs.includes(jobId)) {
      return res
        .status(409)
        .json({ success: false, message: "Already applied to this job" });
    }

    user.appliedJobs.push({ jobId: Number(jobId) });
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Job applied successfully",
      appliedJobs: user.appliedJobs,
    });
  } catch (error) {
    console.error("Error applying to job:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const removeAppliedJob = async (req, res) => {
  try {
    const user = req.user;
    // console.log(user.appliedJobs.findIndex((job) => job.jobId === 1));

    const { jobId } = req.body;
    // console.log(jobId);

    if (!jobId && jobId !== 0) {
      return res
        .status(400)
        .json({ success: false, message: "Job ID is required" });
    }

    // Check if job exists in appliedJobs
    const index = user.appliedJobs.findIndex((job) => job.jobId === jobId);
    // console.log(index);

    if (index === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found in applied list" });
    }

    // Remove jobId from appliedJobs
    user.appliedJobs.splice(index, 1);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Job removed from applied list",
      appliedJobs: user.appliedJobs,
    });
  } catch (error) {
    console.error("Error removing applied job:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Could not remove applied job.",
    });
  }
};

const removePostedJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const user = req.user;

    if (user.role !== "employer") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const job = await Jobs.findOneAndDelete({
      id: jobId,
      companyId: user.companyDetails.companyId,
    });

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found or not authorized" });
    }

    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while deleting job" });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (err) {
    console.error("Error deleting profile:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  applyToJob,
  removeAppliedJob,
  removePostedJob,
  deleteProfile,
};
