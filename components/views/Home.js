import html from "html-literal";
// import Harley from "../../assets/image/Harley.png";
// import Stance from "../../assets/image/Stance.png";
import * as images from "../../assets/image/slides";
export default (state) => {
  const slides = Object.values(images);
  console.log(slides[0]);

  return html`
    <section id="jumbotron">
      <div class="container">
        <div>
          <div class="Intro">
          <h1>Welcome to MotoMind!</h1>
          <h3>
            If you're looking to plan a ride, you're in the right place.
          </h3>
          <h3>
            To get started, you can click on Plan Your Trip to plan a trip with
            multiple locations. If you want to see a listed directions, click on
            Directions.
          </h3>
        </div>
        <h1><img src="${slides[state.slide]}" class="timer" /></h1>
      </div>
      <a href="index.html"></a>
      <div class="weather">
        <button id="imageloop" type="button">"Change Picture"</button>
        <h3>
          The weather in ${state.weather.city} is ${state.weather.description}.
          The temperature is ${state.weather.temp}F, and it feels like
          ${state.weather.feelsLike}F.
        </h3>
      </div>
    </section>
  `;
};
