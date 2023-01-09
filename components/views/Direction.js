import html from "html-literal";

export default (state) => html`
  <h2>Lets Build and Map Your Ride!</h2>
  <form id="direction" method="POST" action="">
    <div id="fromLocation">
      <h3>Starting Location</h3>
      <div class="fixit">
        <label for="fromStreet">Street: </label>
        <input
          type="text"
          name="fromStreet"
          id="fromStreet"
          placeholder="Enter Street Address"
          required
        />
        <label for="fromCity">City: </label>
        <input
          type="text"
          name="fromCity"
          id="fromCity"
          placeholder="Enter City"
          required
        />
        <label for="fromState">State: </label>
        <input
          type="text"
          name="fromState"
          id="fromState"
          placeholder="Enter State Initials"
          required
        />
      </div>

      <h3>Final Location</h3>
      <div class="fixit">
        <label for="toStreet">Street: </label>
        <input
          type="text"
          name="toStreet"
          id="toStreet"
          placeholder="Enter Street Address"
          required
        />
        <label for="toCity">City: </label>
        <input
          type="text"
          name="toCity"
          id="toCity"
          placeholder="Enter City"
          required
        />
        <label for="toState">State: </label>
        <input
          type="text"
          name="toState"
          id="toState"
          placeholder="Enter State Initials"
          required
        />
      </div>
      <br>
      <!-- <div class="fixit">
        <h3>Ride Details</h3>
        <label for="description"></label>
        <input
          type="text"
          name="Details"
          id="description"
          placeholder="Enter Your Details"
          required -->
          <!-- /> -->
</div>

      </div>
    </div>
    <div class="fixit">
      <input type="submit" name="showDirections" value="Show Directions" />
      <input type="submit" name="showRoute" value="Show Route" />
      <label showRoute="showRoute"></label>
    </div>
  </form>
  ;

  <div class="routeMap">
    ${outputMap(state)}
  </div>
  <div class="directions">
    <ul class="directions">
      ${checkDirection(state.directions.maneuvers)}
    </ul>
  </div>
`;

function checkDirection(maneuvers) {
  if (maneuvers) {
    return maneuvers.map(
      (leg) => `<li>${leg.narrative}<br/><img src="${leg.mapUrl}"></li>`
    );
  }

  return `Enter In The Addresses For Your Directions!
  `;
}

function outputMap(state) {
  if (typeof state.from !== "undefined" && typeof state.to !== "undefined") {
    /*
      Please refer to the documentation:
      https://developer.mapquest.com/documentation/static-map-api/v5/
    */

    return `<img src="https://www.mapquestapi.com/staticmap/v5/map?key=${process.env.MAPQUEST_API_KEY}&start=${state.from.street},${state.from.city},${state.from.state}&end=${state.to.street},+${state.to.city},+${state.to.state}&description=${state.description}&size=600,400@2x" alt="">`;
  }
}

// return html`
// <form id="route" method="POST" action="">
//   <h3>Post to Events</h3>
//   <div id="submitRoute"></div>
//   <div class="fixit">
//     <label for="routeDescription">Event Description: </label>
//     <input
//       type="text"
//       name="routeDescription"
//       id="routeDescription"
//       placeholder="Please enter the details about your ride"
//       required
//     />
//     <label for="submit">Click Here to Post Your Event:</label>
//     <input type="submit" name="submitRoute" value="Submit Your Route" />
//   </div>
// </form>
// `;
