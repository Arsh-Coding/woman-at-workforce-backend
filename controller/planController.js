const Plan = require("../models/pricing.model");

// GET all plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();

    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch plans" });
  }
};

// POST a new plan (optional for admin usage)
exports.createPlan = async (req, res) => {
  try {
    const newPlan = new Plan(req.body);
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (err) {
    res.status(400).json({ error: "Failed to create plan" });
  }
};
