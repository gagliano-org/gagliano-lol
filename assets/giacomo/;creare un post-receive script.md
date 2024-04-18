---
type: blog
---

# Come creare uno script `post-receive`
Uno script `post-receive` viene invocato dal `remote` repo quando un `git push` è invocato su di esso.
Solitamente ci troveremo nella necessità di invocare degli scrip presenti nel file `package.json`.
Per poter eseguire degli script, ad esempio far costruire l'immagine `docker` e farla girare sul server, avremo bisogno di due cose:
- `bare git repo` sul server, nel quale verranno creati gli script
- `clone git repo` sul server, nel quale verranno clonati i file per eseguire la costruzione
## Sul server
### Creare il file `post-receive`
- Creare il file `post-receive` nella cartella `hook` dentro nella cartella `<reponame>.git`
- scrivere il seguente codice
```ts
#!/bin/env bun
import { postReceiver } from "../../scripts/git/post-receive/post-receiver";

const response = await postReceiver(`/home/ubuntu/test-remote/`);

console.log(response);
```
- Renderlo eseguibile
```
chmod +x
```

### Creare la cartella che riceverà gli update
- Nel server, creare una cartella `<reponame>` nella quale lo script scaricherà gli aggiornamenti per eseguire lo script
- inizializzare un `git` repo
```
git init
```
- aggiungere il remoto che si trova sul server
```
git remote add origin /path/to/remote.git
```
- controllare che si stato aggiunto
```
git remote -v
```
- creare un branch main
```
git checkout -b main
```

> **Adesso questo repo è pronto per ricevere gli aggiornamenti da remoto.**

## Nel Client
A questo punto 