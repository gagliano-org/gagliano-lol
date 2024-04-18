# NIP-14

## Tag oggetto negli eventi di testo

Questo NIP definisce l'uso del tag "subject" negli eventi di testo (tipo: 1).  
(Implementato in more-speech)

`["subject": <string>]`

I browser spesso mostrano elenchi di messaggi in forma di thread. Il contenuto del tag oggetto può essere utilizzato in tali elenchi, invece di utilizzare l'approccio più ad hoc di utilizzare le prime parole del messaggio. Questo è molto simile al modo in cui i browser di posta elettronica mostrano gli elenchi delle email in arrivo per oggetto anziché per contenuto.

Quando si risponde a un messaggio con un oggetto, i client DOVREBBERO replicare il tag oggetto. I client POSSONO abbellire l'oggetto per indicare
che si tratta di una risposta, ad esempio, aggiungendo "Re:" iniziale.

Gli oggetti dovrebbero essere generalmente più brevi di 80 caratteri. Gli oggetti lunghi probabilmente verranno tagliati dai client.