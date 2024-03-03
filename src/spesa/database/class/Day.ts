import { bevande_standard } from "../lib/bevande_standard";
import { colazione_standard } from "../lib/colazione_standard";
import { merenda_scuola_standard } from "../lib/merdenda_scuola_standard";
import { merenda_casa_standard } from "../lib/merenda_casa_standard";
import { stuzzichini_standard } from "../lib/stuzzichini_standard";
import "./Day.d";

export class Day {
  constructor(props: { pranzo: Pranzo; cena: Cena }) {
    this.pranzo = props.pranzo;
    this.cena = props.cena;
    this.colazione = colazione_standard;
    this.bevande = bevande_standard;
    this.merenda_casa = merenda_casa_standard;
    this.merenda_scuola = merenda_scuola_standard;
    this.stuzzichini = stuzzichini_standard;
  }
}
