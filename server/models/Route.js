const mongoose = require("mongoose");
// const { Route } = require("../../store");
// const { stringify } = require("querystring");

const routeSchema = new mongoose.Schema({
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

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;
