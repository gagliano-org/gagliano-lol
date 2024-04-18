---
type: parameter
nip: "[[nip01]]"
---
## Tag
Each tag is an array of strings of arbitrary size, with some conventions around them. Take a look at the example below:
```json
{
  ...,
  "tags": [
    ["e", "5c83da77af1dec6d7289834998ad7aafbd9e2191396d75ec3cc27f5a77226f36", "wss://nostr.example.com"],
    ["p", "f7234bd4c1394dda46d09f35bd384dd30cc552ad5541990f98844fb06676e9ca"],
    ["a", "30023:f7234bd4c1394dda46d09f35bd384dd30cc552ad5541990f98844fb06676e9ca:abcd", "wss://nostr.example.com"],
    ["alt", "reply"],
    ...
  ],
  ...
}
```
# Collegamenti
>[[tag `e` and `p`]]
>[[contact list]]
>[[generic tag queries]]
>[[pet names]]
>[[nostr/tags/expiration]]