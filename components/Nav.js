import html from "html-literal";

export default (links) => html`
  <nav>
    <i class="fas fa-bars"></i>
    <ul class="hidden--mobile nav-links">
      ${links
        .map(
          (link) =>
            `<li>
            <a href="/${link.title}" title="${link.title}" data-navigo>${link.text}</a></li>`
        )
        .join("")}
    </ul>
  </nav>
`;

// <!-- <nav>
// <i class="fas fa-bars"></i>
// <ul class="hidden--mobile nav-links">
//   <li><a href="">Home</a></li>
//   <li><a href="#form">Contact</a></li>
//   <li><a href="https://github.com/" target="blank">GitHub</a></li>
//   <li>
//     <a href="https://developer.mozilla.org/en-US/" target="blank">MDN</a>
//   </li>
// </ul>
// </nav> -->
// <!-- </nav>
