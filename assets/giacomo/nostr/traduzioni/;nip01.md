---
definisce:
  - "[[nostr/kind]]"
  - "[[tag]]"
  - "[[event]]"
kinds:
  - "[[0]]"
  - "[[1]]"
_tags:
  - "[[a]]"
  - "[[p]]"
  - "[[e]]"
clientMessages:
  - "[[event]]"
  - "[[request]]"
  - "[[close]]"
  - "[[a]]"
serverMessages:
  - "[[event]]"
  - "[[eose]]"
  - "[[notice]]"
  - "[[ok]]"
eventFields:
  - "[[nostr/event/💾id|💾id]]"
  - "[[💾pubkey]]"
  - "[[💾created_at]]"
  - "[[💾kind]]"
  - "[[💾tags]]"
  - "[[💾content]]"
  - "[[💾sig]]"
metadataFields:
  - "[[💾name]]"
  - "[[💾picture]]"
  - "[[💾about]]"
---

#da-tradurre 
# [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md#nip-01)

## [Basic protocol flow description](https://github.com/nostr-protocol/nips/blob/master/01.md#basic-protocol-flow-description)

`draft` `mandatory` `author:fiatjaf` `author:distbit` `author:scsibug` `author:kukks` `author:jb55` `author:semisol` `author:cameri` `author:Giszmo`

This NIP defines the basic protocol that should be implemented by everybody. New NIPs may add new optional (or mandatory) fields and messages and features to the structures and flows described here.

## [Events and signatures](https://github.com/nostr-protocol/nips/blob/master/01.md#events-and-signatures)

