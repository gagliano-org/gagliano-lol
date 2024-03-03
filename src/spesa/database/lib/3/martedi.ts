// 16 gen
import { Day } from "../../class/Day";

export const martedi: Day = new Day({
  pranzo: { isAri: true, primo: "spaghetti_carbonara" },
  cena: {
    isAri: true,
    secondo: "bistecca_di_maiale",
    contorno: ["patate_lesse", "spinaci", "pane"],
  },
});

martedi.colazione = {
  gi: "cereali_per_yogurt",
  ary: "yogurt_greco",
  mia: "latte_biscotti",
  era: "latte_biscotti",
};
