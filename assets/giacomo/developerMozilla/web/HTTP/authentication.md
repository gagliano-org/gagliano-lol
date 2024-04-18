---
source: https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication
aliases:
  - autenticazione
---
Definisce un framework per gestire le autorizzazioni di richieste http.

>HTTP fornisce un framework generale per il controllo degli accessi e l’autenticazione. Questa pagina è un’introduzione al framework HTTP per l’autenticazione e mostra come limitare l’accesso al proprio server utilizzando lo schema HTTP “Basic”.

>Il flusso di challenge e risposta funziona in questo modo:
> - Il server risponde ad un client con uno stato di risposta 401 (Non autorizzato) e fornisce informazioni su come autorizzare con un'intestazione di risposta WWW-Authenticate contenente almeno una challenge.
> - Un client che vuole autenticarsi con il server può quindi farlo includendo un'intestazione di richiesta di Autorizzazione con le credenziali.
> - Di solito un client presenterà un prompt di password all'utente e poi emetterà la richiesta includendo l'intestazione di Autorizzazione corretta.

![[Pasted image 20231123191702.png]]
>Il flusso generale del messaggio sopra è lo stesso per la maggior parte (se non tutti) gli schemi di autenticazione. Le informazioni effettive nelle intestazioni e il modo in cui sono codificate cambiano!
## Proxy Authentication

>Nell’autenticazione tramite proxy, lo stesso meccanismo di challenge e risposta può essere utilizzato. Poiché l’autenticazione della risorsa e l’autenticazione del proxy possono coesistere, è necessario un diverso set di intestazioni e codici di stato. Nel caso dei proxy, il codice di stato della challenge è 407 (Proxy Authentication Required), l’intestazione di risposta [[Proxy-Authenticate]] contiene almeno una challenge applicabile al proxy, e l’intestazione di richiesta Proxy-Authorization viene utilizzata per fornire le credenziali al server proxy.
## Access Forbidden

>Se un server (o un proxy) riceve credenziali non valide, dovrebbe rispondere con un 401 `Unauthorized` o con un [[407 Proxy Authentication Required|407]] `Proxy Authentication Required`, e l'utente può inviare una nuova richiesta o sostituire l'intestazione Authorization.
>Se un server (o un proxy) riceve credenziali valide che sono inadeguate per accedere a una determinata risorsa, il server dovrebbe rispondere con il codice di stato [[403 Forbidden|403]] `Forbidden`. A differenza del [[401  Unauthorized|401]] `Unauthorized` o del [[407 Proxy Authentication Required|407]] `Proxy Authentication Required`, l'autenticazione è impossibile per questo utente e i browser non proporranno un nuovo tentativo.
>In tutti i casi, il server può preferire restituire un codice di stato 404 Not Found, per nascondere l'esistenza della pagina a un utente senza privilegi adeguati o non correttamente autenticato.

## Authentication of cross-origin images

