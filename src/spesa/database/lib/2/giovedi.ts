// 11
import { Day } from "../../class/Day";

export const giovedi: Day = new Day({
  pranzo: { isAri: true, primo: "spaghetti_con_salsa_rosa" },
  cena: {
    isAri: false,
    primo: ["risotto_formaggio", "ditalini_al_burro"],
    dessert: "mandarini",
  },
});
