---
source: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate
---
Definisce i metodi di  [[authentication]] (“sfide”) che potrebbero essere utilizzati per accedere a una risorsa specifica.

>Nota: Questa intestazione fa parte del framework generale di autenticazione HTTP, che può essere utilizzato con una serie di schemi di [[authentication|autenticazione]]. Ogni [[developerMozilla/web/HTTP/authentication/challenge|challenge]] elenca uno schema supportato dal server e parametri aggiuntivi che sono definiti per quel tipo di [[developerMozilla/web/HTTP/authentication/schema|schema]]
>.

Un server che utilizza l’[[authentication|autenticazione]] HTTP risponderà con una risposta 401 Non autorizzata a una richiesta per una risorsa protetta. Questa risposta deve includere almeno un’intestazione WWW-Authenticate e almeno una [[developerMozilla/web/HTTP/authentication/challenge|sfida]], per indicare quali schemi di autenticazione possono essere utilizzati per accedere alla risorsa (e qualsiasi dato aggiuntivo che ogni schema particolare richiede)

Sono consentite sfide multiple in un’unica intestazione WWW-Authenticate, e sono consentite intestazioni WWW-Authenticate multiple in una singola risposta. Un server può anche includere l’intestazione WWW-Authenticate in altri messaggi di risposta per indicare che la fornitura delle credenziali potrebbe influire sulla risposta.

Dopo aver ricevuto l’intestazione WWW-Authenticate, un client solitamente richiederà all’utente le credenziali, e poi richiederà nuovamente la risorsa. Questa nuova richiesta utilizza l’[[developerMozilla/web/HTTP/Headers|intestazione]] [[authorization|autorizzazione]] per fornire le credenziali al server, codificate in modo appropriato per il metodo di autenticazione “[[developerMozilla/web/HTTP/authentication/challenge|sfida]]” selezionato. Ci si aspetta che il client selezioni la sfida più sicura tra quelle che comprende (si noti che in alcuni casi il metodo “più sicuro” è discutibile).