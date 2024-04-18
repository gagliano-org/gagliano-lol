# BACKUP DELLA SD


  

Questa è la guida passo passo su come utilizzare ApplePi-Baker per effettuare il backup della scheda SD del Raspberry Pi senza spazi vuoti e ripristinare il backup su una nuova schedina utilizzando Raspberry Pi Imager. Ricorda di prestare sempre attenzione durante il processo di backup e ripristino per evitare di perdere dati importanti.

  

### Effettuare il backup della scheda SD del Raspberry Pi senza spazi vuoti con ApplePi-Baker

  

1. Scaricare e installare ApplePi-Baker sul proprio computer.

  

2. Inserire la scheda SD del Raspberry Pi nel computer tramite un adattatore SD.

  

3. Aprire ApplePi-Baker e selezionare la scheda SD del Raspberry Pi dall'elenco dei dispositivi disponibili.

  

4. Selezionare la scheda SD e fare clic sul pulsante "Read Backup".

  

5. Selezionare la posizione in cui si desidera salvare il backup della scheda SD e fare clic su "Save".

  

6. Attendere il completamento del processo di backup. Ci vorrà del tempo a seconda delle dimensioni della scheda SD e della velocità di lettura del computer.

  

7. Una volta completato il processo di backup, rimuovere la scheda SD dal computer.

  

### Ripristinare il backup su una nuova schedina con Raspberry Pi Imager

  

1. Scaricare e installare Raspberry Pi Imager sul proprio computer.

  

2. Inserire la nuova scheda SD nel computer tramite un adattatore SD.

  

3. Aprire Raspberry Pi Imager e selezionare l'opzione "Use custom" dalla finestra principale.

  

4. Selezionare il file di backup creato con ApplePi-Baker e fare clic su "Open".

  

5. Selezionare la nuova scheda SD come destinazione per il ripristino del backup.

  

6. Fare clic sul pulsante "Write" e attendere il completamento del processo di ripristino.

  

7. Una volta completato il processo di ripristino, rimuovere la nuova scheda SD dal computer e inserirla nel Raspberry Pi.

  

8. Accendere il Raspberry Pi e verificare che il sistema operativo sia stato ripristinato correttamente.

  

POSIZIONI CONNESSE:

`diskutil list `

PROCESSI ATTIVI

`ps aux | grep dd `

CON NUMERO PROCESSO TROVATO PRECEDENTEMENTE CONTROLLO DATI TRASFERITI

`sudo kill -INFO 1821`

  

Ripristino SD dall'immagine di backup

  

`/Users/Ari/Zion_Backup/zion23_2.img`

  

