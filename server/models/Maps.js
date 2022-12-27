const mongoose = require("mongoose");
const { stringify } = require("querystring");

const mapSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/,
  },
  city: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },
});

const Map = mongoose.model("Map", mapSchema);

module.exports = Map;
