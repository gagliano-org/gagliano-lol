---
type: gpt
title: script a seguito di `git pull`
tags:
  - git
---

## Eseguire uno script ogni volta che si esegue git pull

Per eseguire uno script ogni volta che effettui un `git pull` su un determinato branch, puoi utilizzare i **git hooks**. I git hooks sono script che Git esegue prima o dopo gli eventi come `commit`, `push`, e `receive`. Git esegue automaticamente i git hooks presenti nella directory `.git/hooks` del tuo repository.

Ecco come potresti configurare un git hook per il tuo caso:

1. Naviga alla directory `.git/hooks` nel tuo repository.
2. Crea un nuovo file chiamato `post-merge`. Questo è il git hook che verrà eseguito dopo ogni `git pull` o `git merge`.
3. Apri il file `post-merge` con un editor di testo e incolla il seguente script:

```bash
#!/bin/sh

# Controlla se ci troviamo sul branch 'main'
if [ $(git rev-parse --abbrev-ref HEAD) = "main" ]; then
  # Esegui il tuo script JavaScript con bun
  bun /path/to/your/script.js
fi
```

4. Salva e chiudi il file.
5. Rendi il file `post-merge` eseguibile con il comando: `chmod +x .git/hooks/post-merge`.

Ora, ogni volta che esegui un `git pull` o un `git merge` sul branch ‘main’, Git eseguirà automaticamente il tuo script TypeScript.

> pero io vorrei che chiamasse lo script solo quando il merge avviene dal remote verso il mio repo, non quando io faccio merge dei cambiamenti nel repo stesso, solo quando ho fatto fetch e poi pull

Capisco, vuoi che lo script venga eseguito solo quando fai un `git pull` dal repository remoto, non quando fai un merge nel tuo repository locale. Puoi ottenere questo comportamento modificando lo script del git hook in questo modo:

```bash
#!/bin/sh

# Controlla se ci troviamo sul branch 'main'
if [ $(git rev-parse --abbrev-ref HEAD) = "main" ]; then
  # Controlla se il merge proviene da un fetch dal repository remoto
  if [ $(git log -1 --pretty=%B) = "Merge branch 'main' of https://github.com/your/repo.git" ]; then
    # Esegui il tuo script JavaScript con bun
    bun /path/to/your/script.js
  fi
fi
```

In questo script, `git log -1 --pretty=%B` restituisce il messaggio del commit più recente. Quando fai un `git pull`, Git crea automaticamente un commit di merge con un messaggio che dice "Merge branch 'main' of https://github.com/your/repo.git". Quindi, se il messaggio del commit più recente corrisponde a questo, lo script sa che il merge proviene da un `git pull` e esegue il tuo script JavaScript.

Ricorda di sostituire "https://github.com/your/repo.git" con l'URL del tuo repository remoto e "/path/to/your/script.js" con il percorso effettivo del tuo script JavaScript.

Nota: Questo script funziona solo se non cambi il messaggio di commit predefinito quando fai un `git pull`. Se cambi il messaggio di commit, dovrai aggiornare lo script per cercare il tuo messaggio di commit personalizzato.