# NIP-45

## Conteggio degli Eventi

I relays possono supportare il verbo `COUNT`, che fornisce un meccanismo per ottenere il conteggio degli eventi.

## Motivazione

Alcune query che un client potrebbe voler eseguire contro i relays connessi sono proibitivamente costose. Ad esempio, per recuperare il conteggio dei follower per una determinata chiave pubblica, un client deve interrogare tutti gli eventi di tipo 3 che fanno riferimento a una data chiave pubblica solo per contarli. Il risultato può essere memorizzato nella cache, sia da un client che da un server di indicizzazione separato come alternativa, ma entrambe le opzioni erodono la decentralizzazione della rete creando un protocollo di secondo livello su Nostr.

## Filtri e valori restituiti

Questo NIP definisce il verbo `COUNT`, che accetta un ID di sottoscrizione e filtri come specificato in [NIP 01](01.md) per il verbo `REQ`. Più filtri vengono uniti in OR e aggregati in un singolo risultato di conteggio.

```
["COUNT", <ID di sottoscrizione>, <filtri JSON>...]
```

I conteggi vengono restituiti utilizzando una risposta `COUNT` nella forma `{"count": <intero>}`. I relays possono utilizzare conteggi probabilistici per ridurre i requisiti di calcolo. Nel caso in cui un relay utilizzi conteggi probabilistici, PUÒ indicarlo nella risposta con la chiave `approximate`, ad esempio `{"count": <intero>, "approximate": <true|false>}`.

```
["COUNT", <ID di sottoscrizione>, {"count": <intero>}]
```

Esempi:

```json
# Conteggio dei follower
["COUNT", <ID di sottoscrizione>, {"kinds": [3], "#p": [<chiave-pubblica>]}]
["COUNT", <ID di sottoscrizione>, {"count": 238}]

# Conta post e reazioni
["COUNT", <ID di sottoscrizione>, {"kinds": [1, 7], "authors": [<chiave-pubblica>]}]
["COUNT", <ID di sottoscrizione>, {"count": 5}]

# Conta post in modo approssimativo
["COUNT", <ID di sottoscrizione>, {"kinds": [1]}]
["COUNT", <ID di sottoscrizione>, {"count": 93412452, "approximate": true}]
```