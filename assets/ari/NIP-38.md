# NIP-38

## Stati Utente

## Abstract

Questo NIP offre un modo per gli utenti di condividere stati in tempo reale come la musica che stanno ascoltando, nonché ciò che stanno facendo attualmente: lavoro, gioco, fuori ufficio, ecc.

## Stati in Tempo Reale

Un evento speciale con `kind: 30315` chiamato "User Status" è definito come un _evento sostituibile parametrizzato_ *opzionalmente scadente*, in cui il tag `d` rappresenta il tipo di stato:

Ad esempio:

```js
{
  "kind": 30315,
  "content": "Iscriviti a Nostrasia!",
  "tags": [
    ["d", "generale"],
    ["r", "https://nostr.world"]
  ],
}

{
  "kind": 30315,
  "content": "Intergalatic - Beastie Boys",
  "tags": [
    ["d", "musica"],
    ["r", "spotify:search:Intergalatic%20-%20Beastie%20Boys"],
    ["expiration", "1692845589"]
  ],
}
```

Sono definiti due tipi di stato comuni: `general` e `music`. `general` rappresenta stati generali: "Lavorando", "Escursionismo", ecc.

Gli eventi di stato `music` servono per trasmettere in streaming ciò che stai ascoltando al momento. La scadenza dello stato `music` dovrebbe coincidere con l'arresto della traccia.

Altri tipi di stato possono essere utilizzati, ma non sono definiti da questo NIP.

Lo stato PUÒ includere un tag `r`, `p`, `e` o `a` che collega a un URL, a un profilo, a una nota o a un evento sostituibile parametrizzato.

# Comportamento del Client

I clienti POSSONO visualizzare questo accanto al nome utente su post o profili per fornire informazioni sugli stati utente in tempo reale.

# Casi d'Uso

* App calendario Nostr che aggiornano il tuo stato generale quando sei in una riunione
* Nostr Nests che aggiornano il tuo stato generale con un link al nido quando ti unisci
* Servizi di streaming musicale Nostr che aggiornano il tuo stato musicale quando stai ascoltando
* App per podcasting che aggiornano il tuo stato musicale quando stai ascoltando un podcast, con un link per gli altri ascoltatori
* I client possono utilizzare il lettore multimediale di sistema per aggiornare lo stato di riproduzione della musica

Il `content` PUÒ includere emoji o emoji personalizzati [NIP-30]. Se il `content` è una stringa vuota, il client dovrebbe cancellare lo stato.