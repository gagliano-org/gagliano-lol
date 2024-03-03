// 27
import { Day } from "../../class/Day";

export const giovedi: Day = new Day({
  pranzo: {
    isAri: false,
    primo: ["pizza_cotto_funghi", "pizza_wurstel_patatine"],
  },
  cena: {
    isAri: true,
    secondo: ["hamburger", "egg_muffin_bacon"],
    contorno: ["patatine_fritte"],
    dessert: "mandarini",
  },
});
