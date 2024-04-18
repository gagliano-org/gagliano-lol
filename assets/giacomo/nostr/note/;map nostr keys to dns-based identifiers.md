[[0]]

#well-known
# Map nostr keys to dns-based identifiers

Eventi di kind `0` ([[nostr/events/metadata]]) possono definire una chiave `nip05` attraverso un [[internet identifier]].

La richiesta è di questo tipo:
`https://<domain>/.well-known/nostr.json?name=<local-part>`

`<local-part>` deve essere ristretta ai caratteri `a-z0-9-_.` e `case-insensitive.`

## Comportamento atteso del client
Il client deve dividere il link in
- `<local-part>`
- `<domain>`
Il risultato dovrebbe essere un documento oggetto con una chiave `name` che dovrebbe mappare dei nomi a delle chiavi pubbliche formattate in `hex`. Se la public key per un dato `<name>` coincide con la `pubkey` fornita con un evento `metadata`, il client conclude che quella determinata `pubkey` può in effetti essere referenziata attraverso il suo identifier.

## Esempio

Se un client riceve un evento così:
```json
{
  "pubkey": "b0635d6a9851d3aed0cd6c495b282167acf761729078d975fc341b22650b07b9",
  "kind": 0,
  "content": "{\"name\": \"bob\", \"nip05\": \"bob@example.com\"}"
  ...
}
```
effettuerà una richiesta `GET` a `https://example.com/.well-known/nostr.json?name=bob` e riceverà una risposta così dal relay:
```json
{
  "names": {
    "bob": "b0635d6a9851d3aed0cd6c495b282167acf761729078d975fc341b22650b07b9"
  }
}
```
o con l'attributo facoltativo
```json
{
  "names": {
    "bob": "b0635d6a9851d3aed0cd6c495b282167acf761729078d975fc341b22650b07b9"
  },
  "relays": {
    "b0635d6a9851d3aed0cd6c495b282167acf761729078d975fc341b22650b07b9": [ "wss://relay.example.com", "wss://relay2.example.com" ]
  }
}
```
Se la `pubkey` coincide con quella data fra i `names` (come nell'esempio qui sopra) significa che l'associazione può essere fatta.
L'attributo facoltativo `relays` contiene un oggetto che ha per proprietà delle chiavi pubbliche e come valore un array di relay sui quali il client può assumere di trovare lo user.
I web servers che rispondono alla request `/.well-known/nostr.json` dinamicamente basandosi sulla query string DOVREBBERO anche includere i dati dei relay per ogni nome che inoltrano nella risposta stessa, quando questi dati sono disponibili.
## Trovare user attraverso il loro identificatore NIP-05
Un client potrebbe implementare il supporto di ricerca della chiave pubblica degli user attraverso il loro *internet identifier*. Il modo è lo stesso va solo compiuto in reverse: prima il client fa `fetch` dell'URL `well-known` e da li recupera la `pubkey` dello user. In seguito interroga il server per recuperare l'evento di kind `0` della `pubkey` e a quel punto controlla se ha un `nip05` che coincide.

## Note
### I client devono sempre seguire le chiavi pubbliche, non gli indirizzi NIP-05.
Ad esempio, se dopo aver trovato che `bob@bob.com` ha una chiave pubblica `abc...def`, lo user clicca il bottone per andare sul profile di `bob`, il client deve mantenere un riferimento primario alla chiave pubblica non a `bob@bob.com`. Se, per qualsiasi ragione, l'indirizzo `https://bob.com/.well-known/nostr.json?name=bob` comincia a ritornare la chiave pubblica `1d2...e3f` in un qualche momento nel futuro, il client non deve sostituire `abc...def` nella lista dei profili seguiti, ma dovrebbe smettere di mostrare `bob@bob.com` per quello user, in quanto è diventato un `nip05` non valido.
### Key in `hex` format
Le chiavi devono essere comunicate in formato `hex` non `npub`.
### Suggerimenti di discovery per gli user
I client dovrebbero permettere agli user di cercare altri peers utilizzando il loro [[nostr/nips/nip05/indirizzo|indirizzo]] `nip05`.
### Mostrare solo il dominio come identifier
I client possono trattare `_@bob.com` come l'identificatore `root` e scegliere di mostrare il nome solo come `<dominio>`. Ad esempio, Bob possiede `bob.com`, e magari non desidera avere un identificatore come `bob@bob.com` perché è ridondante. In alternativa, Bob può usare l'identificatore `_@bob.com` e aspettarsi che i client Nostr mostrino e lo trattino come semplicemente `bob.com` per ogni evenienza.
### Ragionamenti sul formato `https://<domain>/.well-known/nostr.json?name=<local-part>`
Aggiungendo la `<local-part>` come string query come parte del path, il protocollo può supportare server dinamici che possono generare JSON on-demand e server statici che potrebbe contenere più nomi.
### Permettere l'accesso fa applicazioni JavaScript
Alle applicazioni JavaScript potrebbero essere impedito l'accesso a `/.well-known/nostr.json` per via delle policy [[html/CORS]] sul dominio dello user. Quando CORS previene JS dal caricare risorse, il programma JS lo identifica come una `network failure`, quindi non è possibile capire che la cosa sia dovuta ad un CORS issue. Applicazioni nostr costruite con JS che vedono una network failure in seguito ad una richiesta a `/.well-known/nostr.json` dovrebbero inviare un messaggio allo user affinché controlli la policy CORS del suo server. Esempio:
```
$ curl -sI https://example.com/.well-known/nostr.json?name=bob | grep -i ^Access-Control
Access-Control-Allow-Origin: *
```
Gli user si devono assicurare che `/.well-known/nostr.json` sia servito con l'header `Access-Control-Allow-Origin: *` per assicurarsi di essere validati da applicazioni in pure JS nei browser moderni.