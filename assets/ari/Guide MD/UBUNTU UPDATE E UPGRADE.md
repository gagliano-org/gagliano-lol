# UBUNTU UPDATE E UPGRADE

  

> Questa guida fornisce una serie di comandi da utilizzare per effettuare l'aggiornamento e l'upgrade del sistema operativo Ubuntu.

  

Ripuliamo la cache locale dei pacchetti:

  

```

sudo apt-get clean

```

  

Successivamente dobbiamo scaricare la lista aggiornata dei pacchetti e delle nuove versioni disponibili nei repository. Questo comando si limita a recuperare informazioni, ma, in concreto, non installa nulla:

  

```

sudo apt-get update

```

  

Questo è il comando principale, poiché scarica ed installa le ultime versioni dei pacchetti, delle dipendenze ed, eventualmente, il kernel più recente. In ogni caso, non esegue mai l’avanzamento di versione:

  

```

sudo apt-get dist-upgrade -y

```

  

In questo caso, invece se necessario, si esegue l’avanzamento di versione, passando alla release di Ubuntu successiva:

  

```

sudo do-release-upgrade

```

  

Infine, puoi rimuove tutti i pacchetti obsoleti e non più necessari:

  

```

sudo apt-get autoremove -y

```
