import { describe, it, expect } from "bun:test";
import { setReducer } from "./setReducer";

describe(`${setReducer.name}`, () => {
  it(`dovrebbe eliminare i doppioni`, () => {
    const arr = ["ciao", "ciao", "ciao", "ciao", "miao", "bau"].reduce(
      setReducer,
      [] as string[]
    );
    expect(arr).toEqual(["ciao", "miao", "bau"]);
  });
});
