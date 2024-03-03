import { Sezioni } from "../../class/Day";

export class KeyGetter {
  constructor(public e: Sezioni) {}
  getter = (k: keyof Sezioni) => this.e[k];
  get = () =>
    (Object.keys(this.e) as (keyof typeof this.e)[]).map(this.getter).flat();
}
