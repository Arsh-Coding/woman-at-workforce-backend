const express = require("express");
const router = express.Router();
const {
  getAllNotifications,
  createNotification,
} = require("../controller/notificationController");
// import {
//   getAllNotifications,
//   createNotification,
// } from "../controller/notificationController";

// Route: GET /api/notifications
router.get("/", getAllNotifications);

// Route: POST /api/notifications
router.post("/", createNotification);

module.exports = router;
