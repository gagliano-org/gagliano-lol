/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

console.log("gagliano kick asses");
console.log("bumbalacaca");

import { Pager, UIDesign } from "@zaionstate/ui";
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
  <a href="./blog">Blogs</a>
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

const blogHtml = `
<div id="container"></div>
`;

const index = pager.callbackMaker(indexhtml);

const giacomo = pager.callbackMaker(giacomohtml);

const ari = pager.callbackMaker(arihtml);

const noa = pager.callbackMaker(noahtml);

const mia = pager.callbackMaker(miahtml);

const era = pager.callbackMaker(erahtml);

const blog = async () => {
  const res = await fetch("/blogs");
  const text = await res.text();
  const json = JSON.parse(text);
  pager.callbackMaker(blogHtml)();
  const container = document.getElementById("container");
  const commonclass = "flex fd_column w_maxc ps_c p_1rem";
  const giacomoContainer = new UIDesign({
    tag: "div",
    id: "giacomo-container",
    className: commonclass,
  });
  const ariContainer = new UIDesign({
    tag: "div",
    id: "ari-container",
    className: commonclass,
  });
  const giacomotitle = new UIDesign({ tag: "h3", id: "giacomo-title" });
  const arititle = new UIDesign({ tag: "h3", id: "ari-title" });
  giacomotitle.setInnerText("Giacomo");
  arititle.setInnerText("Arianna");
  giacomoContainer.addChild(giacomotitle);
  ariContainer.addChild(arititle);
  const createA = (id) => {
    const a = new UIDesign({ tag: "a", id: id });
    a.setInnerText(id);
    a.setHtmlAttribute("href", `./blog/${id}`);
    return a;
  };
  const giacomoBlogs = json.giacomo.map((e) => createA(e));
  const ariBlogs = json.arianna.map((e) => createA(e));
  giacomoBlogs.forEach((ui) => giacomoContainer.addChild(ui));
  ariBlogs.forEach((ui) => ariContainer.addChild(ui));
  container.appendChild(giacomoContainer.element);
  container.appendChild(ariContainer.element);
  container.id = "flex container";
  container.className = "flex pc_c ta_c w_100vw h_100vh";
  console.log(giacomoBlogs);
};
// async function blog() {
// }

page("/", index);
page("/giacomo", giacomo);
page("/arianna", ari);
page("/noa", noa);
page("/mia", mia);
page("/era", era);
page("/blog", blog);
page("/blog/:filename", load);
page();

async function load(ctx, next) {
  console.log(ctx);

  const container = document.getElementById("container");
  console.log(container);
  const res = await fetch(`assets/giacomo/${ctx.params.filename}`);
  const text = await res.text();
  container.innerHTML;
  if (container.firstChild) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
  container.innerHTML = text;
  // mdToHtmlString(
  //   `assets/${ctx.params.filename}.md`,
  //   document.getElementById("content")
  // );
}
