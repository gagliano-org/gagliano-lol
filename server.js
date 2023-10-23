// https://bun.sh/guides/read-file/string

import { handleStyleCss } from "./src/handlers/handleStyleCss";
import { handleIndexJs } from "./src/handlers/handleIndexJs";
import { handleAssets } from "./src/handlers/handleAssets";
import { handleBlogs } from "./src/handlers/handleBlogs";
import { handleParseMd } from "./src/handlers/handleParseMd";
import { fallback } from "./src/handlers/fallback";

console.log(process.env.DEV);
// string

const server = Bun.serve({
  port: process.env.DEV,
  async fetch(req) {
    const path = "./index.html";
    const file = Bun.file(path);

    const text = await file.text();
    const url = new URL(req.url);
    if (url.pathname === "/assets/style.css") return await handleStyleCss();
    else if (url.pathname === "/dist/index.js") return await handleIndexJs();
    //                                    //
    // /////// ASSETS and QUERIES / API   //
    //                                    //
    else if (url.pathname.includes("/assets/")) return handleAssets(url);
    else if (url.pathname === "/blogs") return handleBlogs();
    else if (url.pathname === "/parsemd") return handleParseMd();
    else return fallback(url, text);
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
