# NIP-18

## Repost

`bozza` `opzionale` `autore:jb55` `autore:fiatjaf` `autore:arthurfranca`

Un repost è un evento di tipo `kind 6` utilizzato per segnalare ai follower che una nota di testo di tipo `kind 1` vale la pena di essere letta.

Il `content` di un evento di repost è _la rappresentazione in formato stringa del JSON della nota oggetto del repost_. PUÒ anche essere vuoto, ma non è raccomandato.

L'evento di repost DEVE includere un tag `e` con l'`id` della nota che viene ripostata. Tale tag DEVE includere un URL di relay come terzo elemento per indicare dove può essere recuperato.

Il repost DOVREBBE includere un tag `p` con la `pubkey` dell'evento che viene ripostato.

## Repost con citazione

I repost con citazione sono eventi di tipo `kind 1` con un tag `e` incorporato
(vedi [NIP-08] e [NIP-27]. Poiché un repost con citazione include
un tag `e`, può apparire insieme alle risposte alla nota ripostata.


## Repost generici

Poiché i repost di tipo `kind 6` sono riservati per i contenuti di tipo `kind 1`, utilizziamo `kind 16`
come "repost generico", che può includere qualsiasi tipo di evento diverso da
`kind 1` all'interno di esso.

I repost di tipo `kind 16` DOVREBBERO contenere un tag `k` con il numero di tipo serializzato
dell'evento ripostato come suo valore.