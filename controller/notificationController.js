const Notification = require("../models/Notification.model");

// @desc Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch notifications", error: error.message });
  }
};

// @desc Create a new notification
const createNotification = async (req, res) => {
  const { title, message, type } = req.body;

  if (!title || !message) {
    return res.status(400).json({ message: "Title and Message are required" });
  }

  try {
    const newNotification = new Notification({ title, message, type });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create notification", error: error.message });
  }
};
module.exports = { createNotification, getAllNotifications };
