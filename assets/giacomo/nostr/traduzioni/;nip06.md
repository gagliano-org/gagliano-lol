---
definisce:
  - mnemonic phrase
---

# NIP-06
## Derivazione di chiavi di base dalla frase segreta mnemonica
`bozza` `opzionale`

[BIP39](https://bips.xyz/39) viene utilizzato per generare parole segrete mnemoniche e derivare da esse un seme binario.

[BIP32](https://bips.xyz/32) viene utilizzato per derivare il percorso `m/44’/1237’/<account>'/0/0` (secondo la voce Nostr su [SLIP44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md) ).

Un client di base può semplicemente utilizzare un `account` di `0` per derivare una singola chiave. Per casi d’uso più avanzati, è possibile incrementare l’`account`, consentendo la generazione di chiavi praticamente infinite dal percorso a 5 livelli con derivazione rafforzata.

Altri tipi di client possono comunque diventare sofisticati e utilizzare altri percorsi di derivazione per i loro altri scopi.