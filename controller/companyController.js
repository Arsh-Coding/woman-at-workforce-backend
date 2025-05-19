const Company = require("../models/company.model");
const Job = require("../models/job.model");

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
    // console.log("Incoming companyId:", req.params.companyId);
    const company = await Company.findOne({
      companyId: parseInt(req.params.companyId),
    });
    if (!company) {
      console.log("Company not found with companyId:", req.params.companyId);
      return res.status(404).json({
        error: "Company not found",
      });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// exports.createCompany = async (req, res) => {
//   try {
//     const newCompany = new Company(req.body);
//     // console.log("Incoming body:", req.body);
//     await newCompany.save();
//     res.status(201).json(newCompany);
//   } catch (error) {
//     console.error("Error saving company:", error.message); // 👈 better logging
//     res
//       .status(500)
//       .json({ error: error.message || "Failed to create company" });
//   }
// };

// // Update an existing company
// exports.updateCompany = async (req, res) => {
//   try {
//     const companyId = req.params.id;
//     const updatedCompany = await Company.findOneAndUpdate(
//       { id: parseInt(companyId) }, // assuming 'id' is a number in your schema
//       req.body,
//       { new: true }
//     );
//     if (!updatedCompany) {
//       return res.status(404).json({ error: "Company not found" });
//     }
//     res.json(updatedCompany);
//   } catch (error) {
//     console.error("Error Updating company:", error.message); // 👈 better logging
//     res
//       .status(500)
//       .json({ error: error.message || "Failed to create company" });
//   }
// };

// Create or Update a company using upsert

exports.createOrUpdateCompany = async (req, res) => {
  try {
    const companyId = req.body.companyId;
    if (!companyId) {
      return res.status(400).json({ error: "companyId is required" });
    }

    const company = await Company.findOneAndUpdate(
      { companyId: companyId },
      req.body,
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json(company);
  } catch (error) {
    console.error("Failed to create/update company:", error.message);
    res.status(500).json({ error: error.message || "Server Error" });
  }
};
