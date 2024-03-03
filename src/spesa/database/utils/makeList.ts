import { setReducer } from "./setReducer";
import { Calendario } from "../class/Calendario";
import { CalendarioMapper } from "./makeList/CalendarioMapper";
import { KeyGetter } from "./makeList/KeyGetter";
import { composti } from "../lib/articoli/composti";

let componstiCounter: { [k: string]: number } = {};

export const makeList: {
  (calendario: Calendario): Map<string, [number, string[]]>;
} = calendario => {
  return Object.keys(calendario)
    .map(new CalendarioMapper(calendario).getKeysValues)
    .flat()
    .map(e => new KeyGetter(e).get())
    .flat()
    .filter(e => typeof e !== "boolean")
    .reduce<string[]>(setReducer, [])
    .sort((a, b) => (a > b ? 1 : -1))
    .map(e => {
      if (composti[e as keyof typeof composti]) {
        const ingredienti = composti[e as keyof typeof composti];
        const mappedIngredienti = ingredienti?.map(i => {
          if (!componstiCounter[i]) componstiCounter[i] = 0;
          componstiCounter[i]++;
          return [i, e];
        });
        return mappedIngredienti;
      } else return e;
    })
    .flat()
    .reduce<Map<string, [number, string[]]>>((a, c) => {
      if (!Array.isArray(c)) a.set(c!, [1, ["self"]]);
      else {
        let prev = a.get(c[0]);
        if (!prev) a.set(c[0], [0, []]);
        prev = a.get(c[0]);
        if (!prev) throw new Error("");
        prev[0] = prev[0] + 1;
        prev[1].push(c[1]);
        a.set(c[0], prev);
      }
      return a;
    }, new Map());
};
