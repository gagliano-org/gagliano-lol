import { bevande } from "../../class/sezioni/Bevande";
import { primi } from "../../class/sezioni/Primi";
import { secondi } from "../../class/sezioni/Secondi";
import { contorni } from "../../class/sezioni/Contorni";
import { merende } from "../../class/sezioni/Merende";

enum dolci_tipi {
  biscotti,
}
type dolci = keyof typeof dolci_tipi;

enum dolci_spalmabili_tipi {
  cioccolata,
}
type dolci_spalmabili = keyof typeof dolci_spalmabili_tipi;

enum salse_tipi {
  ketchup,
  maionese,
  senape,
  cinese,
  soia,
  barbeque,
}
type salse = keyof typeof salse_tipi;

enum companatici_tipi {
  pane,
  riso,
  bun_hamburger,
  bun_hotdog,
  panbauletto,
  pan_carre,
  grissini,
  crackers,
  soba_piccanti,
  farina,
  baguette,
  tagliatelle,
  pane_tramezzini,
}
type companatici = keyof typeof companatici_tipi;

enum spezie_tipi {
  peperoncino,
  pepe,
  sale_grosso,
  sale_fino,
  curry,
  rosmarino,
  alloro,
  salvia,
  zenzero,
  cipolle_fritte,
  prezzemolo,
}
type spezie = keyof typeof spezie_tipi;

enum freschi_tipi {
  uovo,
  cipolle,
  zucchine,
  aglio,
  burro,
  cubetti_pancetta,
  panna_fresca,
  besciamella,
  parmigiano,
  mozzarella,
  patate,
  carote,
  sedano,
  latte,
  sottilette,
  avocado,
  cetriolo,
  sottilette_ceddar,
}
type freschi = keyof typeof freschi_tipi;

enum conserve_tipi {
  olio,
  salsa_pomodoro,
  pesto,
  zucchero,
  tonno,
  olive,
  cetriolini,
  funghi,
  farci_toast,
  condi_riso,
  peperoni,
  miele,
  salsa_funghi_crostini,
  salsa_fegatini_crostini,
  aceto_di_riso,
  salsa_di_soia,
  wasabi,
}
type conserve = keyof typeof conserve_tipi;

enum surgelati_tipi {
  frutti_di_mare,
  spinaci_surgelati,
  verdure_da_fritto,
}
type surgelati = keyof typeof surgelati_tipi;

enum carne_tipi {
  suino,
  vitello,
  manzo,
  pollo,
  prosciutto_crudo,
  prosciutto_cotto,
  speck,
  capocollo,
  tacchino,
  pancetta,
  salame,
  arrosto,
  wurstel,
}
type carne = keyof typeof carne_tipi;

enum pesce_tipi {
  salmone,
  tonno,
  pesce_spada,
}
type pesce = keyof typeof pesce_tipi;

type macinato<T extends carne> = `macinato_di_${T}`;
const macinatoDi = <T extends carne>(a: T): macinato<T> => `macinato_di_${a}`;

type spezzatino<T extends carne> = `spezzatino_di_${T}`;
const spezzatinDi = <T extends carne>(a: T): spezzatino<T> =>
  `spezzatino_di_${a}`;

type cubetti<T extends carne> = `cubetti_di_${T}`;
const cubettiDi = <T extends carne>(a: T): cubetti<T> => `cubetti_di_${a}`;

type svizzera<T extends carne> = `svizzera_di_${T}`;
const svizzeraDi = <T extends carne>(a: T): svizzera<T> => `svizzera_di_${a}`;

enum quick_tipi {
  dry_nudel,
  dado,
}
type quick = keyof typeof quick_tipi;

enum ripieni_tipi {
  tortellini,
}
type ripieni = keyof typeof ripieni_tipi;

enum paste_tipi {
  lasagne,
  spaghetti,
  ditalini,
  orecchiette,
}
type paste = keyof typeof paste_tipi;

type comopositori =
  | dolci_spalmabili
  | dolci
  | spezie
  | salse
  | bevande
  | macinato<any>
  | spezzatino<any>
  | cubetti<any>
  | svizzera<any>
  | paste
  | companatici
  | ripieni
  | freschi
  | quick
  | conserve
  | surgelati
  | pesce
  | carne
  | contorni;

type composti = {
  [k in primi | secondi | contorni | merende]?: comopositori[];
};

