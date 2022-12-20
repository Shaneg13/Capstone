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
        <h1><img src="${slides[state.slide]}" class="timer" /></h1>

        <h1>I could put anything here</h1>
      </div>

      <a href="index.html"></a>
      <div class="weather">
        <h3>
          The weather in ${state.weather.city} is ${state.weather.description}.
          The temperature is ${state.weather.temp}F, and it feels like
          ${state.weather.feelsLike}F.
        </h3>
      </div>
    </section>
  `;
};
