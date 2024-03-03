import { Pager } from "@zaionstate/ui";
import { Lista } from "./pages/Lista";

export const body = document.getElementById("body");

import ricette from "./database/ricette.json";
import { TestGun } from "./pages/TestGun";
console.log(JSON.parse(ricette));

body!.style.padding = "1rem";
body!.style.margin = "0";
body!.style.boxSizing = "border-box";

if (localStorage.getItem("gun/")) new TestGun();

const pager = new Pager({ parser: new DOMParser(), baseElementId: "body" });
pager.route("/lista", Lista);
pager.resolve();
const link = document.createElement("a");
link.setAttribute("href", "/lista");
link.textContent = "lista";
body?.appendChild(link);
