import html from "html-literal";
import motomind from "../assets/image/motomind2.png";

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
//   /* <header>
//             <nav class="container">
//                 <nav class="container">
//                     <a href="index.html">Home</a>
//                     <a href="bio.html">Riders Page</a>
//                 </nav>
//             <h1><img src="motomind2.png" class = "center"/></h1>
//         </header> */
// }
