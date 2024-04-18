Nel `monorepo` diventa un casino gestire dove si deve effettuare il commit:
- nel `monorepo`?
- nel `root` dell'`app`/`package`?

## Soluzione 1: dal root del `monorepo`

Aprendo un `vscode` nel root del `monorepo`, nel menu `git` di `vscode` dovrebbero potersi visualizzare tutti i `git` che sono presenti nella cartella. Quindi si potrebbero effettuare i due commit contestualmente, ma con due `logiche` per nominare i `branch` diverse:
- nel `monorepo` potremmo usare un tipo di commit più lineare e cambiare i nomi dei branch utilizzando una nomenclatura `giornaliera`, tipo `02042024` significa il branch di quella determinata giornata, e tutti i vari `commit` possono essere effettuati sullo stesso `branch`
- nell'app invece usiamo la struttura
	- `main`
	- `dev`
	- `<version>/wip`