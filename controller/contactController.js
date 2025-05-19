const Contact = require("../models/contact.model");

const submitContactForm = async (req, res) => {
  try {
    const { firstname, lastname, email, subject, message } = req.body;

    if (!firstname || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = new Contact({
      firstname,
      lastname,
      email,
      subject,
      message,
    });
    await contact.save();

    res.status(200).json({ message: "Message submitted successfully" });
  } catch (err) {
    console.error("Error saving contact form", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { submitContactForm };
