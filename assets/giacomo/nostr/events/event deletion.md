---
type: "[[event]]"
kind: "[[5]]"
nip: "[[nip09]]"
it: "[[;nip09]]"
---
>[[nostr/nips/nip09]]
>[[event]]

[[nostr/note/;Event deletion]]

```json
{
  "kind": 5,
  "pubkey": <32-bytes hex-encoded public key of the event creator>,
  "tags": [
    ["e", "dcd59..464a2"],
    ["e", "968c5..ad7a4"],
    ["a", "<kind>:<pubkey>:<d-identifier>"]
  ],
  "content": "these posts were published by accident",
  ...other fields
}
```