// 17 gen
import { Day } from "../../class/Day";

export const mercoledi: Day = new Day({
  pranzo: { isAri: true, primo: "toast" },
  cena: {
    isAri: true,
    secondo: "bistecca_di_maiale",
    contorno: ["insalata", "patatine_fritte"],
  },
});
