import { Day } from "../../class/Day";

export const martedi: Day = new Day({
  pranzo: { isAri: true, primo: "spaghetti_con_salsa" },
  cena: {
    isAri: false,
    secondo: "petto_di_pollo",
    contorno: "patate_lesse",
    dessert: "gelato_cono",
  },
});
