import "./Stuzzichini";
declare module "./Stuzzichini" {
  export interface Stuzzichini {
    era: stuzzichini;
    mia: stuzzichini;
    ari: stuzzichini;
  }
  export type stuzzichini = keyof typeof stuzzichini_tipi;
}
