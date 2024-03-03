import { UIDesign } from "@zaionstate/ui";

export const createListaEntry = (
  key: string,
  qty: number,
  ricette: string | null
) => {
  const containerDesing = new UIDesign({
    tag: "div",
    id: "",
    className: "",
  });
  containerDesing.element.style.display = "grid";
  containerDesing.element.style.gridTemplateColumns = "1fr 0.3fr 0.1fr";
  containerDesing.element.style.gridAutoRows = "1fr";
  const textContainer = new UIDesign({
    tag: "div",
    id: key,
    className: "",
  });
  textContainer.element.style.display = "flex";
  textContainer.element.style.placeContent = "space-between";
  const text = new UIDesign({ tag: "p", id: key, className: "" });
  text.setTextContent(key);
  text.element.style.padding = "0";
  text.element.style.margin = "0";
  text.element.style.marginRight = "10px";
  text.element.style.borderBottom = "1px solid black";
  if (ricette) textContainer.element.style.cursor = "pointer";
  if (ricette) text.element.style.width = "-webkit-fill-available ";
  const done = new UIDesign({ tag: "input", id: "text", className: "" });
  done.element.style.height = "1.5rem";
  const status = localStorage.getItem(key);
  console.log(status);

  if (status === "done") (done.element as HTMLInputElement).checked = true;

  done.element.addEventListener("click", e => {
    const id = done.element.previousElementSibling!.id;
    const isItem = localStorage.getItem(id);
    if (!isItem) localStorage.setItem(id, "undone");
    const item = localStorage.getItem(id);
    if (item === "undone") localStorage.setItem(id, "done");
    else localStorage.setItem(id, "undone");
  });
  done.setHtmlAttribute("type", "checkbox");
  const quantity = new UIDesign({ tag: "p", id: "text", className: "" });
  quantity.setTextContent(qty.toString());
  quantity.element.style.padding = "0";
  quantity.element.style.margin = "0";
  const ricetteDesign = new UIDesign({
    tag: "p",
    id: `ric-${key}`,
    className: "",
  });
  ricetteDesign.setTextContent(ricette as string);
  ricetteDesign.element.style.padding = "0";
  ricetteDesign.element.style.margin = "0";
  ricetteDesign.element.style.placeSelf = "end";
  ricetteDesign.element.style.display = "none";
  const freccetta = new UIDesign({ tag: "p", id: "text", className: "" });
  freccetta.setTextContent(`🔽`);
  freccetta.element.style.padding = "0";
  freccetta.element.style.margin = "0";
  freccetta.element.style.display = "inline";
  if (!ricette) containerDesing.addChild(text);
  else textContainer.addChild(text) && containerDesing.addChild(textContainer);
  if (ricette) textContainer.addChild(freccetta);
  if (ricette)
    textContainer.element.addEventListener("click", () => {
      const isNone = ricetteDesign.element.style.display === "none";
      isNone
        ? (ricetteDesign.element.style.display = "block")
        : (ricetteDesign.element.style.display = "none");
    });
  containerDesing.addChild(done);
  containerDesing.addChild(quantity);
  if (ricette) containerDesing.addChild(ricetteDesign);
  return containerDesing.element;
};
