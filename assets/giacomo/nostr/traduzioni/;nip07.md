# NIP-07
## Window.nostr
L’oggetto `window.nostr` può essere reso disponibile dai browser web o dalle estensioni e i siti web o le web-app possono utilizzarlo dopo averne verificato la disponibilità.

Questo oggetto deve definire i seguenti metodi:

```js
async window.nostr.getPublicKey(): string
// restituisce una chiave pubblica come esadecimale
async window.nostr.signEvent(event: Event): Event
// prende un oggetto evento, aggiunge `id`, `pubkey` e `sig` e lo restituisce
```
Oltre a questi due di base, le seguenti funzioni possono anche essere implementate opzionalmente:

```js
async window.nostr.getRelays(): { [url: string]: {read: boolean, write: boolean} }
// restituisce una mappa di base degli url dei relay alle politiche dei relay
async window.nostr.nip04.encrypt(pubkey, plaintext): string
// restituisce il ciphertext e iv come specificato in nip-04 async 
window.nostr.nip04.decrypt(pubkey, ciphertext): string
// prende il ciphertext e iv come specificato in nip-04
```
### Implementato da
- [horse](https://github.com/fiatjaf/horse) (Chrome and derivatives)
- [nos2x](https://github.com/fiatjaf/nos2x) (Chrome and derivatives)
- [Alby](https://getalby.com/) (Chrome and derivatives, Firefox)
- [Blockcore](https://www.blockcore.net/wallet) (Chrome and derivatives)
- [nos2x-fox](https://diegogurpegui.com/nos2x-fox/) (Firefox)
- [Flamingo](https://www.getflamingo.org/) (Chrome and derivatives)
- [AKA Profiles](https://github.com/neilck/aka-extension) (Chrome, stores multiple keys)
- [TokenPocket](https://www.tokenpocket.pro/) (Android, IOS, Chrome and derivatives)
- [Nostrmo](https://github.com/haorendashu/nostrmo_faq#download) (Android, IOS)