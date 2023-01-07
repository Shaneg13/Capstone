import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = new Navigo("/", { strategy: "ALL" });

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

    formEntry.addEventListener("submit", (event) => {
      event.preventDefault();

      console.log("shane-event:", event);

      directionList.classList.toggle("directions");
      const inputList = event.target.elements;
      console.log("Input Element List", inputList);

      const from = {
        street: inputList.fromStreet.value,
        city: inputList.fromCity.value,
        state: inputList.fromState.value,
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
        for (let input of inputList) {
          if (inputList.input) {
            inputList.push(input.value);
          }
        }

        const requestData = {
          fromState: inputList.fromState.value,
          fromCity: inputList.fromCity.value,
          fromStreet: inputList.fromStreet.value,
          toState: inputList.toState.value,
          toCity: inputList.toCity.value,
          toStreet: inputList.toStreet.value,
        };

        // axios
        //   .get(`${process.env.API_URL}/directions`, requestData)
        //   .then((response) => {
        //     console.log(response.data);
        //     store.Direction.directions.push(response.data);
        //     router.navigate("/Route");
        //   })
        //   .catch((error) => {
        //     console.log("WACK", error);
        //   });

        console.log("request Body", requestData);
        /*
        Please refer to the documentation:
        https://developer.mapquest.com/documentation/directions-api/
        */

        Promise.all([
          axios.get(
            `http://www.mapquestapi.com/directions/v2/route?key=${process.env.MAPQUEST_API_KEY}&from=${from.street},${from.city},${from.state}&to=${to.street},+${to.city},+${to.state}`
          ),
          axios.post(`${process.env.API_URL}/directions`, requestData),
        ])

          .then((responses) => {
            console.log("I worked");
            const [mapquest, directions] = responses;
            store.Direction.directions = mapquest.data;
            store.Route.routes = directions.data;
            store.Direction.directions.maneuvers =
              mapquest.data.route.legs[0].maneuvers;
            store.Event.events.push(directions.data);
            console.log("I am Directions.data", directions.data);
            router.navigate("/Direction");
          })

          .catch((error) => {
            console.log("It puked", error);
            // return directionList;
          });
      }
    });
  }
  if (state.view === "Map") {
    /*
    Please refer to the documentation:
    https://developer.mapquest.com/documentation/mapquest-js/v1.3/
  */

    L.mapquest.key = process.env.MAPQUEST_API_KEY;

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

    L.mapquest
      .textMarker([42, -71], {
        text: "Shane's Ride",
        subtext: "Click Here for More Details",
        position: "right",
        type: "marker",
        hover: "Howdy",
        icon: {
          primaryColor: "#333333",
          secondaryColor: "#333333",
          size: "sm",
        },
      })
      .addTo(map);

    L.mapquest.directions().route({
      start: [""],
      end: [""],
      waypoints: ["", ""],
    });

    if (state.view === "Map") {
      const mapEntry = document.querySelector("form");
      const mapdirectionList = document.querySelector(".map");

      mapEntry.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log("shane-event:", event);

        // mapdirectionList.directionList.toggle(".maps");

        const directionList = event.target.elements;
        console.log("Direction List", directionList);

        const from = {
          street: directionList.fromStreet,
          city: directionList.fromCity,
          state: directionList.fromStreet,
        };

        store.Map.from = from;
        store.Map.from = from;

        const to = {
          street: directionList.toStreet,
          city: directionList.toCity,
          state: directionList.toStreet,
        };

        store.Map.to = to;
        store.Map.to = to;
      });
    }
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
  already: (params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";

    render(store[view]);
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
  .resolve(); //similar to listen method in express - Defining the routes we're listening to
