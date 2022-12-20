import html from "html-literal";
import motomind from "../assets/image/MMBanner.png";

export default (state) => html`
  <header>
    <h1><img src="${motomind}" class="logo center" /></h1>
    <h1>${state.header}</h1>
  </header>
`;
// var img = document.createElement("img");
// img.src = "motomind2.png";
// var src = document.getElementById("header");
// src.appendChild(img);
// {
