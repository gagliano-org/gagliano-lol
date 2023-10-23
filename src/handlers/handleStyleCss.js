export const handleStyleCss = async () => {
  const css = await Bun.file("./assets/style.css").text();
  const headers = {
    "Content-Type": "text/css", // Imposta il tipo di contenuto a HTML
  };
  return new Response(css, { headers });
};
