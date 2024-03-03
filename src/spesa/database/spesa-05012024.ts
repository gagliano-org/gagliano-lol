import { Calendario } from "./class/Calendario";
import { venerdi } from "./lib/1/venerdi";
import { sabato } from "./lib/1/sabato";
import { domenica } from "./lib/1/domenica";

enum detergenti {
  sapone_piatti,
}

export const calendario: Calendario = {
  venerdi,
  sabato,
  domenica,
};
