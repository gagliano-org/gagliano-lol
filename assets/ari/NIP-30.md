
# NIP-30

## Emoji Personalizzati

Gli emoji personalizzati possono essere aggiunti agli eventi di **kind 0** e **kind 1** includendo uno o più tag `"emoji"`, nella forma:

```
["emoji", <shortcode>, <url-immagine>]
```

Dove:

- `<shortcode>` è un nome dato all'emoji, che DEVE essere composto solo da caratteri alfanumerici e underscore.
- `<url-immagine>` è un URL al file immagine corrispondente dell'emoji.

Per ciascun tag emoji, i client dovrebbero analizzare gli shortcode degli emoji (chiamato anche "emojify") come `:shortcode:` nell'evento per visualizzare gli emoji personalizzati.

I client possono consentire agli utenti di aggiungere emoji personalizzati a un evento includendo l'identificatore `:shortcode:` nell'evento e aggiungendo i relativi tag `"emoji"`.

### Eventi di Kind 0

Negli eventi di kind 0, i campi `name` e `about` dovrebbero essere emojificati.

```json
{
  "kind": 0,
  "content": "{\"name\":\"Alex Gleason :soapbox:\"}",
  "tags": [
    ["emoji", "soapbox", "https://gleasonator.com/emoji/Gleasonator/soapbox.png"]
  ],
  "pubkey": "79c2cae114ea28a981e7559b4fe7854a473521a8d22a66bbab9fa248eb820ff6",
  "created_at": 1682790000
}
```

### Eventi di Tipo 1

Negli eventi di tipo 1, il campo `content` dovrebbe essere emojificato.

```json
{
  "kind": 1,
  "content": "Ciao :gleasonator: 😂 :ablobcatrainbow: :disputed: yolo",
  "tags": [
    ["emoji", "ablobcatrainbow", "https://gleasonator.com/emoji/blobcat/ablobcatrainbow.png"],
    ["emoji", "disputed", "https://gleasonator.com/emoji/Fun/disputed.png"],
    ["emoji", "gleasonator", "https://gleasonator.com/emoji/Gleasonator/gleasonator.png"]
  ],
  "pubkey": "79c2cae114ea28a981e7559b4fe7854a473521a8d22a66bbab9fa248eb820ff6",
  "created_at": 1682630000
}
```