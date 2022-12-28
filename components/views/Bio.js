import html from "html-literal";
import { Stance } from "../../assets/image/slides";
import { Harley } from "../../assets/image/slides";

export default () => html`
  <section id="bio"></section>
  <h1>Welcome To My Page!</h1>
  Below are some images I've taken on my journey.
  <img src="${Stance}" class="timer" />
  <img src="${Harley}" class="timer" />
`;
