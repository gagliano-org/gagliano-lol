---
type: gpt
title: eseguire log su server tramite ssh
tags:
  - ubuntu
  - server
  - ssh
  - login
---

> come faccio a dare permessi sul server tramite la chiave ssh?

Per configurare l’accesso tramite chiave SSH su **Ubuntu**, segui questi passaggi:

1. **Genera una coppia di chiavi SSH:**
    
    - Apri il terminale sul tuo computer locale.
        
    - Esegui il seguente comando per generare una coppia di chiavi RSA (pubblica e privata):
        
        ```
        ssh-keygen -t rsa -b 4096
        ```
        
    - Segui le istruzioni per specificare la posizione del file chiave e, se desideri, impostare una passphrase.
        
2. **Copia la chiave pubblica sul server:**
    
    - Utilizza uno dei seguenti metodi per copiare la chiave pubblica sul server:
        - **Metodo 1: `ssh-copy-id` (consigliato)**:
            
            ```
            ssh-copy-id username@server_ip_address
            ```
            
        - **Metodo 2: Copia manuale**:
            - Copia il contenuto del file `~/.ssh/id_rsa.pub` (la tua chiave pubblica) sul server.
            - Aggiungi il contenuto alla fine del file `~/.ssh/authorized_keys` sul server.
3. **Verifica l’accesso senza password:**
    
    - Ora dovresti essere in grado di accedere al server senza inserire una password.
        
    - Prova a connetterti al server utilizzando:
        
        ```
        ssh username@server_ip_address
        ```
        
4. **Opzionale: Disabilita l’autenticazione con password**:
    
    - Per migliorare la sicurezza, puoi disabilitare l’autenticazione con password sul server modificando il file di configurazione SSH (`/etc/ssh/sshd_config`).
        
    - Imposta `PasswordAuthentication no` e riavvia il servizio SSH:
        
        ```
        sudo systemctl restart ssh
        ```
        

Ora dovresti essere in grado di accedere al server tramite chiave SSH senza dover inserire una password. 🚀