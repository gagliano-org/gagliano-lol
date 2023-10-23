export const fallback = (url, text) => {
  // subdomains
  const logcall = (path) => console.log(`got a call for ${path}`);
  async function handleGiacomo(url) {
    logcall(url.hostname);
    const file = Bun.file("./src/giacomo.html");
    const html = await file.text();
    console.log(html);
    const headers = {
      "Content-Type": "text/html", // Imposta il tipo di contenuto a HTML
    };
    return new Response(html, { headers });
  }
  function handleArianna(url) {
    logcall(url.hostname);
  }
  function handleNoa(url) {
    logcall(url.hostname);
  }
  function handleMia(url) {
    logcall(url.hostname);
  }
  function handleEra(url) {
    logcall(url.hostname);
  }
  if (url.hostname.includes("giacomo")) return handleGiacomo(url);
  if (url.hostname.includes("arianna")) return handleArianna(url);
  if (url.hostname.includes("noa")) return handleNoa(url);
  if (url.hostname.includes("mia")) return handleMia(url);
  if (url.hostname.includes("era")) return handleEra(url);

  const headers = {
    "Content-Type": "text/html", // Imposta il tipo di contenuto a HTML
  };
  return new Response(text, { headers });
};
