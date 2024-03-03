import "./Merende";

declare module "./Merende" {
  export interface Merenda {
    era: merende[];
    mia: merende[];
  }
  export type merende = keyof typeof merende_tipi;
}
