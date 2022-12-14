// import { Header, Nav, Main, Footer } from "./components";
// import * as store from "./store";
// import Navigo from "navigo";
// import { capitalize } from "lodash";
// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

// const router = new Navigo("/");

// function render(state = store.Home) {
//   document.querySelector("#root").innerHTML = `
//   ${Header(state)}
//   ${Nav(store.Links)}
//   ${Main(state)}
//   ${Footer()}
//   `;
//   afterRender(state);
//   router.updatePageLinks();
// }

// function afterRender(state) {
//   //add menu toggle to bars icon in nav bar
//   document.querySelector(".fa-bars").addEventListener("click", () => {
//     document.querySelector("nav > ul").classList.toggle("hidden--mobile");
//   });

//   if (state.view === "Direction") {
//     const formEntry = document.querySelector("form");
//     const directionList = document.querySelector(".directions");

//     formEntry.addEventListener("submit", async (event) => {
//       event.preventDefault();

//       console.log("shane-event:", event);

//       directionList.classList.toggle("directions");
//       const inputList = event.target.elements;
//       console.log("Input Element List", inputList);

//       const from = {
//         street: inputList.fromStreet.value,
//         city: inputList.fromCity.value,
//         state: inputList.fromStreet.value,
//       };

//       store.Direction.from = from;
//       store.Route.from = from;

//       const to = {
//         street: inputList.toStreet.value,
//         city: inputList.toCity.value,
//         state: inputList.toStreet.value,
//       };

//       store.Direction.to = to;
//       store.Route.to = to;

//       if (event.submitter.name === "showDirections") {
//         /*
//         Please refer to the documentation:
//         https://developer.mapquest.com/documentation/directions-api/
//       */

//         axios
//           .get(
//             `http://www.mapquestapi.com/directions/v2/route?key=${process.env.MAPQUEST_API_KEY}&from=${from.street},${from.city},${from.state}&to=${to.street},+${to.city},+${to.state}`
//           )
//           .then((response) => {
//             store.Direction.directions = response.data;
//             store.Direction.directions.maneuvers =
//               response.data.route.legs[0].maneuvers;
//             router.navigate("/Direction");
//           })
//           .catch((error) => {
//             console.log("It puked", error);
//           });
//       }

//       if (event.submitter.name === "showRoute") {
//         router.navigate("/Route");
//       }
//     });
//   }

//   if (state.view === "Map") {
//     /*
//     Please refer to the documentation:
//     https://developer.mapquest.com/documentation/mapquest-js/v1.3/
//   */

//     L.mapquest.key = process.env.MAPQUEST_API_KEY;

//     // 'map' refers to a <div> element with the ID map
//     const map = L.mapquest.map("map", {
//       center: [37.7749, -122.4194],
//       layers: L.mapquest.tileLayer("map"),
//       zoom: 7,
//     });

//     map.addControl(L.mapquest.control());

//     L.mapquest.directions().route({
//       start: "29 Middle St, Newton, MA 02458",
//       end: "29 Middle St, Newton, MA 02458",
//       waypoints: [
//         "166 Newbury St, Framingham, MA 01701",
//         "1111 Great Plain Ave, Needham, MA 02492",
//       ],
//     });
//     if (state.view === "Map") {
//       const formEntry = document.querySelector("form");
//       const directionList = document.querySelector(".maps");

//       formEntry.addEventListener("submit", async (event) => {
//         event.preventDefault();

//         console.log("shane-event:", event);

//         directionList.classList.toggle("maps");
//         const inputList = event.target.elements;
//         console.log("Input Element List", inputList);

//         const from = {
//           street: inputList.fromStreet.value,
//           city: inputList.fromCity.value,
//           state: inputList.fromStreet.value,
//         };

//         store.Direction.from = from;
//         store.Route.from = from;

//         const to = {
//           street: inputList.toStreet.value,
//           city: inputList.toCity.value,
//           state: inputList.toStreet.value,
//         };

//         store.Direction.to = to;
//         store.Route.to = to;

