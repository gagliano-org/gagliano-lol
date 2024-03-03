// 14
import { Day } from "../../class/Day";
import { primi } from "../../class/sezioni/Primi";

export const domenica: Day = new Day({
  pranzo: {
    isAri: true,
    primo: "avanzi",
  },
  cena: {
    isAri: true,
    secondo: "hamburger",
    contorno: "patatine_fritte",
  },
});
