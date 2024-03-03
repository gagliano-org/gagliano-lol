import { Calendario } from "./class/Calendario";
import { giovedi as giovedi_50 } from "./lib/50/giovedi";
import { venerdi as venerdi_50 } from "./lib/50/venerdi";
import { sabato as sabato_50 } from "./lib/50/sabato";
import { domenica as domenica_50 } from "./lib/50/domenica";
import { lunedi as lunedi_51 } from "./lib/51/lunedi";
import { martedi as martedi_51 } from "./lib/51/martedi";
import { mercoledi as mercoledi_51 } from "./lib/51/mercoledi";
import { giovedi as giovedi_51 } from "./lib/51/giovedi";

enum detergenti {
  sapone_piatti,
}

export const calendario: Calendario = {
  // giovedi_50,
  lunedi_51,
  martedi_51,
  mercoledi_51,
  giovedi_51,
};
