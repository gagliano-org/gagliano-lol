export const handleIndexJs = async (path = "./build/index.js") => {
  const js = await Bun.file(path).text();
  const headers = {
    "Content-Type": "application/javascript", // Imposta il tipo di contenuto a HTML
  };
  return new Response(js, { headers });
};
