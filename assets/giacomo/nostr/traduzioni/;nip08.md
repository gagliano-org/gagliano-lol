---
definisce:
  - menzioni
---

# NIP-08
## Gestendo le menzioni
`final` `unrecommended` `optional` `author:fiatjaf` `author:scsibug`
Questo documento standardizza il trattamento dato dai client alle menzioni in linea di altri eventi e chiavi pubbliche all’interno del contenuto delle note di testo.

I client che vogliono permettere menzioni etichettate DEVONO mostrare un componente di completamento automatico o qualcosa di analogo ogni volta che l’utente inizia a digitare un tasto speciale (ad esempio, “@”) o preme qualche pulsante per includere una menzione etc – o questi client possono trovare altri modi per differenziare in modo inequivocabile tra menzioni e testo normale.

Una volta identificata una menzione, ad esempio, la chiave pubblica `27866e9d854c78ae625b867eefdfa9580434bc3e675be08d2acb526610d96fbe`, il client DEVE aggiungere quella chiave pubblica ai `.tags` con il tag `p`, poi sostituire il suo riferimento testuale (all’interno di `.content`) con la notazione `#[indice]` in cui “indice” è uguale all’indice basato su 0 del tag correlato nell’array dei tag.

Lo stesso processo si applica per la menzione degli ID degli eventi.

Un client che riceve un evento `text_note` con tali menzioni `#[indice]` nel suo `.content` PUÒ fare una ricerca e sostituzione utilizzando i contenuti effettivi dall’array `.tags` con la chiave pubblica effettiva o l’ID dell’evento che viene menzionato, facendo qualsiasi desiderato aumento del contesto (ad esempio, collegando alla chiave pubblica o mostrando un’anteprima dei contenuti dell’evento menzionato) che vuole nel processo.

Dove`#[indice]` ha un `index` che è fuori dal range dell’array dei tag o punta a un tag che non è un tag `e` o `p` o un tag altrimenti dichiarato per supportare questa notazione, il client NON DEVE eseguire tale sostituzione o aumento, ma invece visualizzarlo come testo normale.