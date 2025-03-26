const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    id: Number,
    companyName: String,
    companyDescription: String,
    roles: Array,
    requirements: Array,
    responsibilities: Array,
    optionalConditions: Array,
    importantDetails: Array,
  });

module.exports = mongoose.model("Company", CompanySchema, "companies");
