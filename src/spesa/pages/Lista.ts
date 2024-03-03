import { createArticoli } from "../utils/createArticoli";
import { bringOutScripts } from "../utils/bringOutScripts";

export const Lista = () => {
  const body = document.getElementById("body");
  bringOutScripts(body!);
  const children = body?.childNodes;
  console.log(children);

  if (body?.firstChild) {
    while (body.firstChild) body.removeChild(body.firstChild);
  }
  const container = createArticoli();
  body!.appendChild(container.element);
};
