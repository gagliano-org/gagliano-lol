# CONNESSIONE SSH

  

## Prerequisiti

  

![[UFW]]
## Abilitazione

  

Abilitiamo SSH su Ubuntu Server, agisci come root o utente con privilegi sudo per installare e abilitare SSH sul tuo sistema Ubuntu puoi seguire questi passaggi:

  

Installa il pacchetto openssh-server:

  

```

sudo apt update

sudo apt install openssh-server

```

  

Al termine dell’installazione, il servizio SSH verrà avviato automaticamente. Puoi verificare se SSH funziona digitando:

  

```

sudo systemctl status ssh

```

  

Ubuntu viene fornito con un’utilità di configurazione del firewall chiamata UFW. Se il tuo sistema ha un firewall abilitato, assicurati di aprire la porta SSH:

  

```

sudo ufw allow ssh

```

  

![[Connessione tramite pc (SSH)]]