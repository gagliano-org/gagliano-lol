import { readdirSync } from "fs";
export const handleBlogs = () => {
  // const files = readdirSync("./assets/").map((e) => e.replace(".md", ""));
  const giacomoBlogs = readdirSync("./assets/giacomo/").map((e) =>
    e.replace(".md", "")
  );
  const ariannaBlogs = readdirSync("./assets/ari/").map((e) =>
    e.replace(".md", "")
  );
  const files = { giacomo: giacomoBlogs, arianna: ariannaBlogs };
  const headers = {
    "Content-Type": "application/json", // Imposta il tipo di contenuto a HTML
  };
  return new Response(JSON.stringify(files), { headers });
};
