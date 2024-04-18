---
name: EVENT
classe: ["[[server messages]]","[[client messages]]"]
---
## Slug
`EVENT` ^58e287

## Forma del messaggio
	["EVENT", <event JSON>]

^36fe9a

## Utilizzo
questo messaggio è usato dal client per pubblicare eventi sul/sui relay. ^a33524


## json
`<event JSON>` è un'oggetto JSON definito nel seguente modo: ^7b5a94
```json
{
  "id": <32-bytes lowercase hex-encoded sha256 of the serialized event data>,
  "pubkey": <32-bytes lowercase hex-encoded public key of the event creator>,
  "created_at": <unix timestamp in seconds>,
  "kind": <integer between 0 and 65535>,
  "tags": [
    [<arbitrary string>...],
    ...
  ],
  "content": <arbitrary string>,
  "sig": <64-bytes lowercase hex of the signature of the sha256 hash of the serialized event data, which is the same as the "id" field>
}
```

## Rules

I messaggi `EVENT` **DEVONO** essere inviati solo ed esclusivamente con una `<subscription_id>` inviata in precedenza dal client usando il messaggio `REQ`. ^b72ab2

## Collegamenti

[[encrypted direct message]]
[[parameterized replaceable event]]
[[event deletion]]
[[nostr/event/parameters|parameters]]