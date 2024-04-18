---
definisce:
  - "[[nostr/kind]]"
metadataFields: "[[💾nip05]]"
---

#da-tradurre
# [NIP-05](https://github.com/nostr-protocol/nips/blob/master/05.md#nip-05)

## [Mapping Nostr keys to DNS-based internet identifiers](https://github.com/nostr-protocol/nips/blob/master/05.md#mapping-nostr-keys-to-dns-based-internet-identifiers)

`final` `optional` `author:fiatjaf` `author:mikedilger`

On events of kind `0` (`metadata`) one can specify the key `"nip05"` with an [internet identifier](https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1) (an email-like address) as the value. Although there is a link to a very liberal "internet identifier" specification above, NIP-05 assumes the `<local-part>` part will be restricted to the characters `a-z0-9-_.`, case-insensitive.

Upon seeing that, the client splits the identifier into `<local-part>` and `<domain>` and use these values to make a GET request to `https://<domain>/.well-known/nostr.json?name=<local-part>`.

The result should be a JSON document object with a key `"names"` that should then be a mapping of names to hex formatted public keys. If the public key for the given `<name>` matches the `pubkey` from the `metadata` event, the client then concludes that the given pubkey can indeed be referenced by its identifier.

### [Example](https://github.com/nostr-protocol/nips/blob/master/05.md#example)

If a client sees an event like this:

```json
{
  "pubkey": "b0635d6a9851d3aed0cd6c495b282167acf761729078d975fc341b22650b07b9",
  "kind": 0,
  "content": "{\"name\": \"bob\", \"nip05\": \"bob@example.com\"}"
  ...
}
```

It will make a GET request to `https://example.com/.well-known/nostr.json?name=bob` and get back a response that will look like

```json
{
  "names": {
    "bob": "b0635d6a9851d3aed0cd6c495b282167acf761729078d975fc341b22650b07b9"
  }
}
```

or with the **optional** `"relays"` attribute:

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

If the pubkey matches the one given in `"names"` (as in the example above) that means the association is right and the `"nip05"` identifier is valid and can be displayed.

The optional `"relays"` attribute may contain an object with public keys as properties and arrays of relay URLs as values. When present, that can be used to help clients learn in which relays the specific user may be found. Web servers which serve `/.well-known/nostr.json` files dynamically based on the query string SHOULD also serve the relays data for any name they serve in the same reply when that is available.

## [Finding users from their NIP-05 identifier](https://github.com/nostr-protocol/nips/blob/master/05.md#finding-users-from-their-nip-05-identifier)

A client may implement support for finding users' public keys from _internet identifiers_, the flow is the same as above, but reversed: first the client fetches the _well-known_ URL and from there it gets the public key of the user, then it tries to fetch the kind `0` event for that user and check if it has a matching `"nip05"`.

## [Notes](https://github.com/nostr-protocol/nips/blob/master/05.md#notes)

### [Clients must always follow public keys, not NIP-05 addresses](https://github.com/nostr-protocol/nips/blob/master/05.md#clients-must-always-follow-public-keys-not-nip-05-addresses)

For example, if after finding that `bob@bob.com` has the public key `abc...def`, the user clicks a button to follow that profile, the client must keep a primary reference to `abc...def`, not `bob@bob.com`. If, for any reason, the address `https://bob.com/.well-known/nostr.json?name=bob` starts returning the public key `1d2...e3f` at any time in the future, the client must not replace `abc...def` in his list of followed profiles for the user (but it should stop displaying "[bob@bob.com](mailto:bob@bob.com)" for that user, as that will have become an invalid `"nip05"` property).

### [Public keys must be in hex format](https://github.com/nostr-protocol/nips/blob/master/05.md#public-keys-must-be-in-hex-format)

Keys must be returned in hex format. Keys in NIP-19 `npub` format are only meant to be used for display in client UIs, not in this NIP.

### [User Discovery implementation suggestion](https://github.com/nostr-protocol/nips/blob/master/05.md#user-discovery-implementation-suggestion)

A client can also use this to allow users to search other profiles. If a client has a search box or something like that, a user may be able to type "[bob@example.com](mailto:bob@example.com)" there and the client would recognize that and do the proper queries to obtain a pubkey and suggest that to the user.

### [Showing just the domain as an identifier](https://github.com/nostr-protocol/nips/blob/master/05.md#showing-just-the-domain-as-an-identifier)

Clients may treat the identifier `_@domain` as the "root" identifier, and choose to display it as just the `<domain>`. For example, if Bob owns `bob.com`, he may not want an identifier like `bob@bob.com` as that is redundant. Instead, Bob can use the identifier `_@bob.com` and expect Nostr clients to show and treat that as just `bob.com` for all purposes.

### [Reasoning for the `/.well-known/nostr.json?name=<local-part>` format](https://github.com/nostr-protocol/nips/blob/master/05.md#reasoning-for-the-well-knownnostrjsonnamelocal-part-format)

By adding the `<local-part>` as a query string instead of as part of the path, the protocol can support both dynamic servers that can generate JSON on-demand and static servers with a JSON file in it that may contain multiple names.

### [Allowing access from JavaScript apps](https://github.com/nostr-protocol/nips/blob/master/05.md#allowing-access-from-javascript-apps)

JavaScript Nostr apps may be restricted by browser [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) policies that prevent them from accessing `/.well-known/nostr.json` on the user's domain. When CORS prevents JS from loading a resource, the JS program sees it as a network failure identical to the resource not existing, so it is not possible for a pure-JS app to tell the user for certain that the failure was caused by a CORS issue. JS Nostr apps that see network failures requesting `/.well-known/nostr.json` files may want to recommend to users that they check the CORS policy of their servers, e.g.:

```shell
$ curl -sI https://example.com/.well-known/nostr.json?name=bob | grep -i ^Access-Control
Access-Control-Allow-Origin: *
```

Users should ensure that their `/.well-known/nostr.json` is served with the HTTP header `Access-Control-Allow-Origin: *` to ensure it can be validated by pure JS apps running in modern browsers.

### [Security Constraints](https://github.com/nostr-protocol/nips/blob/master/05.md#security-constraints)

The `/.well-known/nostr.json` endpoint MUST NOT return any HTTP redirects.

Fetchers MUST ignore any HTTP redirects given by the `/.well-known/nostr.json` endpoint.