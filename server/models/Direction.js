const mongoose = require("mongoose");

const directionSchema = new mongoose.Schema({
  State: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/,
  },
  City: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/,
  },

  Street: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/,
  },
  toStreet: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/,
  },
  toCity: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/,
  },

  toState: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/,
  },
});

const Direction = mongoose.model("Direction", directionSchema);

module.exports = Direction;
