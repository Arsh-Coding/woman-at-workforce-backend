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
      facebook,
      twitter,
      linkedin,
      verificationEmail,
      createdAt,
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
        twitter,
        linkedin,
        verificationEmail,
        createdAt,
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
    const user = req.user; // Make sure this is populated correctly from auth middleware
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

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
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();

    const {
      _id,
      username,
      email,
      phone,
      website,
      jobDescription,
      address,
      country,
      state,
      city,
      zipCode,
      google,
      facebook,
      twitter,
      linkedin,
      verificationEmail,
    } = user;

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        _id,
        username,
        email,
        phone,
        website,
        jobDescription,
        address,
        country,
        state,
        city,
        zipCode,
        google,
        facebook,
        twitter,
        linkedin,
        verificationEmail,
      },
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
    const { jobId } = req.body;

    if (!jobId && jobId !== 0) {
      return res
        .status(400)
        .json({ success: false, message: "Job ID is required" });
    }

    // Check if job exists in appliedJobs
    const index = user.appliedJobs.indexOf(jobId);
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

module.exports = {
  getUserProfile,
  updateUserProfile,
  applyToJob,
  removeAppliedJob,
};
