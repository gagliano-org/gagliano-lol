Le variabili d'ambiente sono un meccanismo utile per configurare e personalizzare le tue applicazioni senza dover modificare il codice sorgente direttamente.
Puoi utilizzare le variabili d'ambiente per impostare, ad esempio, la porta su cui un server deve essere avviato.

Ecco come puoi farlo in modo generale:

# Creazione di una variabile d'ambiente:

- Su sistemi Unix-like (Linux, macOS), puoi definire una variabile d'ambiente direttamente dal terminale utilizzando il comando export:

      $ export NOME_VAR=VALORE

- Su sistemi Windows, puoi utilizzare il comando set:

      set NOME_VAR=VALORE

Sostituisci NOME_VAR con il nome che desideri per la tua variabile d'ambiente e VALORE con il valore desiderato (ad esempio, la porta su cui deve essere eseguito il server).

Impostando la variabile in questo modo la renderà accessibile fino al riavvio seguente.

# Rendere persistente una variabile

Per rendere le variabili persistenti segui questi passi:

## Mac

Aggiungengi la variabile ad uno script che viene lanciato all'apertura di una shell di terminale come ad esempio i file `.bashrc` o `.profile` (linux e mac).

## Windows

È possibile rendere persistente una variabile d'ambiente definendola attraverso le impostazioni avanzate del sistema.

# Leggere la variabile d'ambiente nel tuo codice:

La sintassi per leggere una variabile d'ambiente varia a seconda del linguaggio di programmazione che stai utilizzando. Ecco alcuni esempi per diversi linguaggi:

- python

  ```py
  import os

  # Leggi il valore della variabile d'ambiente
  porta = os.environ.get('NOME_VAR')

  # Verifica se la variabile d'ambiente esiste prima di utilizzarla
  if porta:
      print(f"La porta è impostata su: {porta}")
  else:
      print("La variabile d'ambiente non è stata impostata.")

  ```

- javascript

  ```js
  // Leggi il valore della variabile d'ambiente
  const porta = process.env.NOME_VAR;

  // Verifica se la variabile d'ambiente esiste prima di utilizzarla
  if (porta) {
    console.log(`La porta è impostata su: ${porta}`);
  } else {
    console.log("La variabile d'ambiente non è stata impostata.");
  }
  ```

  Assicurati di adattare il codice al tuo linguaggio di programmazione preferito.

# Utilizzare il valore della variabile d'ambiente nel server:

Ora che hai letto il valore della variabile d'ambiente nel tuo codice, puoi utilizzarlo per configurare la porta su cui il tuo server deve essere avviato. Ad esempio, se stai sviluppando un server web, puoi passare il valore della porta alla funzione che avvia il server.

Ad esempio, in Node.js/Express:

```js
const express = require("express");
const app = express();

const porta = process.env.NOME_VAR || 3000; // Usa la porta 3000 se la variabile d'ambiente non è impostata

app.listen(porta, () => {
  console.log(`Il server è in ascolto sulla porta ${porta}`);
});
```

In questo modo, puoi facilmente personalizzare la configurazione del tuo server senza dover modificare il codice sorgente ogni volta che desideri cambiare la porta su cui viene eseguito. Basta modificare il valore della variabile d'ambiente.

# Variabile d'ambiente NODE_ENV:

È possibile utilizzare una variabile d'ambiente per distinguere tra l'ambiente di sviluppo (dev) e l'ambiente di produzione (production) e quindi impostare automaticamente i valori delle variabili in base all'ambiente in cui viene eseguita l'applicazione. Di solito, questa variabile d'ambiente è chiamata qualcosa come "NODE_ENV" o "ENVIRONMENT".

Ecco come puoi farlo:

## Definire la variabile

In ambiente di sviluppo, puoi impostare la variabile d'ambiente così in una shell del terminale:

    export NODE_ENV=development

In ambiente di produzione, puoi impostarla in questo modo:

    export NODE_ENV=production

## Leggere la variabile NODE_ENV nel tuo codice:

Nel tuo codice, puoi leggere il valore della variabile NODE_ENV per determinare l'ambiente corrente e quindi configurare le altre variabili di conseguenza. Ecco un esempio in Node.js:

```javascript
Copy code
// Leggi il valore della variabile d'ambiente NODE_ENV
const ambiente = process.env.NODE_ENV || 'development';

// Configura altre variabili in base all'ambiente
let porta;

if (ambiente === 'production') {
porta = process.env.PORT || 3000; // Usa la porta specificata in produzione o 3000 di default
} else {
porta = 3000; // Usa la porta 3000 in sviluppo
}

console.log(`Ambiente corrente: ${ambiente}`);
console.log(`Porta del server: ${porta}`);
```

# Come utilizzare nel contensto di una ZAION.

Abbiamo studiato questo lifecycle per il nostro ambiente di sviluppo:

| fase | ambiente                   | NODE_ENV | decrizione                                   | prefissi                           | rete   | quando                                             |
| ---- | -------------------------- | -------- | -------------------------------------------- | ---------------------------------- | ------ | -------------------------------------------------- |
| IDEA | chat, group, discord       |          | fase di ideazione                            |                                    | locale |                                                    |
|      | local machine, zion-server | WIP      | fase di sviluppo in ambiente locale          | wip.sito.com, wip.staging.sito.com | locale | nel dockerfile </br> `export NODE_ENV=wip`         |
|      | host                       | DEV      | fase di testing del build in ambiente remoto | staging.sito.com                   | www    | nel dockerfile </br> `export NODE_ENV=development` |
|      | host                       | MAIN     | produzione                                   | www.sito.com, sito.com             | www    | nel dockerfile </br> `export NODE_ENV=production`  |

nel server metti una condizione di questo tipo:

```js
if(process.env.NODE_ENV === "")
```
