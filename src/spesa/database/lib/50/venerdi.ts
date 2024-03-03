import { Day } from "../../class/Day";

export const venerdi: Day = new Day({
  pranzo: { isAri: true, primo: "brodo_tortellini", secondo: "toast" },
  cena: { isAri: false, primo: "spaghetti_ragu", dessert: "gelato_cono" },
});
venerdi.merenda_casa.era = ["latte_miele"];
