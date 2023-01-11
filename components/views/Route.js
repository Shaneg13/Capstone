import html from "html-literal";

export default (state) => html`
  <h2>Directions Data</h2>
  <section id="direction">
    <table id="directions">
      <th><h2>Directions From</h2></th>
      <tr>
        <th>Street:</th>
        <td>${state.routes.fromStreet}</td>
        <th>City:</th>
        <td>${state.routes.fromCity}</td>
        <th>State:</th>
        <td>${state.routes.fromState}</td>
      </tr>
      <th><h2>Directions To</h2></th>
      <tr>
        <th>Street:</th>
        <td>${state.routes.toStreet}</td>
        <th>City:</th>
        <td>${state.routes.toCity}</td>
        <th>State:</th>
        <td>${state.routes.toState}</td>
      </tr>
    </table>
  </section>

  <div class="routeMap"></div>

  ${outputMap(state)}
  <section id="direction">
    <table id="directions">
      <table>
        <th>
          <h2>Stored Data</h2>
        </th>
        <tr>
          <th>Street</th>
          <th>City</th>
          <th>State</th>
        </tr>
      </table>
    </table>
  </section>
`;

function outputMap(state) {
  if (typeof state.from !== "undefined" && typeof state.to !== "undefined") {
    return `<img src="https://www.mapquestapi.com/staticmap/v5/map?key=${process.env.MAPQUEST_API_KEY}&start=${state.from.street},${state.from.city},${state.from.state}&end=${state.to.street},+${state.to.city},+${state.to.state}&size=300,300@2x" alt="">`;
  }
}
