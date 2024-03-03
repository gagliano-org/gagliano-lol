// 14
import { Day } from "../../class/Day";

export const domenica: Day = new Day({
  pranzo: {
    isAri: true,
    primo: "spaghetti_carbonara",
  },
  cena: {
    isAri: true,
    secondo: ["pizza_margherita", "aceto_balsamico"],
  },
});

domenica.colazione = {
  gi: "cereali_per_yogurt",
  ary: "yogurt_greco",
  mia: "latte_biscotti",
  era: "latte_biscotti",
};
