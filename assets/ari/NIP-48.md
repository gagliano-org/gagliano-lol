# NIP-48

## Tag Proxy

Gli eventi Nostr bridge da altri protocolli come ActivityPub possono riferirsi all'oggetto di origine includendo un tag `"proxy"`, nella forma:

```
["proxy", <id>, <protocollo>]
```

Dove:

- `<id>` è l'ID dell'oggetto di origine. Il formato dell'ID varia a seconda del protocollo. L'ID deve essere universalmente univoco, indipendentemente dal protocollo.
- `<protocollo>` è il nome del protocollo, ad esempio `"activitypub"`.

I client possono utilizzare queste informazioni per conciliare il contenuto duplicato da altri protocolli o per visualizzare un collegamento all'oggetto di origine.

I tag proxy possono essere aggiunti a qualsiasi tipo di evento e farlo indica che l'evento non ha avuto origine dal protocollo Nostr, ma è invece originato altrove sul web.

### Protocolli supportati

Questo elenco potrebbe essere ampliato in futuro.

| Protocollo  | Formato ID | Esempio |
| ----------- | ---------- | ------- |
| `activitypub` | URL | `https://gleasonator.com/objects/9f524868-c1a0-4ee7-ad51-aaa23d68b526` |
| `atproto` | AT URI | `at://did:plc:zhbjlbmir5dganqhueg7y4i3/app.bsky.feed.post/3jt5hlibeol2i` |
| `rss` | URL con frammento guid | `https://soapbox.pub/rss/feed.xml#https%3A%2F%2Fsoapbox.pub%2Fblog%2Fmostr-fediverse-nostr-bridge` |
| `web` | URL | `https://twitter.com/jack/status/20` |

### Esempi

Oggetto ActivityPub:

```json
{
  "kind": 1,
  "content": "I'm vegan btw",
  "tags": [
    [
      "proxy",
      "https://gleasonator.com/objects/8f6fac53-4f66-4c6e-ac7d-92e5e78c3e79",
      "activitypub"
    ]
  ],
  "pubkey": "79c2cae114ea28a981e7559b4fe7854a473521a8d22a66bbab9fa248eb820ff6",
  "created_at": 1691091365,
  "id": "55920b758b9c7b17854b6e3d44e6a02a83d1cb49e1227e75a30426dea94d4cb2",
  "sig": "a72f12c08f18e85d98fb92ae89e2fe63e48b8864c5e10fbdd5335f3c9f936397a6b0a7350efe251f8168b1601d7012d4a6d0ee6eec958067cf22a14f5a5ea579"
}
```

### Vedi anche

- [FEP-fffd: Oggetti Proxy](https://codeberg.org/fediverse/fep/src/branch/main/fep/fffd/fep-fffd.md)
- [Mostr bridge](https://mostr.pub/)