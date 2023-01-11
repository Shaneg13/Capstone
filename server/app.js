const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const directions = require("./routers/directions");
const { get } = require("lodash");
const { request } = require("http");

// const { request } = require("http");
const { response } = require("express");

dotenv.config();

// Initialize the Express application
const app = express();

mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};
const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

app.use(cors);
app.use(express.json());
app.use(logging);

app.get("/status", (request, response) => {
  response.status(200).json({ message: "Service Healthy" });
});

app.post("/", (request, response) => {
  const requestData = {
    fromState: request.inputList.fromState.value,
    fromCity: request.inputList.fromCity.value,
    fromStreet: request.inputList.fromStreet.value,
    toState: request.inputList.toState.value,
    toCity: request.inputList.toCity.value,
    toStreet: request.inputList.toStreet.value,
  };
  const responseBody = {
    requestData,
  };
  response.json(responseBody);
});

app.get("/", (request, response) => {
  const requestData = {
    fromState: request.inputList.fromState.value,
    fromCity: request.inputList.fromCity.value,
    fromStreet: request.inputList.fromStreet.value,
    toState: request.inputList.toState.value,
    toCity: request.inputList.toCity.value,
    toStreet: request.inputList.toStreet.value,
  };
  const responseBody = {
    requestData,
  };
  response.json(responseBody);
});

app.use("/directions", directions);

const PORT = process.env.PORT || 4040;

// Tell the Express app to start listening
// Let the humans know I am running and listening on 4040

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
