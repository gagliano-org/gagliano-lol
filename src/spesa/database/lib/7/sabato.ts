// 13
import { Day } from "../../class/Day";

export const sabato: Day = new Day({
  pranzo: { isAri: false, primo: "spaghetti_al_pesto" },
  cena: {
    isAri: true,
    secondo: "bistecca_di_maiale",
    contorno: ["patate_lesse", "spinaci"],
  },
});
