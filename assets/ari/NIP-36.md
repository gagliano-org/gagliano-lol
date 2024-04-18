# NIP-36

## Contenuto Sensibile / Avviso sul Contenuto

Il tag `content-warning` consente agli utenti di specificare se il contenuto dell'evento deve essere approvato dai lettori per essere visualizzato. I client possono nascondere il contenuto fino a quando l'utente agisce su di esso.

I tag `l` e `L` POSSONO anche essere utilizzati come definito in [NIP-32] con `content-warning` o altri spazi dei nomi per supportare ulteriori qualificazioni e ricerche.

#### Specifiche

```
tag: content-warning
options:
 - [reason]: optional
```

#### Esempio

```json
{
    "pubkey": "<chiave-pubblica>",
    "created_at": 1000000000,
    "kind": 1,
    "tags": [
      ["t", "hastag"],
      ["L", "content-warning"],
      ["l", "reason", "content-warning"],
      ["L", "social.nos.ontology"],
      ["l", "NS-nud", "social.nos.ontology"],
      ["content-warning", "reason"] /* reason è facoltativo */
    ],
    "content": "contenuto sensibile con #hastag\n",
    "id": "<id-evento>"
}
```