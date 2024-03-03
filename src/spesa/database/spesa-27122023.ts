import { Calendario } from "./class/Calendario";
import { mercoledi } from "./lib/52/mercoledi";
import { giovedi } from "./lib/52/giovedi";
import { venerdi } from "./lib/52/venerdi";

enum detergenti {
  sapone_piatti,
}

export const calendario: Calendario = {
  mercoledi,
  giovedi,
  venerdi,
};
