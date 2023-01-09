import html from "html-literal";
import { Stance } from "../../assets/image/slides";
import { Harley } from "../../assets/image/slides";

export default () => html`
  <section id="bio">
    <h1>Welcome To My Page!</h1>
    <h2>Below are some images I've taken on my journey.</h2>

    <img class="timer" src="${Stance}" />
    <img class="timer" src="${Harley}" />
  </section>
  <script>
    var counter = 1;
    setInterval(function() {
      var myCanvas = document.getElementById("slides");
      var img = new slides();
      img.onload = function() {
        ctx.drawSlides(img, 0, 0);
      };

      // I had 4 images in my folder so I checked with 4.
      if (counter == 2) counter = 1;

      // assuming that your image sequence is named 1.jpg, 2.jpg, 3.jpg ....
      img.src = counter + ".Slides";

      counter++;

      // I set the interval to 100 ms, increase or decrease as per your need.
      // If you don't want loop use clearTimeout()
    }, 100);
  </script>
`;
