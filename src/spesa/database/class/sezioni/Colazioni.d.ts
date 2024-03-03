import "./Colazioni";

declare module "./Colazioni" {
  export interface Colazione {
    era: colazioni;
    mia: colazioni;
    gi: colazioni;
    ary: colazioni;
  }
  export type colazioni = keyof typeof colazioni_tipi;
}
