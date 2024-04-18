# NIP-13

## Proof of Work

Questo NIP definisce un modo per generare e interpretare la Proof of Work (PoW) per i messaggi nostr. La Proof of Work è un modo per aggiungere una prova di lavoro computazionale a un messaggio. Si tratta di una prova che tutti i relè e i client possono validare universalmente con una piccola quantità di codice. Questa prova può essere utilizzata come deterrente allo spam.

La `difficoltà` è definita come il numero di zeri iniziali nella `NIP-01` id. Ad esempio, un id del tipo `000000000e9d97a1ab09fc381030b346cdd7a142ad57e6df0b46dc9bef6c7e2d` ha una difficoltà di `36` con `36` zeri iniziali.

`002f...` è `0000 0000 0010 1111...` in binario, che ha 10 zeri iniziali. Non dimenticare di contare gli zeri iniziali per le cifre esadecimali <= `7`.

### Mining

Per generare la PoW per un messaggio `NIP-01`, viene utilizzato un tag `nonce`:

```json
{"content": "It's just me mining my own business", "tags": [["nonce", "1", "21"]]}
```

Durante il mining, la seconda voce del tag nonce viene aggiornata, quindi viene ricalcolato l'id (vedi [NIP-01]. Se l'id ha il numero desiderato di zeri iniziali, il messaggio è stato minato. È consigliabile aggiornare anche il campo `created_at` durante questo processo.

La terza voce del tag nonce `DOVREBBE` contenere la difficoltà obiettivo. Ciò consente ai client di proteggersi dalle situazioni in cui gli spammer di massa mirano a una difficoltà più bassa e riescono a ottenere una corrispondenza con una difficoltà più alta. Ad esempio, se richiedi 40 bit per rispondere al tuo thread e vedi un obiettivo dichiarato di 30, puoi rifiutarlo in modo sicuro anche se il messaggio ha una difficoltà di 40 bit. Senza un impegno sulla difficoltà obiettivo, non potresti rifiutarlo. Impegnarsi su una difficoltà obiettivo è qualcosa a cui tutti i minatori onesti dovrebbero acconsentire, e i clienti `POTREBBERO` rifiutare un messaggio che corrisponde a una difficoltà obiettivo se manca l'impegno sulla difficoltà.

### Esempio di messaggio minato

```json
{
  "id": "000006d8c378af1779d2feebc7603a125d99eca0ccf1085959b307f64e5dd358",
  "pubkey": "a48380f4cfcc1ad5378294fcac36439770f9c878dd880ffa94bb74ea54a6f243",
  "created_at": 1651794653,
  "kind": 1,
  "tags": [
    [
      "nonce",
      "776797",
      "21"
    ]
  ],
  "content": "It's just me mining my own business",
  "sig": "284622fc0a3f4f1303455d5175f7ba962a3300d136085b9566801bc2e0699de0c7e31e44c81fb40ad9049173742e904713c3594a1da0fc5d2382a25c11aba977"
}
```

### Validazione

Ecco un codice C di riferimento per calcolare la difficoltà (ovvero il numero di zeri iniziali) in un id di un evento nostr:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int countLeadingZeroes(const char *hex) {
    int count = 0;

    for (int i = 0; i < strlen(hex); i++) {
        int nibble = (int)strtol((char[]){hex[i], '\0'}, NULL, 16);
        if (nibble == 0) {
            count += 4;
        } else {
            count += __builtin_clz(nibble) - 28;
            break;
        }
    }

    return count;
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <hex_string>\n", argv[0]);
        return 1;
    }

    const char *hex_string = argv[1];
    int result = countLeadingZeroes(hex_string);
    printf("Zeri iniziali nella stringa esadecimale %s: %d\n", hex_string, result);

    return 0;
}
```

Ecco un codice JavaScript per fare la stessa cosa:

```javascript
// hex dovrebbe essere una stringa esadecimale (senza il prefisso 0x)
function countLeadingZeroes(hex) {
  let count = 0;

  for (let i = 0; i < hex.length; i++) {
    const nibble = parseInt(hex[i], 16);
    if (nibble === 0) {
      count += 4;
    } else {
      count += Math.clz32(nibble) - 28;
      break;
    }
  }

  return count;
}
```

### Interrogare i relè per i messaggi PoW

Se i relè consentono la ricerca su prefissi, è possibile utilizzare questo metodo per filtrare i messaggi di una determinata difficoltà:

```sh
$ echo '["REQ", "subid", {"ids": ["000000000"]}]'  | websocat wss://some-relay.com | jq -c '.[2]'
{"id":"

000000000121637feeb68a06c8fa7abd25774bdedfa9b6ef648386fb3b70c387", ...}
```

### Proof of Work Delegata

Poiché l'id del messaggio `NIP-01` non è vincolato a alcuna firma, la PoW può essere esternalizzata a provider di PoW, magari a pagamento. Questo offre un modo per i client di far circolare i propri messaggi attraverso i relè con restrizioni sulla PoW senza dover fare alcun lavoro da soli, il che è utile per i dispositivi con risorse energetiche limitate come i telefoni cellulari.