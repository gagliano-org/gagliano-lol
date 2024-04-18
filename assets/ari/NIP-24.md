# NIP-24

## Campi e Tag Metadata Aggiuntivi

`bozza` `opzionale` `autore: fiatjaf`

Questo NIP definisce campi aggiuntivi opzionali aggiunti agli eventi.

### Kind 0

Questi sono campi aggiuntivi non specificati in NIP-01 che possono essere presenti nel JSON stringificato degli eventi di metadata:

- `display_name`: un nome più grande con caratteri più ricchi rispetto a `name`. Le implementazioni dovrebbero fare fallback su `name` quando questo non è disponibile.
- `website`: un URL web correlato in qualche modo all'autore dell'evento.
- `banner`: un URL di un'immagine ampia (~1024x768) da visualizzare facoltativamente sullo sfondo di una schermata del profilo.

#### Campi deprecati

Questi sono campi che dovrebbero essere ignorati o rimossi quando vengono trovati:

- `displayName`: usare `display_name` al suo posto.
- `username`: usare `name` al suo posto.

### Kind 3

Questi sono campi aggiuntivi non specificati in NIP-02 che possono essere presenti nel JSON stringificato degli eventi dei contatti:

#### Campi deprecati

- `{<relay-url>: {"read": <true|false>, "write": <true|false>}, ...}`: un oggetto di relays utilizzati da un utente per leggere/scrivere. Dovrebbe essere usato [NIP-65] al suo posto.

## Tag

Questi tag possono essere presenti in più tipi di eventi. Ogni volta che un significato diverso non è specificato da qualche NIP più specifico, hanno i seguenti significati:

- `r`: un URL web a cui l'evento fa riferimento in qualche modo.