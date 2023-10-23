export const handleIndexJs = async () => {
  const js = await Bun.file("./dist/index.js").text();
  const headers = {
    "Content-Type": "application/javascript", // Imposta il tipo di contenuto a HTML
  };
  return new Response(js, { headers });
};
