import { Day } from "../../class/Day";
import { primi } from "../../class/sezioni/Primi";

export const domenica: Day = new Day({
  pranzo: {
    isAri: true,
    primo: ["spaghetti_ai_frutti_di_mare", "spaghetti_al_pesto"] as primi[],
  },
  cena: {
    isAri: true,
    secondo: "spezzatino_patate",
  },
});
