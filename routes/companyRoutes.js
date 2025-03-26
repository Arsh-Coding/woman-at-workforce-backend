const express = require("express");
const { getCompanyById } = require("../controller/companyController");

const router = express.Router();

router.get("/:id", getCompanyById);

module.exports = router;
