export const handleBlogs = () => {
  const files = readdirSync("./assets/").map((e) => e.replace(".md", ""));
  const headers = {
    "Content-Type": "application/json", // Imposta il tipo di contenuto a HTML
  };
  return new Response(JSON.stringify(files), { headers });
};
