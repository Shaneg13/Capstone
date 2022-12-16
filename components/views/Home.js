import html from "html-literal";
import Harley from "../../assets/image/Harley.png";
import Stance from "../../assets/image/Stance.png";
export default (state) => html`
  <section id="jumbotron">
    <div class="container">
      <!-- <button type="Click Here" class="btn" onclick="openPopup()">
        Start Route
      </button>
      <div class="popup" id="popup">
        <h2>Start Route</h2>
        <p>Your route has been saved!</p>
        <button type="button" onclick="closePopup()">Ok</button>
      </div>
    </div>

    <script>
      let popup = document.getElementById("popup");

      function openPopup() {
        popup.classList.add("open-popup");
      }

      function closePopup() {
        popup.classList.add("close-popup");
      }
    </script>
    <div> -->
      <div></div>
      <h1><img src="${Harley}" class="timer" /></h1>
      <!-- <h1><img src="${Stance}" class="stancer" /></h1> -->
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

// </section>
// <!-- <img id="pc-picture" />
//   <h1>Information</h1>
//   <p>
//     We are glad you could make it to my homework! Above are some links to
//     websites we recommend when building a computer, as well as some apps that
//     the community loves. Here is more information on each of those links.
//   </p>
//   <h3><a href="https://pcpartpicker.com/">PC PartPicker</a></h3>
//   <p>
//     This is a website for you to pick out parts to check compatibility. It
//     allows you to configure a PC and check to see if the parts/compenents fit,
//     and where to buy them. This is your one stop shop for a build guide!
//   </p>
//   <h3>
//     <a href="https://www.userbenchmark.com/Software">PC User Benchmark</a>
//   </h3>
//   <p>
//     Once you've built your PC, head over to PC Benchmark to use their free
//     speed test. This site will let you know just how good (or bad) your new
//     build is in terms of gaming and performance.
//   </p>
//   <h3><a href="https://store.steampowered.com/">Steam</a></h3>
//   <p>
//     Your new PC is built, it runs, now it's time to install some games. Head
//     over to Steam and create an account and access the millions of games in
//     their library, instantly! Don't worry, there are plenty of free games if
//     your wallet is looking thin after your new build.
//   </p>

//   <h3><a href="https://discord.com/">Discord</a></h3>
//   <p>
//     Welcome to the world of communication and collaboration! Discord is where
//     you and your friends can link up and join channels to talk, chat, share
//     links, and stay connected.
//   </p>

//   <h2>Check out our build</h2>
//   <ul>
//     <li>Here are a few of the parts we've pieced together</li>
//     <li>Graphics Card - 3080ti</li>
//     <li>Liquid Cooler - Corsair 280mm</li>
//     <li>32gb Corasir Vengeance</li>
//   </ul>
// </section> -->
