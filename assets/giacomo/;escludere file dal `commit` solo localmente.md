A volte serve poter ignorare cambiamenti su determinati file localmente, ma non si vuole aggiungere la regola al file `.gitignore` che sincronizzerebbe la regola anche con gli altri sviluppatori che accedono al repo
> ad esempio `*code-workspace` che è una configurazione specifica per ogni user

## Come mitigare

### Metodo 1: aggiungere regole in: `.git/info/exclude`

La cartella `.git` dovrebbe contenere un file `.git/info/exclude` che può contenere delle regole che non vengono aggiunte al file `.gitignore`.
In questo file possiamo aggiungere regole con la stessa sintassi che usiamo nel file `.gitignore` ad esempio:
```
*.code-workspace // ignora tutti i file con estenzione `code-workspace`
```