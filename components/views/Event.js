import html from "html-literal";
import Direction from "./Direction";

export default (state) => html`
  </form>
  <h2>Events</h2>
  <section id="direction">
    <table id="directions">
      <tr>
        <th>Street</th>
        <th>City</th>
        <th>State</th>
      </tr>
      ${state.directions
        .map((direction) => {
          //This is how to create a link back to a posted value - will be useful for the map :)
          return `<tr><td><a href="/directions/${direction.from}">${direction.street}</td><td>${direction.city}</td></tr>`;
        })
        .join("")}
    </table>
  </section>
  <div class="routeMap">
    ${outputMap(state)}
  </div>
`;

function outputMap(state) {
  if (typeof state.from !== "undefined" && typeof state.to !== "undefined") {
    /*
      Please refer to the documentation:
      https://developer.mapquest.com/documentation/static-map-api/v5/
    */

    return `<img src="https://www.mapquestapi.com/staticmap/v5/map?key=${process.env.MAPQUEST_API_KEY}&start=${state.from.street},${state.from.city},${state.from.state}&end=${state.to.street},+${state.to.city},+${state.to.state}&size=300,300@2x" alt="">`;
  }
}
