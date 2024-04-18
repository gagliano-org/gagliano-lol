# NIP-31

## Gestione dei tipi di evento sconosciuti

Quando si crea un nuovo tipo di evento personalizzato che fa parte di un protocollo personalizzato e non è destinato a essere letto come testo (come `kind:1`), i client dovrebbero utilizzare un tag `alt` per scrivere un breve riepilogo in testo leggibile dall'essere umano su cosa tratta quell'evento.

L'intento è che i client social, utilizzati per visualizzare solo note di tipo `kind:1`, possano comunque mostrare qualcosa nel caso in cui un evento personalizzato compaia nelle loro linee temporali. Il contenuto del tag `alt` dovrebbe fornire sufficiente contesto affinché un utente che non sa nulla di questo tipo di evento possa capire di cosa si tratta.

Non ci si aspetta che questi client, che conoscono solo `kind:1`, richiedano eventi di diversi tipi ai relè, ma gli utenti potrebbero comunque fare riferimento a questi eventi strani nelle loro note, e senza un contesto adeguato potrebbero essere note prive di senso. Avere un testo di fallback rende quella situazione molto migliore, anche se solo per far capire all'utente che dovrebbe provare a visualizzare quell'evento personalizzato altrove.

I client centrati su `kind:1` possono rendere l'interazione con questi tipi di evento più funzionale supportando [NIP-89]