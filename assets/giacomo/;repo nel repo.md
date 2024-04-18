Quando lavoriamo in un `monorepo`, ovvero un repo che ha più o meno questa struttura di dati:
```
root
|_.git
|_apps
|	|_app1
|	|_app2
|_package
	|_pack1
	|_pack2
```
possiamo creare un `git` repo anche nei root delle singole `app`/`package`.
Per farlo bisogno seguire questo procedimento:

- [ ] creare la cartella che ospiterà il codice per il quale desideriamo creare un `sub git repo`.
- [ ] creare un file README se non esiste
- [ ] aggiungere i cambiamenti al `git` del `monorepo` (parte fondamentale)
- [ ] inizializzare il git repo `git init` nella cartella dell' `app/package`
- [ ] aggiungere il cambiamento per inizializzare il repo `git add . && git commit . -m init`

## Caso in cui si ha per sbaglio creato prima il `git` nel pacchetto

Nel caso in cui per sbaglio si abbia creato un `git` repo nel pacchetto prima di aggiungere la cartella nel `monorepo`, seguire i seguenti passi:
- [ ] controllare se il pacchetto ha un remote
	- [ ] se non esiste crearlo
	- [ ] se esiste passare al punto seguente
- [ ] sincronizzare i cambiamenti con il `remote` al fine di non perdere i cambiamenti
- [ ] copiare il link del remote
- [ ] cancellare il contenuto della `pacchetto` dalla posizione `apps/` o `packages/`
- [ ]  ricreare la cartella con `mkdir <nome-cartella>`
- [ ] creare un file readme con `touch README`
- [ ] effettuare `commit` dei cambiamenti nel `git` del `monorepo`
- [ ] creare un `git` repo nell'`app` o `package`
- [ ] aggiungere un `remote` al `git` repo dell'`app` o `package` con `git remote add <nome-remote> <url>`
- [ ] effettuare `fetch` dal remoto
- [ ] a questo punto si può effettuare il commit dei cambiamenti anche nel `monorepo`