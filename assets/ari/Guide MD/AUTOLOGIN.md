# AUTOLOGIN

  

Eseguendo i seguenti comandi andremo a creare una cartella ed un file in una directory specifica nel sistema operativo Linux, per consentirci di configurare l'accesso automatico dell'utente "ubuntu" sulla tty1 del sistema.

  

Navighiamo nel percorso `/etc/systemd/system`:

  

```

$ cd /etc/systemd/system

```

  

Adesso all'inetno di system creiamo una cartella denominata : `getty@tty1.service`.d:

  

```

$ mkdir getty@tty1.service.d

```

  

Navighiamo all'interno della cartella appena creata :

  

```

$ cd getty@tty1.service.d

```

  

Aquesto punto creiamo un file chiamto `autologin.conf` :

  

```

$ touch autologin.conf

```

  

Scriviamo all'interno del file:

  

```

[Service]

ExecStart=

ExecStart=-/sbin/agetty -o '-p -f -- \\u' --noclear --autologin ubuntu - $TERM

```

  

## VERIFICA CONFIGURAZIONE

  

Per verificare se la configurazione dell'autologin su tty1 del tuo server Ubuntu installato su Raspberry funziona correttamente, puoi seguire questi passaggi:

  

1. Verifica lo stato del servizio getty di tty1 con il seguente comando:

css

  

```

systemctl status getty@tty1.service

```

  

2. Se il servizio è attivo, dovresti vedere un output simile a questo:

  

```

● getty@tty1.service - Getty on tty1

Loaded: loaded (/lib/systemd/system/getty@.service; enabled; vendor preset: enabled)

Active: active (running) since Mon 2023-05-01 12:00:00 CEST; 3 days ago

Docs: man:agetty(8)

man:systemd-getty-generator(8)

https://www.freedesktop.org/wiki/Software/systemd/catalog/daemons/

Main PID: 1234 (agetty)

Tasks: 1 (limit: 4915)

Memory: 272.0K

CGroup: /system.slice/system-getty.slice/getty@tty1.service

└─1234 /sbin/agetty --autologin NOME_UTENTE --noclear %I $TERM

  

```

  

Assicurati che il servizio sia "active (running)" e che mostri l'opzione di autologin che hai inserito. 3. Verifica lo stato del servizio systemd con il seguente comando:

lua

  

```

systemctl status systemd-logind.service

```

  

4. Se il servizio è attivo, dovresti vedere un output simile a questo:

  

```

● systemd-logind.service - Login Service

Loaded: loaded (/lib/systemd/system/systemd-logind.service; static; vendor preset: enabled)

Active: active (running) since Mon 2023-05-01 12:00:00 CEST; 3 days ago

Docs: man:systemd-logind.service(8)

man:logind.conf(5)

https://www.freedesktop.org/wiki/Software/systemd/catalog/daemons/

https://www.freedesktop.org/wiki/Software/systemd/multiseat/

Main PID: 1234 (systemd-logind)

Tasks: 1 (limit: 4915)

Memory: 1.1M

CGroup: /system.slice/systemd-logind.service

└─1234 /lib/systemd/systemd-logind

  

```

  

Una volta che abbiamo configurato l'accesso automatico dell'utente "ubuntu" sulla tty1 del sistema, è necessario riavviare il server Ubuntu per rendere effettive le modifiche. Per fare ciò, possiamo digitare il comando:

  

```

sudo reboot

```

  

Dopo il riavvio, se l'autologin è stato configurato correttamente, dovremmo vedere una schermata nera sulla tty1 del sistema.

In questo modo, possiamo continuare ad utilizzare il server tramite connessione SSH o, se preferiamo, possiamo passare ad un altro TTY (ad esempio, premendo CTRL + ALT + F2) e accedere alla riga di comando utilizzando una tastiera e uno schermo collegati direttamente al server.

  
