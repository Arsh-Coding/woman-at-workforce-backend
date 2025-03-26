const Company = require("../models/companyModel");

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findOne({ id: parseInt(req.params.id) });
    if (!company) return res.status(404).json({ error: "Company not found" });

    res.json(company);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