export const composti: composti = {
  brodo_nudel_uovo: ["dry_nudel", "uovo"],
  brodo_nudel_uovo_manzo: ["dry_nudel", "uovo", "manzo"],
  brodo_nudel_uovo_pollo: ["dry_nudel", "uovo", "pollo"],
  brodo_tortellini: ["tortellini", "dado"],
  ditalini_al_burro: ["ditalini", "burro", "parmigiano"],
  spaghetti_aglioOlio: ["spaghetti", "aglio"],
  spaghetti_al_burro: ["spaghetti", "burro", "parmigiano"],
  spaghetti_al_pesto: ["spaghetti", "pesto", "parmigiano"],
  spaghetti_con_salsa: [
    "spaghetti",
    "salsa_pomodoro",
    "aglio",
    "olio",
    "cipolle",
    "zucchero",
    "sale_fino",
  ],
  spaghetti_ai_frutti_di_mare: [
    "spaghetti",
    "aglio",
    "olio",
    "vino_bianco",
    "frutti_di_mare",
    "pepe",
    "peperoncino",
  ],
  spaghetti_amatriciana: [
    "spaghetti",
    cubettiDi("pancetta"),
    "vino_rosso",
    "cipolle",
    "olio",
    "peperoncino",
    "salsa_pomodoro",
    "zucchero",
    "sale_fino",
  ],
  spaghetti_carbonara: [
    "spaghetti",
    cubettiDi("pancetta"),
    "vino_rosso",
    "uovo",
    "aglio",
    "olio",
    "panna_fresca",
    "pepe",
    "parmigiano",
    "sale_fino",
  ],
  spaghetti_con_salsa_rosa: [
    "spaghetti",
    "salsa_pomodoro",
    "zucchero",
    "sale_fino",
    "aglio",
    "olio",
    "panna_fresca",
    "cipolle",
  ],
  spaghetti_pannaEsalsiccia: [
    "spaghetti",
    "panna_fresca",
    macinatoDi("suino"),
    "aglio",
    "olio",
  ],
  spaghetti_ragu: [
    "spaghetti",
    macinatoDi("manzo"),
    macinatoDi("suino"),
    "cipolle",
    "aglio",
    "olio",
    "sedano",
    "carote",
    "latte",
    "vino_rosso",
    "salsa_pomodoro",
    "zucchero",
    "sale_fino",
    "mozzarella",
  ],
  spaghetti_alla_salsiccia_e_cime_di_rapa: [
    "spaghetti",
    "aglio",
    "peperoncino",
    "olio",
    macinatoDi("suino"),
    "cime_di_rapa",
  ],
  orecchiette_alla_salsiccia_e_cime_di_rapa: [
    "orecchiette",
    "aglio",
    "peperoncino",
    "olio",
    macinatoDi("suino"),
    "cime_di_rapa",
  ],
  lasagne_ragu: [
    "lasagne",
    "besciamella",
    macinatoDi("manzo"),
    macinatoDi("suino"),
    "cipolle",
    "aglio",
    "olio",
    "sedano",
    "carote",
    "latte",
    "vino_rosso",
    "salsa_pomodoro",
    "zucchero",
    "sale_fino",
    "mozzarella",
  ],
  spaghetti_al_tonno_mozzarella: [
    "spaghetti",
    "aglio",
    "olio",
    "tonno",
    "mozzarella",
    "olive",
  ],
  tagliatelle_al_salmone: [
    "tagliatelle",
    "salmone",
    "panna_fresca",
    "aglio",
    "olio",
    "prezzemolo",
  ],
  minestra_patate_pancetta: [
    "ditalini",
    "patate",
    cubettiDi("pancetta"),
    "cipolle",
    "carote",
    "sedano",
    "vino_rosso",
    "dado",
    "aglio",
    "olio",
  ],
  acqua_cotta: [
    "pane",
    "cipolle",
    "sedano",
    "peperoncino",
    "uovo",
    "pepe",
    "parmigiano",
    "salsa_pomodoro",
    "sale_fino",
    "olio",
  ],
  // secondi
  spezzatino_patate: [
    "patate",
    "cipolle",
    "olio",
    "aglio",
    "vino_rosso",
    spezzatinDi("manzo"),
    "dado",
    "rosmarino",
    "salvia",
    "alloro",
  ],
  pollo_al_curry: ["zenzero", "pollo", "cipolle", "panna_fresca", "curry"],
  hamburger: [
    svizzeraDi("manzo"),
    "bun_hamburger",
    "ketchup",
    "maionese",
    "senape",
    "barbeque",
    "sottilette_ceddar",
    "insalata",
    "cipolle_fritte",
  ],
  hotdog: [
    "bun_hotdog",
    "wurstel",
    "ketchup",
    "maionese",
    "senape",
    "barbeque",
    "cipolle_fritte",
  ],
  egg_muffin_bacon: [
    "uovo",
    "sottilette_ceddar",
    "bun_hamburger",
    "pancetta",
    "insalata",
    "cipolle_fritte",
    "ketchup",
    "maionese",
    "senape",
    "barbeque",
  ],
  frittata_di_cipolle: ["uovo", "cipolle", "sale_fino", "olio"],
  frittata_di_patate: ["uovo", "patate", "sale_fino", "olio"],
  frittata_di_zucchine: ["uovo", "zucchine", "sale_fino", "olio"],
  omelette_cotto_mozzarella: [
    "uovo",
    "prosciutto_cotto",
    "mozzarella",
    "sale_fino",
    "olio",
  ],
  toast: [
    "pane_tramezzini",
    "prosciutto_cotto",
    "prosciutto_crudo",
    "salame",
    "farci_toast",
    "mozzarella",
  ],
  // contorni
  spinaci_con_mozzarella: [
    "spinaci_surgelati",
    "mozzarella",
    "aglio",
    "olio",
    "peperoncino",
  ],
  // merende
  latte_miele: ["latte", "miele"],
  latte_biscotti: ["latte", "biscotti"],
  pane_cioccolata: ["panbauletto", "cioccolata"],
  arrosto: [
    "cipolle",
    "carote",
    "sedano",
    "dado",
    "vino_bianco",
    "farina",
    "rosmarino",
    "arrosto",
  ],
  crostini_funghi: ["baguette", "salsa_funghi_crostini"],
  crostini_fegatini: ["baguette", "salsa_fegatini_crostini"],
  sashimi: [
    "riso",
    "salsa_di_soia",
    "wasabi",
    "aceto_di_riso",
    "zucchero",
    "zenzero",
    "salmone",
    "tonno",
    "pesce_spada",
    "avocado",
    "cetriolo",
  ],
};
