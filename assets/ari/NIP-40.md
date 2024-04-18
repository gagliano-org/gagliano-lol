# NIP-40

## Timestamp di Scadenza

Il tag `expiration` consente agli utenti di specificare un timestamp Unix a cui il messaggio DEVE essere considerato scaduto (da relays e client) e DEVE essere eliminato dai relays.

#### Specifiche

```
tag: expiration
value:
 - [timestamp UNIX in seconds]: required
```

#### Esempio

```json
{
    "pubkey": "<chiave-pub>",
    "created_at": 1000000000,
    "kind": 1,
    "tags": [
      ["expiration", "1600000000"]
    ],
    "content": "Questo messaggio scadrà al timestamp specificato e sarà eliminato dai relays.\n",
    "id": "<id-evento>"
}
```

Nota: Il timestamp dovrebbe essere nel medesimo formato del timestamp `created_at` e dovrebbe essere interpretato come il momento in cui il messaggio dovrebbe essere eliminato dai relays.

Comportamento del Client
------------------------

I client DOVREBBERO utilizzare il campo `supported_nips` per verificare se un relay supporta questo NIP. I client NON DOVREBBERO inviare eventi di scadenza ai relays che non supportano questo NIP.

I client DOVREBBERO ignorare gli eventi scaduti.

Comportamento del Relay
-----------------------

I relays POTREBBERO NON eliminare immediatamente i messaggi scaduti alla scadenza e POTREBBERO mantenerli indefinitamente.  
I relays NON DOVREBBERO inviare eventi scaduti ai client, anche se sono archiviati.  
I relays DOVREBBERO scartare gli eventi che vengono pubblicati loro se sono scaduti.  
Un timestamp di scadenza non influenza la conservazione degli eventi effimeri.

Casi d'Uso Suggeriti
---------------------

* Annunci temporanei - Questo tag può essere utilizzato per effettuare annunci temporanei. Ad esempio, un organizzatore di eventi potrebbe utilizzare questo tag per pubblicare annunci su un evento imminente.
* Offerte a tempo limitato - Questo tag può essere utilizzato dalle aziende per effettuare offerte a tempo limitato che scadono dopo un certo periodo di tempo. Ad esempio, un'azienda potrebbe utilizzare questo tag per fare un'offerta speciale disponibile solo per un periodo limitato.

#### Avvertenza
Gli eventi possono essere scaricati da terze parti poiché sono pubblicamente accessibili in qualsiasi momento sui relays.
Quindi, non andranno i messaggi in scadenza come una funzione di sicurezza per le tue conversazioni o altri usi.