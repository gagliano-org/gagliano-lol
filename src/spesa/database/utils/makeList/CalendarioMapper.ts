import { Calendario } from "../../class/Calendario";
import { CalendarioScanner } from "./CalendarioScanner";

export class CalendarioMapper {
  constructor(public calendario: Calendario) {}
  getKeysValues = (d: keyof Calendario) =>
    (Object.keys(this.calendario[d]) as (keyof Calendario[string])[]).map(
      new CalendarioScanner(this.calendario, d).scan
    );
}
