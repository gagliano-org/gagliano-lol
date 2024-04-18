---
type: gpt
title: cancellare remote branch
tags:
  - git
---

> come faccio a cancellare un remote branch?

Per cancellare un branch remoto, puoi utilizzare il seguente comando:

```bash
git push origin --delete nome_del_branch
```

Dove `nome_del_branch` è il nome del branch che desideri eliminare. Questo comando rimuoverà il branch dal tuo repository remoto.

Ricorda che questo comando non influisce sul branch locale sul tuo computer. Se desideri anche eliminare il branch locale, dovrai utilizzare il comando `git branch -d nome_del_branch`.

Spero che queste informazioni ti siano d’aiuto! 😊