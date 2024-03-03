import { Calendario } from "./class/Calendario";
import { venerdi } from "./lib/9/venerdi";
import { sabato } from "./lib/9/sabato";
import { domenica } from "./lib/9/domenica";

enum detergenti {
  sapone_piatti,
}

export const calendario: Calendario = {
  venerdi,
  sabato,
  domenica,
};
