import { Calendario } from "./class/Calendario";
import { venerdi } from "./lib/7/venerdi";
import { sabato } from "./lib/7/sabato";
import { domenica } from "./lib/7/domenica";

enum detergenti {
  sapone_piatti,
}

export const calendario: Calendario = {
  venerdi,
  sabato,
  domenica,
};
