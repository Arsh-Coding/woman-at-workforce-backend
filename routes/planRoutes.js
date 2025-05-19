const express = require("express");
const router = express.Router();
const { getAllPlans, createPlan } = require("../controller/planController");

// GET all plans
router.get("/", getAllPlans);

// Optional: POST route to add plans (if needed from admin panel)
router.post("/", createPlan);

module.exports = router;
