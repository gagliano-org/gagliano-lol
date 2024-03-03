// 28
import { Day } from "../../class/Day";

export const mercoledi: Day = new Day({
  pranzo: { isAri: true, primo: "toast" },
  cena: {
    isAri: false,
    secondo: "spaghetti_amatriciana",
    dessert: "gelato_cono",
  },
});
mercoledi.merenda_casa.era = ["pane_cioccolata"];
