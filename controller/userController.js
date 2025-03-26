const User = require("../models/User");
const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
      address: user.address,
      country: user.country,
      jobDescription: user.jobDescription,
      state: user.state,
      city: user.city,
      imageUrl: user.imageUrl,
      zipCode: user.zipCode,
      google: user.google,
      facebook: user.facebook,
      twitter: user.twitter,
      linkedin: user.linkedin,
      verificationEmail: user.verificationEmail,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = req.user; // Make sure this is populated correctly from auth middleware
    const {
      username,
      email,
      phone,
      website,
      jobDescription,
      address,
      country,
      state,
      imageUrl,
      city,
      zipCode,
      google,
      facebook,
      twitter,
      linkedin,
      verificationEmail,
    } = req.body;

    // Updating fields dynamically if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (website) user.website = website;
    if (jobDescription) user.jobDescription = jobDescription;
    if (address) user.address = address;
    if (country) user.country = country;
    if (state) user.state = state;  
    if (city) user.city = city;
    if (zipCode) user.zipCode = zipCode;
    if (google) user.google = google;
    if (facebook) user.facebook = facebook;
    if (twitter) user.twitter = twitter;
    if (imageUrl) user.imageUrl = imageUrl;
    if (linkedin) user.linkedin = linkedin;
    if (verificationEmail) user.verificationEmail = verificationEmail;

    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
      jobDescription: user.jobDescription,
      address: user.address,
      country: user.country,
      state: user.state,
      city: user.city,
      zipCode: user.zipCode,
      google: user.google,
      facebook: user.facebook,
      twitter: user.twitter,
      linkedin: user.linkedin,
      verificationEmail: user.verificationEmail,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

module.exports = { getUserProfile, updateUserProfile };
