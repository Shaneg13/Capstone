const { Router } = require("express");
const Route = require("../models/Route");
const router = Router();

// Create record in MongoDB Atlas using Mongoose.js ORM
router.post("/", (request, response) => {
  const newMap = new Route(request.body);
  newMap.save((error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

// Get (Read) all records from the collection/database
router.get("/", (request, response) => {
  Route.find({}, (error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

module.exports = router;

// router.get("/:id", (request, response) => {
//   Pizza.findById(request.params.id, (error, record) => {
//     if (error) return response.status(500).json(error);
//     return response.json(record);
//   });
// });

// router.delete("/:id", (request, response) => {
//   Pizza.findByIdAndRemove(request.params.id, {}, (error, record) => {
//     if (error) return response.status(500).json(error);
//     return response.json(record);
//   });
// });

// router.put("/:id", (request, response) => {
//   const body = request.body;
//   Pizza.findByIdAndUpdate(
//     request.params.id,
//     {
//       $set: {
//         // Take note that the customer is not included, so it can't
//         crust: body.crust,
//         cheese: body.cheese,
//         sauce: body.sauce,
//         toppings: body.toppings,
//       },
//     },
//     {
//       new: true,
//       upsert: true,
//     },
//     (error, record) => {
//       if (error) return response.status(500).json(error);
//       return response.json(record);
//     }
//   );
// });
