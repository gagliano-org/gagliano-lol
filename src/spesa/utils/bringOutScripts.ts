export const bringOutScripts = (target: HTMLElement) => {
  const scripts = target.getElementsByTagName("script");
  if (scripts.length)
    while (scripts.length) {
      const currentScript = scripts.item(0)!;
      if (currentScript.type === "module") currentScript.src = "/dist/index.js";
      document.documentElement.appendChild(currentScript);
    }
};
