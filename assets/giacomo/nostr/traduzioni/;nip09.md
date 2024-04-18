---
definisce:
  - "[[nostr/kind]]"
  - "[[tag]]"
_tags:
  - "[[e]]"
  - "[[a]]"
kind:
  - "[[5]]"
---

# NIP-09
## Cancellazione dell’evento bozza opzionale
`draft` `optional` `author:scsibug`

Un evento speciale con tipo `5`, che significa “cancellazione”, è definito come un elenco di uno o più tag `‘e’`, ognuno dei quali fa riferimento a un evento che l’autore richiede di cancellare.

Ogni voce del tag deve contenere un ID evento `e` e/o un tag `a` NIP-33 destinato alla cancellazione.

Il campo `content` dell’evento PUÒ contenere una nota di testo che descrive il motivo della cancellazione.

Ad esempio:
![[event deletion]]
I relay DOVREBBERO cancellare o smettere di pubblicare qualsiasi evento di riferimento che ha un `pubkey` identico alla richiesta di cancellazione. I client DOVREBBERO nascondere o indicare altrimenti uno stato di cancellazione per gli eventi di riferimento.

I relay DOVREBBERO continuare a pubblicare/condividere gli eventi di cancellazione a tempo indeterminato, poiché i client potrebbero già avere l’evento che si intende cancellare. Inoltre, i client DOVREBBERO trasmettere gli eventi di cancellazione ad altri relay che non lo hanno.

## Utilizzo da parte del client
I client POSSONO scegliere di nascondere completamente qualsiasi evento che sia referenziato da eventi di cancellazione validi. Questo include note di testo, messaggi diretti, o altri tipi di evento ancora da definire. In alternativa, POSSONO mostrare l’evento insieme a un’icona o un’altra indicazione che l’autore ha “rinunciato” all’evento. Il campo `content` PUÒ anche essere utilizzato per sostituire il contenuto degli eventi cancellati, anche se l’interfaccia utente dovrebbe indicare chiaramente che si tratta del motivo di cancellazione, non del contenuto originale.

Un client DEVE convalidare che ogni `pubkey` dell’evento referenziato nel tag `e` della richiesta di cancellazione sia identico al `pubkey` della richiesta di cancellazione, prima di nascondere o cancellare qualsiasi evento. I relay non possono, in generale, eseguire questa convalida e non dovrebbero essere trattati come autorevoli.

I client visualizzano l’evento di cancellazione stesso in qualsiasi modo scelgono, ad esempio, non del tutto, o con un avviso prominente.

## Utilizzo da parte del relay
I relay POSSONO convalidare che un evento di cancellazione faccia riferimento solo a eventi che hanno la stessa `pubkey` della cancellazione stessa, tuttavia questo non è richiesto poiché i relay potrebbero non avere conoscenza di tutti gli eventi referenziati.

## Cancellare una Cancellazione
Pubblicare un evento di cancellazione contro una cancellazione non ha effetto. I client e i relay non sono obbligati a supportare la funzionalità “ripristina”.