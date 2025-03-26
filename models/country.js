const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  country_id: { type: String, required: true, unique: true },
  sortname: { type: String, required: true },
  country_name: { type: String, required: true },
});

module.exports = mongoose.model("countries", CountrySchema);
