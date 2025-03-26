const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema({
  state_id: { type: String, required: true, unique: true },
  state_name: { type: String, required: true },
  country_id: { type: String, required: true, ref: "country" },
});

module.exports = mongoose.model("states", StateSchema);
