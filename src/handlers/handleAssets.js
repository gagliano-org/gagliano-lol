export const handleAssets = async (url) => {
  const filename = url.pathname.replace("/assets/", "");
  const md = await Bun.file(`./assets/${filename}`).text();
  const headers = {
    "Content-Type": "text/markdown", // Imposta il tipo di contenuto a HTML
  };
  return new Response(md, { headers });
};
