import { UIDesign } from "@zaionstate/ui";
import { res } from "../database/utils/makeList.test";
import { createListaEntry } from "./createListaEntry";
import { body } from "..";
import { giaInCasa } from "../database/giaInCasa";

type finalTuple = [string, number, null | string];

export const createArticoli = () => {
  const ricette = (e: string): null | string =>
    res.list.get(e)![1].includes("self")
      ? null
      : res.list.get(e)![1].join(", ");
  const isListId = localStorage.getItem("list-id");
  if (!isListId) localStorage.setItem("list-id", res.id);
  const listId = localStorage.getItem("list-id");
  if (listId !== res.id) localStorage.clear();
  const articoli = Array.from(res.list.keys())
    .filter((e) => !giaInCasa.includes(e))
    .sort((a, b) => (a > b ? 1 : -1))
    .map((e) => [e, res.list.get(e)![0], ricette(e)] as finalTuple)
    .map((e) => createListaEntry(...e));
  body!.style.display = "flex";
  body!.style.width = "100vw";
  body!.style.placeContent = "center";
  const container = new UIDesign({
    tag: "div",
    id: "container",
    className: "",
  });
  container.element.style.width = "-webkit-fill-available";
  container.element.style.padding = "2rem";
  container.element.style.border = "1px solid black";
  articoli.forEach((e) => container.element.appendChild(e));
  return container;
};
