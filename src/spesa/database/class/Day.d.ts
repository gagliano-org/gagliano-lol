import { Pranzo as P } from "./Pranzo";
import { Cena as C } from "./Cena";
import { Stuzzichino } from "./Stuzzichini";
import { Bevande } from "./Bevande";
import { Merenda_scuola } from "./sezioni/Merende_scuola";
import { Merenda_casa } from "./sezioni/Merende_casa";
import { Colazione } from "./sezioni/Colazioni";
import { Merenda } from "./sezioni/Merende";

declare module "./Day" {
  type Pranzo = P;
  type Cena = C;
  export interface Day {
    colazione: Colazione;
    merenda_casa: Merenda;
    merenda_scuola: Merenda_scuola;
    stuzzichini: Stuzzichino;
    pranzo: P;
    cena: C;
    bevande: Bevande;
  }

  export type Sezioni = Day[keyof Day];
}
