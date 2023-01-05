const { Router } = require("express");
const Direction = require("../models/Direction");
const router = Router();

// Create record in MongoDB Atlas using Mongoose.js ORM
router.post("/", (request, response) => {
  const newDirection = new Direction(request.body);
  newDirection.save((error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

// Get (Read) all records from the collection/database
router.get("/", (request, response) => {
  Direction.find({}, (error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

router.post("/", (request, response) => {
  Direction.find({}, (error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

router.get("/:direction", (request, response) => {
  Direction.find(request.params.direction, (error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

router.get("/:route", (request, response) => {
  Direction.find(request.params.direction, (error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

module.exports = router;
