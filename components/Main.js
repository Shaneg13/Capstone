import html from "html-literal";

import * as views from "./views";

export default (state) => html`
  ${views[state.view](state)}
`;
//{
/* <div class = "pc-content">
<img id = "pc-picture">
<h1>Information</h1>
<div id = "pc-content-list"></div>
<ul> We are glad you could make it to my homework! Above are some links to websites we recommend when building a computer,
as well as some apps that the community loves. Here is more information on each of those links.</ul>
<!-- <li class = "information-on-links"></li> -->
<h3><a href="https://pcpartpicker.com/">PC PartPicker</a></h3>
<ul>This is a website for you to pick out parts to check compatibility. It allows you
    to configure a PC and check to see if the parts/compenents fit, and where to buy them. This is
    your one stop shop for a build guide!
</ul>
<h3><a href="https://www.userbenchmark.com/Software">PC User Benchmark</a></h3>
<ul>Once you've built your PC, head over to PC Benchmark to use their free speed test.
    This site will let you know just how good (or bad) your new build is in terms of gaming and performance.
</ul>
<h3><a href="https://store.steampowered.com/">Steam</a></h3>
<ul>Your new PC is built, it runs, now it's time to install some games. Head over to Steam
    and create an account and access the millions of games in their library, instantly! Don't worry,
    there are plenty of free games if your wallet is looking thin after your new build.
</ul>

<h3><a href="https://discord.com/">Discord</a></h3>
<ul>Welcome to the world of communication and collaboration! Discord is where you and your friends
    can link up and join channels to talk, chat, share links, and stay connected.
</ul>

<h2>Check out our build</h2>
<ul>
<li>Here are a few of the parts we've pieced together</li>
<li>Graphics Card - 3080ti</li>
<li>Liquid Cooler - Corsair 280mm</li>
<li>32gb Corasir Vengeance</li> 
</ul>
<br>
</main>
<ul>
We hope you like our build. Here is a link to purchase this PC's graphics card!
<a href="https://www.amazon.com/GIGABYTE-Graphics-WINDFORCE-GV-N308TGAMING-OC-12GD/dp/B083HZGMWZ/ref=sr_1_1?keywords=3080+ti+gigabyte&qid=1668802330&sprefix=3080+ti+gig%2Caps%2C116&sr=8-1&ufe=app_do%3Aamzn1.fos.765d4786-5719-48b9-b588-eab9385652d5">
Follow This Link to Purchase on Amazon</a>
<li> <a href = "#G-Well's PC Emporium" class = "top">Back to Top</a></li>
</ul>
<div id = "root"> </div>
</section> */
//}
