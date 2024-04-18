# CONFIGURARE UN INDIRIZZO IP STATICO

  

Per impostare manualmente l'indirizzo IP della scheda di rete Ethernet del tuo Raspberry Pi 4, puoi accedere al file di configurazione network-config sulla scheda SD del tuo Raspberry Pi 4 da un PC Windows seguendo questi passaggi:

  

- Inserisci la scheda SD nel PC.

- Apri Esplora file e individua la scheda SD.

- Vai alla cartella in cui si trova il file di configurazione network-config.

  

> Il file network-config è un file di configurazione per la scheda di rete del Raspberry Pi che viene utilizzato per impostare l'indirizzo IP e altre opzioni di rete. Questo file utilizza una specifica sintassi ed è eseguito all'avvio del sistema.

  

- Fai clic destro sul file e seleziona "Apri con" e scegli un editor di testo come Notepad o WordPad.

Se stai usando Ubuntu dovresti vedere quanto segue:

  

```

# This file contains a netpan-compatible configuration wich cloud-init

# will apply on firt-boot. Please refer to the cloud-init documentation and

# the netplan reference for full details:

#

# https://cloudinit.readthedocs.io/

# https://netplan.io/reference

#

# Some additional examples are commented out below

  

version: 2

ethernets:

eth0:

dhcp4: true

optional: true

#wifis:

# wlan0:

# dhcp4: true

# optional: true

# access-points:

# myhomewifi:

# password: "S3kr1t"

# myworkwifi:

# password: "correct battery horse staple"

# workssid:

# auth:

# key-management: eap

# method: peap

# identity: "me@example.com"

# password: "passw0rd"

# ca-certificate: /etc/my_ca.pem

```

  

- Adattiamo ora il network alla tua connessione di rete desiderata; dovresti vedere che dhcph4 è impostato su "true", ma per configurare un indirizzo IP statico è necessario rimuovere oppure modificare la riga dhcp4. Modifica il file inserendo le seguenti righe per impostare corretamente l'indirizzo IP statico:

  

```

#[...]

#

# Some additional examples are commented out below

  

version: 2

ethernets:

eth0:

dhcp4: no

addresses:

[192.168.1.254/24]

gateway4: 192.168.1.1

nameservers:

addresses:

[8.8.8.8, 8.8.4.4]

optional: true

#wifis:

# wlan0:

# dhcp4: true

# optional: true

#[...]

```

  

In questo esempio, l'indirizzo IP statico è impostato su 192.168.1.254 con una subnet mask di /24, il gateway predefinito è impostato su 192.168.1.1 e i server DNS di Google sono utilizzati come risolutori DNS.

Si noti che "dhcp4" indica che il protocollo di configurazione dinamica degli host (DHCP) non viene utilizzato per ottenere l'indirizzo IP dinamicamente, ma viene invece impostato manualmente con l'opzione "addresses".

  

- Salva le modifiche e chiudi il file di configurazione.

> È importante salvare il file con il nome "network-config" nella directory principale della scheda SD, poiché questo è il nome del file utilizzato dal sistema operativo Raspberry Pi per leggere le impostazioni di rete durante l'avvio

  

## Notes:

  

La parte "nameservers: addresses: [8.8.8.8, 8.8.4.4]" indica che i server DNS di Google sono stati impostati come risolutori DNS per il Raspberry Pi. Quando un dispositivo si connette a Internet, utilizza un risolutore DNS per tradurre i nomi di dominio (ad esempio www.google.com) in corrispondenti indirizzi IP che identificano i server web. In questo caso, i due indirizzi IP specificati (8.8.8.8 e 8.8.4.4) appartengono ai server DNS di Google. In altre parole, il Raspberry Pi utilizzerà questi server per risolvere i nomi di dominio in indirizzi IP quando necessario. Altri risolutori DNS possono essere utilizzati se necessario modificando i valori dell'opzione "addresses".

  

> Ci sono molti altri risolutori DNS oltre a quelli di Google che possono essere utilizzati. Alcuni esempi sono:

>

> - OpenDNS (208.67.222.222, 208.67.220.220)

> - Cloudflare DNS (1.1.1.1, 1.0.0.1)

> - Quad9 (9.9.9.9, 149.112.112.112)

> - Level3 DNS (4.2.2.1, 4.2.2.2)

  

Tuttavia, la scelta del risolutore DNS da utilizzare dipende dalle esigenze e dalla posizione geografica. Si consiglia di effettuare una ricerca online per trovare il risolutore DNS che meglio soddisfa le proprie esigenze.

  
