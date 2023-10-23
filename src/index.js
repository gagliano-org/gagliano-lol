/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

console.log("gagliano kick asses");
console.log("bumbalacaca");

import { Pager } from "@zaionstate/ui";
import { mdToHtmlString } from "./mdToHtmlString";
import page from "page";

const pager = new Pager({ parser: new DOMParser() });

const indexhtml = `
<div id="container">
  <h1>Gagliano Family =)</h1>
  <h3>we are</h3>
  <a href="./giacomo">Giacomo</a>
  <a href="./arianna">Arianna</a>
  <a href="./noa">Noa Josephine</a>
  <a href="./mia">Mia Jacqueline</a>
  <a href="./era">Era Jasmine</a>
</div>
`;

const giacomohtml = `
<div id="container">
  <a id="back" href="./">back</a>
  <p>my Name is Giacomo, here you can find some of the cool stuff I do.</p>
  <p>
    I am working with my team,of which
    <a href="./arianna">arianna</a> on a cool project that we called
    Zaion Network
  </p>
</div>
`;

const arihtml = `
<div id="container">
  <a id="back" href="./">back</a>
  <p>my Name is Arianna, here you can find some of the cool stuff I do.</p>
  <p>
    I am working with my team,of which
    <a href="./giacomo">giacomo</a> on a cool project that we called
    Zaion Network
  </p>
</div>
`;

const noahtml = ``;

const miahtml = ``;

const erahtml = ``;

const index = pager.callbackMaker(indexhtml);

const giacomo = pager.callbackMaker(giacomohtml);

const ari = pager.callbackMaker(arihtml);

const noa = pager.callbackMaker(noahtml);

const mia = pager.callbackMaker(miahtml);

const era = pager.callbackMaker(erahtml);

function blog() {}

page("/", index);
page("/giacomo", giacomo);
page("/arianna", ari);
page("/noa", noa);
page("/mia", mia);
page("/era", era);
page("/blog", blog);
page("/blog/:filename", load);
page();

function load(ctx, next) {
  console.log(ctx);
  mdToHtmlString(
    `assets/${ctx.params.filename}.md`,
    document.getElementById("content")
  );
}
