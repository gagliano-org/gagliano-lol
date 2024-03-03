import { Calendario } from "../../class/Calendario";

export class CalendarioScanner {
  constructor(public calendario: Calendario, public d: keyof Calendario) {}
  scan = (s: keyof Calendario[string]) => this.calendario[this.d][s];
}
