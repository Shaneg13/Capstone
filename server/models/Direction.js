const mongoose = require("mongoose");

const directionSchema = new mongoose.Schema({
  street: {
    type: [String],
    required: true,
    validate: /^[A-Za-z0-9 ]*$/,
  },
  city: {
    type: [String],
    required: true,
    validate: /^[A-Za-z0-9 ]*$/,
  },

  state: {
    type: [String],
    required: true,
    validate: /^[A-Za-z0-9 ]*$/,
  },
});

const Direction = mongoose.model("Direction", directionSchema);

module.exports = Direction;
