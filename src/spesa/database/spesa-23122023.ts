import { Calendario } from "./class/Calendario";
import { sabato as sabato_51 } from "./lib/51/sabato";
import { domenica as domenica_51 } from "./lib/51/domenica";
import { lunedi as lunedi_52 } from "./lib/52/lunedi";
import { martedi as martedi_52 } from "./lib/52/martedi";

enum detergenti {
  sapone_piatti,
}

export const calendario: Calendario = {
  sabato_51,
  domenica_51,
  lunedi_52,
  martedi_52,
};
