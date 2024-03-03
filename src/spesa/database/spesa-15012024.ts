import { Calendario } from "./class/Calendario";
import { lunedi } from "./lib/3/lunedi";
import { martedi } from "./lib/3/martedi";
import { mercoledi } from "./lib/3/mercoledi";

enum detergenti {
  sapone_piatti,
}

export const calendario: Calendario = {
  lunedi,
  martedi,
  mercoledi,
};