>Un potenziale problema di sicurezza (che è stato successivamente risolto nei browser) era l’autenticazione delle immagini cross-site. A partire da [Firefox 59](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/59), le risorse immagine caricate da origini diverse rispetto al documento corrente non sono più in grado di attivare i dialoghi di autenticazione HTTP ([bug di Firefox 1423146](https://bugzil.la/1423146)), prevenendo così il furto delle credenziali dell’utente se gli aggressori fossero in grado di incorporare un’immagine arbitraria in una pagina di terze parti.

## Character encoding of HTTP authentication

>I browser utilizzano la codifica `utf-8` per i nomi utente e le password. Firefox una volta utilizzava `ISO-8859-1`, ma è passato a `utf-8` per parità con altri browser e per evitare potenziali problemi come descritto nel bug [1419658 di Firefox](https://bugzil.la/1419658).

## WWW-Authenticate and Proxy-Authenticate headers

>Le intestazioni di risposta [[WWW-Authenticate]] e [[Proxy-Authenticate]] definiscono il metodo di autenticazione che dovrebbe essere utilizzato per accedere a una risorsa. Devono specificare quale schema di autenticazione viene utilizzato, in modo che il client che desidera autorizzare sappia come fornire le credenziali.
>
>La sintassi è come segue

```
WWW-Authenticate: <type> realm=<realm>>
Proxy-Authenticate: <type> realm=<realm>
```

>Qui, `<type>` è lo schema di autenticazione (“Basic” è lo schema più comune e introdotto di seguito). Il `realm` viene utilizzato per descrivere l’area protetta o per indicare l’ambito della protezione. Questo potrebbe essere un messaggio come “Accesso al sito di staging” o simile, in modo che l’utente sappia a quale spazio sta cercando di accedere.

## Authentication schemes

>Il framework generale di autenticazione HTTP è la base per una serie di schemi di autenticazione. L’IANA mantiene un elenco di [schemi di autenticazione](https://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml), ma ci sono altri schemi offerti da servizi host, come Amazon AWS. Alcuni schemi di autenticazione comuni includono:
>- **Basic**: [Vedi RFC 7617](https://datatracker.ietf.org/doc/html/rfc7617), credenziali codificate in base64. Maggiori informazioni di seguito.
>- **Bearer**: [Vedi RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750), token bearer per accedere alle risorse protette da OAuth 2.0
>- **Digest**: [Vedi RFC 7616](https://datatracker.ietf.org/doc/html/rfc7616). Firefox 93 e versioni successive supportano l’algoritmo SHA-256. Le versioni precedenti supportano solo l’hashing MD5 (non consigliato).
>- **HOBA**: [Vedi RFC 7486](https://datatracker.ietf.org/doc/html/rfc7486), Sezione 3, Autenticazione legata all’origine HTTP, basata su firma digitale
>- **Mutual**: [Vedi RFC 8120](https://datatracker.ietf.org/doc/html/rfc8120)
>- **Negotiate / NTLM**: [Vedi RFC4599](https://www.ietf.org/rfc/rfc4559.txt)
>- **VAPID**: [Vedi RFC 8292](https://datatracker.ietf.org/doc/html/rfc8292)
>- **SCRAM**: [Vedi RFC 7804](https://datatracker.ietf.org/doc/html/rfc7804)
>- **AWS4-HMAC-SHA256**: Vedi la [documentazione di AWS](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-auth-using-authorization-header.html). Questo schema viene utilizzato per l’autenticazione del server AWS3.
>- Gli schemi possono differire in termini di forza di sicurezza e nella loro disponibilità nel software client o server. Lo schema di autenticazione “Basic”

## Basic authentication scheme

>Lo schema di autenticazione HTTP “Basic” è definito nel RFC 7617, che trasmette le credenziali come coppie di ID utente/password, codificate utilizzando base64.
### Security of basic authentication

>Poiché l’ID utente e la password vengono trasmessi sulla rete come testo in chiaro (sono codificati in base64, ma la base64 è una codifica reversibile), lo schema di autenticazione “Basic” non è sicuro. HTTPS/TLS dovrebbe essere utilizzato con l’autenticazione di base. Senza questi miglioramenti di sicurezza aggiuntivi, l’autenticazione di base non dovrebbe essere utilizzata per proteggere informazioni sensibili o preziose.
### Restricting access with Apache and basic authentication

>Per proteggere con password una directory su un server Apache, avrai bisogno di un file `.htaccess` e di un file `.htpasswd`.
>
>Il file `.htaccess` tipicamente ha questo aspetto:

```APACHECONF
AuthType Basic
AuthName "Access to the staging site"
AuthUserFile /path/to/.htpasswd
Require valid-user
```

>Il file `.htaccess` fa riferimento a un file `.htpasswd` in cui ogni riga consiste in un nome utente e una password separati da due punti (:). Non è possibile vedere le password effettive poiché sono [hashate]([Password Formats - Apache HTTP Server Version 2.4](https://httpd.apache.org/docs/2.4/misc/password_encryptions.html)) (utilizzando l’hashing basato su MD5, in questo caso). Nota che puoi dare un nome diverso al tuo file `.htpasswd` se preferisci, ma tieni presente che questo file non dovrebbe essere accessibile a nessuno. (Apache è solitamente configurato per prevenire l’accesso ai file .ht*).

```APACHECONF
aladdin:$apr1$ZjTqBB3f$IF9gdYAGlMrs2fuINjHsz.
user2:$apr1$O04r.y2H$/vEkesPhVInBByJUkXitA/
```
### Restricting access with Nginx and basic authentication

>Per Nginx, avrai bisogno di specificare una posizione che intendi proteggere e la direttiva auth_basic che fornisce il nome all’area protetta da password. La direttiva auth_basic_user_file punta poi a un file `.htpasswd` contenente le credenziali utente criptate, proprio come nell’esempio di Apache sopra.

```APACHECONF
location /status {
    auth_basic           "Access to the staging site";
    auth_basic_user_file /etc/apache2/.htpasswd;
}
```
### Access using credentials in the URL

>Molti clienti ti permettono anche di evitare il prompt di login utilizzando un URL codificato che contiene il nome utente e la password in questo modo:
>

```
https://username:password@www.example.com/
```

>L’uso di questi URL è deprecato. In Chrome, la parte username:password@ negli URL viene addirittura eliminata per motivi di sicurezza. In Firefox, viene verificato se il sito richiede effettivamente l’autenticazione e, in caso contrario, Firefox avviserà l’utente con un prompt “Stai per accedere al sito \www.example.com con il nome utente username, ma il sito web non richiede l’autenticazione. Questo potrebbe essere un tentativo di ingannarti.”