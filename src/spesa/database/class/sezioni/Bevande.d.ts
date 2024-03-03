import "./Bevande";

declare module "./Bevande" {
  export interface Bevande {
    mia: bevande;
    era: bevande;
    gi: bevande;
    ari: bevande;
  }
  export type bevande = keyof typeof bevande_tipi;
}