//         if (event.submitter.name === "showDirections") {
//           /*
//           Please refer to the documentation:
//           https://developer.mapquest.com/documentation/directions-api/
//         */

//           axios
//             .get(
//               `http://www.mapquestapi.com/directions/v2/route?key=${process.env.MAPQUEST_API_KEY}&from=${from.street},${from.city},${from.state}&to=${to.street},+${to.city},+${to.state}`
//             )
//             .then((response) => {
//               store.Direction.directions = response.data;
//               store.Direction.directions.maneuvers =
//                 response.data.route.legs[0].maneuvers;
//               router.navigate("/Direction");
//             })
//             .catch((error) => {
//               console.log("It puked", error);
//             });
//         }

//         if (event.submitter.name === "showRoute") {
//           router.navigate("/Route");
//         }
//       });
//     }
//   }
// }

// router.hooks({
//   before: (done, params) => {
//     const view =
//       params && params.data && params.data.view
//         ? capitalize(params.data.view)
//         : "Home"; // Add a switch case statement to handle multiple routes
//     switch (view) {
//       case "Home":
//         axios
//           .get(
//             `https://api.openweathermap.org/data/2.5/weather?q=boston&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
//           )
//           .then((response) => {
//             const kelvinToFahrenheit = (kelvinTemp) =>
//               Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

//             store.Home.weather = {};
//             store.Home.weather.city = response.data.name;
//             store.Home.weather.temp = kelvinToFahrenheit(
//               response.data.main.temp
//             );
//             store.Home.weather.feelsLike = kelvinToFahrenheit(
//               response.data.main.feels_like
//             );
//             store.Home.weather.description = response.data.weather[0].main;
//             done();
//           })
//           .catch((err) => console.log(err));
//         break;
//       default:
//         done();
//     }
//   },
// });

// router
//   .on({
//     "/": () => render(),
//     ":view": (params) => {
//       let view = capitalize(params.data.view);
//       render(store[view]);
//     },
//   })
//   .resolve(); //similar to listen method in express - Defining the routs we're listening to

// var images = newArray("Harley.PNG", "Stance.PNG");
// var image_count = 0;
// function rollover(image_id, millisecs) {
//   var image = document.getElementById(image_id);

//   image.src = images[image_count];

//   image_count++;

//   if (image_count >= images.length) {
//     image_count = o;
//   }
//   setTimeout("rollover('" + image_id + "'," + millisecs + ");", millisecs);
// }

// function rollover(slides, secs) {
//   setTimeout([state.slides.secs[(0, 1)] + secs(2)]);
// }
// if (state.view === "Direction") {
//   const formEntry = document.querySelector("form");
//   const directionList = document.querySelector(".directions");

//   formEntry.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     console.log("shane-event:", event);

//     directionList.classList.toggle("directions");
//     const inputList = event.target.elements;
//     console.log("Input Element List", inputList);

//     const from = {
//       street: inputList.fromStreet.value,
//       city: inputList.fromCity.value,
//       state: inputList.fromStreet.value,
//     };

//     store.Direction.from = from;
//     store.Route.from = from;

//     const to = {
//       street: inputList.toStreet.value,
//       city: inputList.toCity.value,
//       state: inputList.toStreet.value,
//     };

//     store.Direction.to = to;
//     store.Route.to = to;

//     if (event.submitter.name === "showDirections") {
//       /*
//       Please refer to the documentation:
//       https://developer.mapquest.com/documentation/directions-api/
//     */

//       axios
//         .get(
//           `http://www.mapquestapi.com/directions/v2/route?key=${process.env.MAPQUEST_API_KEY}&from=${from.street},${from.city},${from.state}&to=${to.street},+${to.city},+${to.state}`
//         )
//         .then((response) => {
//           store.Direction.directions = response.data;
//           store.Direction.directions.maneuvers =
//             response.data.route.legs[0].maneuvers;
//           router.navigate("/Direction");
//         })
//         .catch((error) => {
//           console.log("It puked", error);
//         });
//     }

//     if (event.submitter.name === "showRoute") {
//       router.navigate("/Route");
//     }
//   });
// }
