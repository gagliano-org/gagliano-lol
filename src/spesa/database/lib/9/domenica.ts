// 3
import { Day } from "../../class/Day";

export const domenica: Day = new Day({
  pranzo: {
    isAri: true,
    primo: "spaghetti_carbonara",
  },
  cena: {
    isAri: true,
    secondo: "minestra_patate_pancetta",
  },
});

domenica.colazione = {
  gi: "cereali_per_yogurt",
  ary: "yogurt_greco",
  mia: "latte_biscotti",
  era: "latte_biscotti",
};
