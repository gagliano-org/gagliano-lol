# NIP-19

## Entità codificate in formato bech32

Questo NIP standardizza le stringhe in formato bech32 che possono essere utilizzate per visualizzare chiavi, ID e altre informazioni nei client. Questi formati non sono destinati a essere utilizzati in nessuna parte del protocollo principale, sono solo destinati alla visualizzazione agli utenti, al copia-incolla, alla condivisione, alla generazione di codici QR e all'inserimento di dati.

Si consiglia di memorizzare le chiavi e gli ID in formato esadecimale o binario, poiché questi formati sono più vicini a ciò che deve essere effettivamente utilizzato nel protocollo principale.

## Chiavi e ID grezzi

Per evitare confusione e miscelazione tra chiavi private, chiavi pubbliche e ID degli eventi, che sono tutti stringhe di 32 byte, è possibile utilizzare la codifica bech32-(non-m) con diversi prefissi per ciascuna di queste entità.

Questi sono i possibili prefissi bech32:

  - `npub`: chiavi pubbliche
  - `nsec`: chiavi private
  - `note`: ID dei messaggi

Esempio: la chiave pubblica esadecimale `3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d` si traduce in `npub180cvv07tjdrrgpa0j7j7tmnyl2yr6yr7l8j4s3evf6u64th6gkwsyjh6w6`.

Le codifiche bech32 delle chiavi e degli ID non sono destinate ad essere utilizzate nei formati di eventi standard NIP-01 o nei filtri, sono destinate solo per la visualizzazione e l'inserimento più user-friendly. I client dovrebbero comunque accettare chiavi in formato esadecimale e npub per ora e convertire internamente.

## Identificatori condivisibili con metadati extra

Quando si condivide un profilo o un evento, un'app può decidere di includere informazioni sui relay e altri metadati in modo che altre app possano individuare e visualizzare queste entità più facilmente.

Per questi eventi, i contenuti sono una lista codificata in binario di `TLV` (type-length-value), con `T` e `L` di 1 byte ciascuno (`uint8`, cioè un numero nell'intervallo da 0 a 255), e `V` una sequenza di byte della dimensione indicata da `L`.

Questi sono i possibili prefissi bech32 con `TLV`:

  - `nprofile`: un profilo nostr
  - `nevent`: un evento nostr
  - `nrelay`: un relay nostr
  - `naddr`: una coordinata di evento sostituibile nostr

Questi possibili tipi `TLV` standardizzati sono indicati qui:

- `0`: `speciale`
  - dipende dal prefisso bech32:
    - per `nprofile` saranno i 32 byte della chiave pubblica del profilo
    - per `nevent` saranno i 32 byte dell'ID dell'evento
    - per `nrelay`, questo è l'URL del relay
    - per `naddr`, è l'identificatore (il tag `"d"`) dell'evento a cui si fa riferimento. Per eventi sostituibili non parametrizzati, utilizzare una stringa vuota.
- `1`: `relay`
  - per `nprofile`, `nevent` e `naddr`, _opzionalmente_, un relay in cui è più probabile che l'entità (profilo o evento) sia trovata, codificato come ascii
  - ciò può essere incluso più volte
- `2`: `author`
  - per `naddr`, i 32 byte della chiave pubblica dell'evento
  - per `nevent`, _opzionalmente_, i 32 byte della chiave pubblica dell'evento
- `3`: `kind`
  - per `naddr`, l'intero non firmato a 32 bit del tipo, big-endian
  - per `nevent`, _opzionalmente_, l'intero non firmato a 32 bit del tipo, big-endian

## Esempi

- `npub10elfcs4fr0l0r8af98jlmgdh9c8tcxjvz9qkw038js35mp4dma8qzvjptg` dovrebbe essere decodificato nella chiave pubblica esadecimale `7e7e9c42a91bfef19fa929e5fda1b72e0ebc1a4c1141673e2794234d86addf4e` e viceversa
- `nsec1vl029mgpspedva04g90vltkh6fvh240zqtv9k0t9af8935ke9laqsnlfe5` dovrebbe essere decodificato nella chiave privata esadecimale `67dea2ed018072d675f5415ecfaed7d2597555e202d85b3d65ea4e58d2d92ffa` e viceversa
- `nprofile1qqsrhuxx8l9ex335q7he0f09aej04zpazpl0ne2cgukyawd24mayt8gpp4mhxue69uhhytnc9e3k7mgpz4mhxue69uhkg6nzv9ejuumpv34kytnrdaksjlyr9p` dovrebbe essere decodificato in un profilo con i seguenti elementi TLV:
  - chiave pubblica: `3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d`
  - relay: `wss://r.x.com`
  - relay: `wss://djbas.sadkb.com`

## Note

- Le chiavi `npub` NON DEVONO essere utilizzate negli eventi NIP-01 o nelle risposte

 JSON NIP-05, solo il formato esadecimale è supportato in quei casi.
- Quando si decodifica una stringa in formato bech32, i TLV che non sono riconosciuti o supportati dovrebbero essere ignorati, anziché causare un errore.