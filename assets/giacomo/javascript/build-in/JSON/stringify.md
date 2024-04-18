Puoi formattare una stringa creata da `JSON.stringify` utilizzando il terzo parametro, che è un parametro di spaziatura. Questo parametro può essere un numero o una stringa e determina il numero di spazi utilizzati per l’indentazione. Ecco un esempio:

```javascript
let obj = { nome: "Mario", cognome: "Rossi", eta: 30 };
let jsonString = JSON.stringify(obj, null, 2);
console.log(jsonString);
```

In questo esempio, `JSON.stringify` restituirà una stringa con due spazi di indentazione per ogni livello. Il risultato sarà:

```json
{
  "nome": "Mario",
  "cognome": "Rossi",
  "eta": 30
}
```
