---
type: "[[event]]"
kind: "[[4]]"
nip: "[[nip04]]"
it: "[[;nip04]]"
---
# Encrypted Direct Message
Un evento speciale di kind `4` significa `encrypted direct message`. Ci si aspetta che abbia i seguenti attributi:
[[content]] must be equal to the [[base64-encoded]], [[aes-356-cbc]] stringa crittografica di qualsiasi cosa lo user voglia scrivere. La crittografia deve essere generata combinando la `pubkey` del recipiente con la `seckey` dello user che invia il messaggio; a questo va appeso il vettore di inizializzazione codificato in [[base64-encoded]], come se fosse un parametro della [[query string]] chiamato `iv`. Il formato è il seguente: `"content": "<encrypted_text>?iv=<initialization_vector>"`.
I `tags` DEVONO contenere una voce che identifica il destinatario del messaggio (in modo che i relay possano inoltrare naturalmente questo evento a loro), nella forma `[“p”, “<pubkey, come stringa esadecimale>”]`.
I `tags` POSSONO contenere una voce che identifica il messaggio precedente in una conversazione o un messaggio a cui stiamo rispondendo esplicitamente (in modo che possano avvenire conversazioni contestuali e più organizzate), nella forma [“e”, “<event_id>”].
>Nota: Nell’implementazione ECDH di [libsecp256k1](https://github.com/bitcoin-core/secp256k1), il segreto è l’hash SHA256 del punto condiviso (sia le coordinate X che Y). In Nostr, solo la coordinata X del punto condiviso viene utilizzata come segreto e NON viene hashata. Se si utilizza libsecp256k1, una funzione personalizzata che copia la coordinata X deve essere passata come argomento `hashfp` in `secp256k1_ecdh`. Vedi [qui](https://github.com/bitcoin-core/secp256k1/blob/master/src/modules/ecdh/main_impl.h#L29).
Esempio di codice per generare un tale evento in JavaScript:
```js
import crypto from 'crypto'
import * as secp from '@noble/secp256k1'

let sharedPoint = secp.getSharedSecret(ourPrivateKey, '02' + theirPublicKey)
let sharedX = sharedPoint.slice(1, 33)

let iv = crypto.randomFillSync(new Uint8Array(16))
var cipher = crypto.createCipheriv(
  'aes-256-cbc',
  Buffer.from(sharedX),
  iv
)
let encryptedMessage = cipher.update(text, 'utf8', 'base64')
encryptedMessage += cipher.final('base64')
let ivBase64 = Buffer.from(iv.buffer).toString('base64')

let event = {
  pubkey: ourPubKey,
  created_at: Math.floor(Date.now() / 1000),
  kind: 4,
  tags: [['p', theirPublicKey]],
  content: encryptedMessage + '?iv=' + ivBase64
}
```
## Avviso di Sicurezza
Questo standard non si avvicina a ciò che è considerato lo stato dell’arte nella comunicazione crittografata tra pari, e rivela metadati negli eventi, quindi non deve essere utilizzato per nulla che devi davvero mantenere segreto, e solo con relay che utilizzano `AUTH` per limitare chi può recuperare i tuoi eventi di tipo:`4`.

## Avviso di Implementazione del Client
I client *non dovrebbero* cercare di sostituire le referenze della chiave pubblica o della nota dal `.content`. Se elaborato come una nota di testo normale (dove `@npub…` viene sostituito con` #[0]` con un tag `[“p”, “…”]`) i tag vengono rivelati e l’utente menzionato riceverà il messaggio nella sua casella di posta.
#da
[[nip04]]