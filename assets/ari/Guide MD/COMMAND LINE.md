# COMMAND LINE

  

## SUDO

  

| Comando | Descrizione |
| -------------------------------------- | ------------------------------------------------------------------------------------- |
| sudo su | Avvia una shell come utente root. |
| cp [origine] [destinazione] | Crea una copia del file o della directory specificata nella destinazione specificata. |
| mv [origine] [destinazione] | Sposta o rinomina il file o la directory specificata nella destinazione specificata. |
| rm [file/directory] | Elimina il file o la directory specificata. |
| mkdir [directory] | Crea una nuova directory con il nome specificato. |
| cd [directory] | Naviga nella directory specificata. |
| ls | Mostra un elenco dei file e delle directory nella directory corrente. |
| ls -l | Mostra un elenco dettagliato dei file e delle directory nella directory corrente. |
| pwd | Mostra il percorso della directory corrente. |
| chown [utente:gruppo] [file/directory] | Modifica il proprietario e il gruppo del file o della directory specificati. |
| chmod [permessi] [file/directory] | Modifica i permessi di accesso del file o della directory specificati. |

## NANO EDITOR

  
Nano è un editor di testo a riga di comando, utilizzato principalmente su sistemi Linux e Unix. In pratica, Nano è uno strumento che consente di modificare il contenuto di file di testo direttamente dal terminale.
Puoi utilizzare Nano per modificare file di configurazione, script, documenti di testo e qualsiasi altro tipo di file di testo. L'editor è molto utile per coloro che lavorano su server Linux e non hanno accesso a un'interfaccia grafica per la modifica dei file.

  
COME USARE NANO

  
Per entrare in modalità di modifica, basta aprire un file con nano e iniziare a digitare. Quando hai finito di modificare il file, puoi salvarlo e chiudere premendo Ctrl + X, seguito da Y per confermare la salvataggio e poi Invio per confermare il nome del file. Per chiudere il file senza salvare le modifiche, premere Ctrl + X, seguito da N.

  
| Comando | Descrizione 
| :----------------------------------------: | :-----------------------------------------------------------------------------------------------: |
| nano [file] | Apre il file specificato in Nano per la modifica |
| Ctrl + G | Visualizza la guida di Nano |
| Ctrl + X | Chiude il file in modifica e chiede di salvarlo, se necessario |
| Ctrl + O | Salva il file in modifica |
| Ctrl + R | Inserisce un file nel file corrente |
| Ctrl + W | Cerca una stringa nel file |
| Ctrl + K | Taglia la riga corrente |
| Ctrl + U | Incolla la riga precedentemente tagliata |
| Ctrl + J | Giustifica il testo nella riga corrente |
| Alt + U | Annulla l'ultima modifica |
| Alt + E | Ripristina l'ultima modifica annullata |
| Alt + A | Seleziona tutto il testo del file |
| Alt + 6 | Commenta/Decommenta la riga corrente |
| Ctrl + C | Mostra la posizione del cursore nel file |
| Ctrl + \_ | Inserisce un carattere specifico (in formato octal) |
| Ctrl + \|Va alla riga specificata nel file |
| Ctrl + T | Consente di effettuare una sostituzione in tutto il file |
| Ctrl + V | Passa al menu visuale di Nano, in cui si possono tagliare, copiare e incollare testo con il mouse |