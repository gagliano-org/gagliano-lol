---
type: gpt
title: hook per buildare docker on push
tags:
  - git
  - docker
  - hook
  - push
---

>ho creato un filder .git sul mio server, mi scrivi un hook per far si che quando un cambiamento viene pushato sul repo effettui lo scaricamento del branch modificato in una cartella sul server e dopo di che faccia partire il comando "bun run docker:build" e il comando "bun run docker:run" una volta che build ha avutor successo?

Certo, posso aiutarti a creare un hook Git. Gli hook Git sono script che Git esegue prima o dopo gli eventi come `commit`, `push`, e così via. Nel tuo caso, vuoi che un hook venga eseguito dopo un `push`, quindi avrai bisogno di un hook `post-receive`.

Ecco un esempio di come potrebbe essere il tuo hook `post-receive`. Questo script va nel file `post-receive` nella directory `.git/hooks` del tuo repository sul server.

```bash
#!/bin/bash

# Vai alla directory del tuo progetto
cd /path/to/your/project || exit

# Esegui git pull per ottenere l'ultimo codice
git pull origin main

# Esegui i tuoi comandi
bun run docker:build && bun run docker:run
```

Ricorda di sostituire `/path/to/your/project` con il percorso effettivo della tua cartella del progetto sul server.

Inoltre, assicurati che lo script abbia i permessi di esecuzione. Puoi farlo con il comando `chmod +x post-receive`.

**Nota**: Questo è un esempio di base e potrebbe non funzionare perfettamente per il tuo caso d’uso specifico. Potrebbe essere necessario personalizzare ulteriormente lo script in base alle tue esigenze. Spero che queste informazioni ti siano d’aiuto! 😊