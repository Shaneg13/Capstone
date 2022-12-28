import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header(state)}
  ${Nav(store.Links)}
  ${Main(state)}
  ${Footer()}
  `;
  afterRender(state);
  router.updatePageLinks();
}
function afterRender(state) {
  //add menu toggle to bars icon in nav bar
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });

  if (state.view === "Direction") {
    const formEntry = document.querySelector("form");
    const directionList = document.querySelector(".directions");

    formEntry.addEventListener("submit", async (event) => {
      event.preventDefault();

      console.log("shane-event:", event);

      directionList.classList.toggle("directions");
      const inputList = event.target.elements;
      console.log("Input Element List", inputList);

      const from = {
        street: inputList.fromStreet.value,
        city: inputList.fromCity.value,
        state: inputList.fromStreet.value,
      };

      store.Direction.from = from;
      store.Route.from = from;

      const to = {
        street: inputList.toStreet.value,
        city: inputList.toCity.value,
        state: inputList.toStreet.value,
      };

      store.Direction.to = to;
      store.Route.to = to;

      if (event.submitter.name === "showDirections") {
        /*
        Please refer to the documentation:
        https://developer.mapquest.com/documentation/directions-api/
      */

        // const directionss = [];
        // for (let input of inputList.directionss) {
        //   if (input.checked) {
        //     directionss.push(input.value);
        //   }
        // }
        // const requestData = {
        //   state: inputList.state.value,
        //   city: inputList.city.value,
        //   street: inputList.street.value,
        //   address: inputList.address.value,
        // };
        // console.log("request Body", requestData);

        axios
          .get(
            `http://www.mapquestapi.com/directions/v2/route?key=${process.env.MAPQUEST_API_KEY}&from=${from.street},${from.city},${from.state}&to=${to.street},+${to.city},+${to.state}`
          )
          // .post(`${process.env.MAPQUEST_API_URL}/routes`, requestData)
          .then((response) => {
            store.Direction.directions = response.data;
            store.Direction.directions.maneuvers =
              response.data.route.legs[0].maneuvers;
            router.navigate("/Direction");
          })
          .catch((error) => {
            console.log("It puked", error);
            return directionList;
          });
      }
      console.log(directionList);

      if (event.submitter.name === "showRoute") {
        router.navigate("/Route");
      }
    });
  }

  if (state.view === "Map") {
    /*
    Please refer to the documentation:
    https://developer.mapquest.com/documentation/mapquest-js/v1.3/
  */

    L.mapquest.key = process.env.MAPQUEST_API_KEY;

    // // 'map' refers to a <div> element with the ID map

    let map = L.mapquest.map("map", {
      center: [42.361145, -71.057083],
      layers: L.mapquest.tileLayer("map"),
      zoom: 11,
      zoomControl: true,
    });

    // map.addControl(L.mapquest.satelliteControl());
    map.addControl(L.mapquest.control());
    {
      map.addControl(
        L.mapquest.geocodingControl({
          position: "topleft",
        })
      );
    }

    function addLayerControl(map) {
      L.control
        .layers(
          {
            Map: L.mapquest.tileLayer("map"),
            Satellite: L.mapquest.tileLayer("satellite"),
            Hybrid: L.mapquest.tileLayer("hybrid"),
            Light: L.mapquest.tileLayer("light"),
            Dark: baseLayer,
            addLayerControl: true,
          },
          {},
          { position: "topleft" }
        )
        .addTo(map);
    }

    let directionsControl = L.mapquest
      .directionsControl({
        className: "",
        directions: {
          options: {
            timeOverage: 25,
            doReverseGeocode: true,
          },
        },
        directionsLayer: {
          startMarker: {
            title: "Drag to change location",
            draggable: true,
            icon: "marker-start",
            iconOptions: {
              size: "sm",
            },
          },
          endMarker: {
            draggable: true,
            title: "Drag to change location",
            icon: "marker-end",
            iconOptions: {
              size: "sm",
            },
          },
          viaMarker: {
            title: "Drag to change route",
          },
          routeRibbon: {
            showTraffic: true,
          },
          alternateRouteRibbon: {
            showTraffic: true,
          },
          paddingTopLeft: [450, 20],
          paddingBottomRight: [180, 20],
        },
        startInput: {
          compactResults: true,
          disabled: false,
          location: {},
          placeholderText: "Starting point or click on the map...",
          geolocation: {
            enabled: true,
          },
          clearTitle: "Remove starting point",
        },
        endInput: {
          compactResults: true,
          disabled: false,
          location: {},
          placeholderText: "Destination",
          geolocation: {
            enabled: true,
          },
          clearTitle: "Remove this destination",
        },
        addDestinationButton: {
          enabled: true,
          maxLocations: 10,
        },
        routeTypeButtons: {
          enabled: true,
        },
        reverseButton: {
          enabled: true,
        },
        optionsButton: {
          enabled: true,
        },
        routeSummary: {
          enabled: true,
          compactResults: false,
        },
        narrativeControl: {
          enabled: true,
          compactResults: false,
          interactive: true,
        },
      })
      .addTo(map);

    // L.mapquest
    //   .textMarker([45, -120], {
    //     text: "Coffee Shop",
    //     subtext: "Iconic coffeehouse chain",
    //     position: "right",
    //     type: "marker",
    //     icon: {
    //       primaryColor: "#333333",
    //       secondaryColor: "#333333",
    //       size: "sm",
    //     },
    //   })
    //   .addTo(map);

    //THIS could be how to add points from a returned value

    // let directionsControl = L.mapquest
    // .directionsControl({
    //   className: "",
    //   directions: {
    //     options: {
    //       timeOverage: 25,
    //       doReverseGeocode: true,

    L.mapquest.directions().route(
      {
        start: [""],
        end: [""],
        waypoints: ["", ""],
      }
      //,
      // (error, response) => {
      //   console.log("error", error);
      //   console.log("directions call back", response);
      // }
    );

    // if (state.view === "Map") {
    //   const mapEntry = document.querySelector("form");
    //   const mapdirectionList = document.querySelector(".map");

    //   mapEntry.addEventListener("submit", async (event) => {
    //     event.preventDefault();

    //     console.log("shane-event:", event);

    //     // mapdirectionList.directionList.toggle(".maps");

    //     const directionList = event.target.elements;
    //     console.log("Direction List", directionList);

    //     const from = {
    //       street: directionList.fromStreet,
    //       city: directionList.fromCity,
    //       state: directionList.fromStreet,
    //     };

    //     store.Map.from = from;
    //     store.Map.from = from;

    //     const to = {
    //       street: directionList.toStreet,
    //       city: directionList.toCity,
    //       state: directionList.toStreet,
    //     };

    //     store.Map.to = to;
    //     store.Map.to = to;

    //     if (event.submitter === "saveMap") {
    //       /*
    //       Please refer to the documentation:
    //       https://developer.mapquest.com/documentation/directions-api/
    //     */
    //       // axios
    //       //   .post(
    //       //     `http://www.mapquestapi.com/directions/v2/route?key=${process.env.MAPQUEST_API_KEY}&from=${from.street},${from.city},${from.state}&to=${to.street},+${to.city},+${to.state}/maps`
    //       //   )
    //       // http://www.mapquestapi.com/datamanager/v2/get-column-types?key=KEY
    //       // .then((response) => {
    //       //   store.Map.directions = response.data;
    //       //   store.Map.directions.maneuvers =
    //       //     response.data.route.legs[0].maneuvers;
    //       //   router.navigate("/Map");
    //       // })
    //       // .catch((error) => {
    //       //   console.log("It puked", error);
    //       // });
    //     }
    //     // if (event.submitter === "saveMap") {
    //     //   router.navigate("/Map");
    //     // }
    //   });
    // }
  }
}

router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home"; // Add a switch case statement to handle multiple routes
    switch (view) {
      case "Home":
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=boston&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
          )
          .then((response) => {
            const kelvinToFahrenheit = (kelvinTemp) =>
              Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

            store.Home.weather = {};
            store.Home.weather.city = response.data.name;
            store.Home.weather.temp = kelvinToFahrenheit(
              response.data.main.temp
            );
            store.Home.weather.feelsLike = kelvinToFahrenheit(
              response.data.main.feels_like
            );
            store.Home.weather.description = response.data.weather[0].main;
            done();
          })
          .catch((err) => console.log(err));
        break;
      default:
        done();
    }
  },
});

router
  .on({
    "/": () => render(),
    ":view": (params) => {
      let view = capitalize(params.data.view);
      render(store[view]);
    },
  })
  .resolve(); //similar to listen method in express - Defining the routs we're listening to
