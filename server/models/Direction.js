const mongoose = require("mongoose");

const directionSchema = new mongoose.Schema({
  fromState: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/,
  },
  fromCity: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/,
  },

  fromStreet: {
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
