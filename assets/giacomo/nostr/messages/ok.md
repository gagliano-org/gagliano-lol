---
name: OK
parents: ["[[server messages]]"]
---
## Slug
`OK` ^52bde6

## Forma del messaggio

	["OK", <event_id>, <true|false>, <message>]

^8da701

## Utilizzo
Questo messaggio è utilizzato per indicare l'accettazione o il diniego di un messaggio `EVENT`. ^f4c666

## Rules
Il messaggio `OK` **DEVE** essere inviato come risposta ad un messaggio `EVENT` ricevuto dai clients.
Devono contenere un terzo argomento con valore `true` se l'evento è stato accettato dal relay, altrimenti di valore `false`.
Il quarto parametro può essere vuoto se il terzo parametro è `true`, in caso contrario deve essere una `string` contente un prefisso `single-word` `machine-readable` seguito da un messaggio. ^0d8cc4
>I prefissi `machine-readable` standard sono:
>* `duplicate`
>* `pow`
>* `blocked`
>* `rate-limited`
>* `invalid`
>* `error`