const express = require("express");
const {
  getCompanyById,
  createOrUpdateCompany,
} = require("../controller/companyController");
// const {
//   createCompany,
//   updateCompany,
// } = require("../controller/companyController");

const router = express.Router();

router.get("/:companyId", getCompanyById);
// router.post("/", createOrUpdateCompany); // ➕ Create
router.post("/", createOrUpdateCompany); // 🔄 Update

module.exports = router;
