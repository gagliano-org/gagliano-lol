// https://bun.sh/guides/read-file/string

import { handleStyleCss } from "./src/handlers/handleStyleCss";
import { handleIndexJs } from "./src/handlers/handleIndexJs";
import { handleAssets } from "./src/handlers/handleAssets";
import { handleBlogs } from "./src/handlers/handleBlogs";
import { handleParseMd } from "./src/handlers/handleParseMd";
import { fallback } from "./src/handlers/fallback";

console.log(process.env.DEV);
// string
const getHtml = async (path: string) => {
  const file = Bun.file(path);
  return await file.text();
};

const handleMain = async (url: URL, path = "./index.html") => {
  const html = await getHtml(path);
  if (url.pathname === "/assets/style.css") return await handleStyleCss();
  else if (url.pathname === "/build/index.js") return await handleIndexJs();
  //                                    //
  // /////// ASSETS and QUERIES / API   //
  //                                    //
  else if (url.pathname.includes("/assets/")) return handleAssets(url);
  else if (url.pathname === "/blogs") return handleBlogs();
  else if (url.pathname === "/parsemd") return handleParseMd();
  else return fallback(url, html);
};

const handleSpesa = async (url: URL, path = "./spesa.html") => {
  const html = await getHtml(path);
  if (url.pathname === "/assets/style.css") return await handleStyleCss();
  else if (url.pathname === "/build/index.js")
    return await handleIndexJs("./build/spesa/index.js");
  //                                    //
  // /////// ASSETS and QUERIES / API   //
  //                                    //
  else if (url.pathname.includes("/assets/")) return handleAssets(url);
  else return fallback(url, html);
};

// @ts-expect-error
const server = Bun.serve({
  port: process.env.DEV,
  async fetch(req) {
    const url = new URL(req.url);
    const hostname = url.hostname;
    if (hostname.includes("spesa.")) return handleSpesa(url);
    else return handleMain(url);
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