Each user has a keypair. Signatures, public key, and encodings are done according to the [Schnorr signatures standard for the curve `secp256k1`](https://bips.xyz/340).

The only object type that exists is the `event`, which has the following format on the wire:

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

To obtain the `event.id`, we `sha256` the serialized event. The serialization is done over the UTF-8 JSON-serialized string (with no white space or line breaks) of the following structure:

```json
[
  0,
  <pubkey, as a lowercase hex string>,
  <created_at, as a number>,
  <kind, as a number>,
  <tags, as an array of arrays of non-null strings>,
  <content, as a string>
]
```

### [Tags](https://github.com/nostr-protocol/nips/blob/master/01.md#tags)

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

The first element of the tag array is referred to as the tag _name_ or _key_ and the second as the tag _value_. So we can safely say that the event above has an `e` tag set to `"5c83da77af1dec6d7289834998ad7aafbd9e2191396d75ec3cc27f5a77226f36"`, an `alt` tag set to `"reply"` and so on. All elements after the second do not have a conventional name.

This NIP defines 3 standard tags that can be used across all event kinds with the same meaning. They are as follows:

- The `e` tag, used to refer to an event: `["e", <32-bytes lowercase hex of the id of another event>, <recommended relay URL, optional>]`
- The `p` tag, used to refer to another user: `["p", <32-bytes lowercase hex of a pubkey>, <recommended relay URL, optional>]`
- The `a` tag, used to refer to a (maybe parameterized) replaceable event
    - for a parameterized replaceable event: `["a", <kind integer>:<32-bytes lowercase hex of a pubkey>:<d tag value>, <recommended relay URL, optional>]`
    - for a non-parameterized replaceable event: `["a", <kind integer>:<32-bytes lowercase hex of a pubkey>:, <recommended relay URL, optional>]`

As a convention, all single-letter (only english alphabet letters: a-z, A-Z) key tags are expected to be indexed by relays, such that it is possible, for example, to query or subscribe to events that reference the event `"5c83da77af1dec6d7289834998ad7aafbd9e2191396d75ec3cc27f5a77226f36"` by using the `{"#e": "5c83da77af1dec6d7289834998ad7aafbd9e2191396d75ec3cc27f5a77226f36"}` filter.

### [Kinds](https://github.com/nostr-protocol/nips/blob/master/01.md#kinds)

Kinds specify how clients should interpret the meaning of each event and the other fields of each event (e.g. an `"r"` tag may have a meaning in an event of kind 1 and an entirely different meaning in an event of kind 10002). Each NIP may define the meaning of a set of kinds that weren't defined elsewhere. This NIP defines two basic kinds:

- `0`: **metadata**: the `content` is set to a stringified JSON object `{name: <username>, about: <string>, picture: <url, string>}` describing the user who created the event. A relay may delete older events once it gets a new one for the same pubkey.
- `1`: **text note**: the `content` is set to the **plaintext** content of a note (anything the user wants to say). Content that must be parsed, such as Markdown and HTML, should not be used. Clients should also not parse content as those.

And also a convention for kind ranges that allow for easier experimentation and flexibility of relay implementation:

- for kind `n` such that `1000 <= n < 10000`, events are **regular**, which means they're all expected to be stored by relays.
- for kind `n` such that `10000 <= n < 20000 || n == 0 || n == 3`, events are **replaceable**, which means that, for each combination of `pubkey` and `kind`, only the latest event MUST be stored by relays, older versions MAY be discarded.
- for kind `n` such that `20000 <= n < 30000`, events are **ephemeral**, which means they are not expected to be stored by relays.
- for kind `n` such that `30000 <= n < 40000`, events are **parameterized replaceable**, which means that, for each combination of `pubkey`, `kind` and the `d` tag's first value, only the latest event MUST be stored by relays, older versions MAY be discarded.

In case of replaceable events with the same timestamp, the event with the lowest id (first in lexical order) should be retained, and the other discarded.

When answering to `REQ` messages for replaceable events such as `{"kinds":[0],"authors":[<hex-key>]}`, even if the relay has more than one version stored, it SHOULD return just the latest one.

These are just conventions and relay implementations may differ.

## [Communication between clients and relays](https://github.com/nostr-protocol/nips/blob/master/01.md#communication-between-clients-and-relays)

Relays expose a websocket endpoint to which clients can connect. Clients SHOULD open a single websocket connection to each relay and use it for all their subscriptions. Relays MAY limit number of connections from specific IP/client/etc.

### [Meaning of WebSocket status codes](https://github.com/nostr-protocol/nips/blob/master/01.md#meaning-of-websocket-status-codes)

- When a websocket is closed by the relay with a status code `4000` that means the client shouldn't try to connect again.

### [From client to relay: sending events and creating subscriptions](https://github.com/nostr-protocol/nips/blob/master/01.md#from-client-to-relay-sending-events-and-creating-subscriptions)

Clients can send 3 types of messages, which must be JSON arrays, according to the following patterns:

- `["EVENT", <event JSON as defined above>]`, used to publish events.
- `["REQ", <subscription_id>, <filters JSON>...]`, used to request events and subscribe to new updates.
- `["CLOSE", <subscription_id>]`, used to stop previous subscriptions.

`<subscription_id>` is an arbitrary, non-empty string of max length 64 chars, that should be used to represent a subscription. Relays should manage `<subscription_id>`s independently for each WebSocket connection; even if `<subscription_id>`s are the same string, they should be treated as different subscriptions for different connections.

`<filters>` is a JSON object that determines what events will be sent in that subscription, it can have the following attributes:

```json
{
  "ids": <a list of event ids>,
  "authors": <a list of lowercase pubkeys, the pubkey of an event must be one of these>,
  "kinds": <a list of a kind numbers>,
  "#<single-letter (a-zA-Z)>": <a list of tag values, for #e — a list of event ids, for #p — a list of event pubkeys etc>,
  "since": <an integer unix timestamp in seconds, events must be newer than this to pass>,
  "until": <an integer unix timestamp in seconds, events must be older than this to pass>,
  "limit": <maximum number of events relays SHOULD return in the initial query>
}
```

Upon receiving a `REQ` message, the relay SHOULD query its internal database and return events that match the filter, then store that filter and send again all future events it receives to that same websocket until the websocket is closed. The `CLOSE` event is received with the same `<subscription_id>` or a new `REQ` is sent using the same `<subscription_id>`, in which case relay MUST overwrite the previous subscription.

Filter attributes containing lists (`ids`, `authors`, `kinds` and tag filters like `#e`) are JSON arrays with one or more values. At least one of the arrays' values must match the relevant field in an event for the condition to be considered a match. For scalar event attributes such as `authors` and `kind`, the attribute from the event must be contained in the filter list. In the case of tag attributes such as `#e`, for which an event may have multiple values, the event and filter condition values must have at least one item in common.

The `ids`, `authors`, `#e` and `#p` filter lists MUST contain exact 64-character lowercase hex values.

The `since` and `until` properties can be used to specify the time range of events returned in the subscription. If a filter includes the `since` property, events with `created_at` greater than or equal to `since` are considered to match the filter. The `until` property is similar except that `created_at` must be less than or equal to `until`. In short, an event matches a filter if `since <= created_at <= until` holds.

All conditions of a filter that are specified must match for an event for it to pass the filter, i.e., multiple conditions are interpreted as `&&` conditions.

A `REQ` message may contain multiple filters. In this case, events that match any of the filters are to be returned, i.e., multiple filters are to be interpreted as `||` conditions.

The `limit` property of a filter is only valid for the initial query and MUST be ignored afterwards. When `limit: n` is present it is assumed that the events returned in the initial query will be the last `n` events ordered by the `created_at`. It is safe to return less events than `limit` specifies, but it is expected that relays do not return (much) more events than requested so clients don't get unnecessarily overwhelmed by data.

### [From relay to client: sending events and notices](https://github.com/nostr-protocol/nips/blob/master/01.md#from-relay-to-client-sending-events-and-notices)

Relays can send 4 types of messages, which must also be JSON arrays, according to the following patterns:

- `["EVENT", <subscription_id>, <event JSON as defined above>]`, used to send events requested by clients.
- `["OK", <event_id>, <true|false>, <message>]`, used to indicate acceptance or denial of an `EVENT` message.
- `["EOSE", <subscription_id>]`, used to indicate the _end of stored events_ and the beginning of events newly received in real-time.
- `["NOTICE", <message>]`, used to send human-readable error messages or other things to clients.

This NIP defines no rules for how `NOTICE` messages should be sent or treated.

- `EVENT` messages MUST be sent only with a subscription ID related to a subscription previously initiated by the client (using the `REQ` message above).
    
- `OK` messages MUST be sent in response to `EVENT` messages received from clients, they must have the 3rd parameter set to `true` when an event has been accepted by the relay, `false` otherwise. The 4th parameter MAY be empty when the 3rd is `true`, otherwise it MUST be a string containing a machine-readable single-word prefix followed by a `:` and then a human-readable message. The standardized machine-readable prefixes are: `duplicate`, `pow`, `blocked`, `rate-limited`, `invalid`, and `error` for when none of that fits. Some examples:
    
    - `["OK", "b1a649ebe8...", true, ""]`
    - `["OK", "b1a649ebe8...", true, "pow: difficulty 25>=24"]`
    - `["OK", "b1a649ebe8...", true, "duplicate: already have this event"]`
    - `["OK", "b1a649ebe8...", false, "blocked: you are banned from posting here"]`
    - `["OK", "b1a649ebe8...", false, "blocked: please register your pubkey at https://my-expensive-relay.example.com"]`
    - `["OK", "b1a649ebe8...", false, "rate-limited: slow down there chief"]`
    - `["OK", "b1a649ebe8...", false, "invalid: event creation date is too far off from the current time. Is your system clock in sync?"]`
    - `["OK", "b1a649ebe8...", false, "pow: difficulty 26 is less than 30"]`
    - `["OK", "b1a649ebe8...", false, "error: could not connect to the database"]`