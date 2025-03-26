const express = require("express");
const router = express.Router();
const locationController = require("../controller/locationController");

router.get("/countries", locationController.getCountries);
router.get("/states/:countryId", locationController.getStatesByCountry);
router.get("/cities/:stateId", locationController.getCitiesByStates);

module.exports = router;
