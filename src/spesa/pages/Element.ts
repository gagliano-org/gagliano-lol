import { GunNode } from "./GunManager";

export class Element {
  private createKey = (k: string) => {
    const el = document.createElement("p");
    el.textContent = k;
    el.style.margin = "0";
    el.style.marginRight = "1rem";
    return el;
  };
  private createValue = (k: string) => {
    const el = document.createElement("p");
    el.textContent = k;
    el.style.margin = "0";
    return el;
  };
  constructor() {}
  update = (d: GunNode) => {
    const id = d._!["#"];
    delete d["_"];
    const entries = Object.entries(d)
      .filter(e => !e[0].startsWith("#"))
      .map(e => {
        const key = e[0];
        const value = e[1];
        const keyElement = this.createKey(key);
        const valueElement = this.createValue(value as string);
        return [keyElement, valueElement];
      })
      .reduce((a, c, i) => {
        a.style.display = "flex";
        c.forEach(e => a.appendChild(e));
        return a;
      }, document.createElement("div"));
    entries.id = id;
    const existent = document.getElementById(id);
    if (existent) existent.replaceWith(entries);
    else document.body.appendChild(entries);
    console.log(entries);
  };
}
