import { frontMatterInMdToJSObject } from "@zaionstate/server";
export const handleAssets = async (url) => {
  const filename = url.pathname.replace("/assets/", "");
  const md = await Bun.file(`./assets/${filename}.md`).text();
  const string = await frontMatterInMdToJSObject(md);
  const headers = {
    "Content-Type": "text/markdown", // Imposta il tipo di contenuto a HTML
  };
  return new Response(JSON.parse(string).value, { headers });
};
