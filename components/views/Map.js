import html from "html-literal";

export default (state) => html`
    <div class="mapform">
      <input type="submit" name="showRoute" value="Save Route" />
    </div>
  </form>
  <h2>Route Planner</h2>
  <div id="map"></div>
`;
