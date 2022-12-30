import html from "html-literal";
import { Stance } from "../../assets/image/slides";
//import { Harley } from "../../assets/image/slides";

export default () => html`
  <section id="bio">
    <h1>Welcome To My Page!</h1>
    <h2>Below are some images I've taken on my journey.</h2>

    <img class="timer" src="${Stance}" />
  </section>
`;
