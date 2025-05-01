const Country = require("../models/country.model");
const State = require("../models/state.model");
const City = require("../models/city.model");

exports.getCountries = async (req, res) => {
  try {
    const country = await Country.find();
    res.json(country);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getStatesByCountry = async (req, res) => {
  try {
    // console.log(req.params.countryId);

    const states = await State.find({ country_id: req.params.countryId });
    // console.log(states);
    res.json(states);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getCitiesByStates = async (req, res) => {
  try {
    const { stateId } = req.params;
    const cities = await City.find({ state_id: stateId });
    res.json(cities);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
