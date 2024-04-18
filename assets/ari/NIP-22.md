# NIP-22

## Limiti per `created_at` degli Eventi

`bozza` `opzionale` `autore: jeffthibault` `autore: Giszmo`

I relays possono definire limiti sia superiori che inferiori entro i quali considereranno accettabile il valore di `created_at` di un evento. Entrambi i limiti superiori e inferiori DEVONO essere timestamp Unix in secondi come definito in [NIP-01](01.md).

Se un relay supporta questo NIP, il relay DOVREBBE inviare al client un risultato `OK` indicando che l'evento non è stato memorizzato perché il timestamp `created_at` non rientra nei limiti consentiti.

## Comportamento del Client

I client DOVREBBERO utilizzare il campo [NIP-11](11.md) `supported_nips` per scoprire se un relay utilizza limiti di tempo per `created_at` degli eventi come definito da questo NIP.

## Motivazione

Questo NIP formalizza le restrizioni sui timestamp degli eventi accettati da un relay e consente ai client di essere consapevoli dei relay che hanno queste restrizioni.

Il campo `created_at` degli eventi è solo un timestamp Unix e può essere impostato in un momento passato o futuro. I relay accettano e condividono eventi datati 20 anni fa o 50.000 anni nel futuro. Questo NIP mira a definire un modo per i relay che non vogliono memorizzare eventi con *qualunque* timestamp di impostare le proprie restrizioni.

Gli _eventi sostituibili_ possono comportarsi in modo piuttosto imprevisto se l'utente li ha scritti - o ha cercato di scriverli - con un orologio di sistema errato. Persistere un aggiornamento con un orologio del sistema datato al passato comporterebbe l'aggiornamento che non viene memorizzato senza una notifica e se l'utente ha effettuato l'ultimo aggiornamento con un orologio del sistema datato al futuro, falliranno nuovamente nel fare un altro aggiornamento con l'ora corretta.

Una diffusa adozione di questo NIP potrebbe creare una migliore esperienza utente, poiché diminuirebbe il numero di eventi che appaiono stranamente fuori sequenza o addirittura da date impossibili in un passato o futuro lontano.

Tieni presente che esiste un caso d'uso in cui un utente migra i propri vecchi post su un nuovo relay. Se un relay rifiuta eventi che non sono stati creati di recente, non può servire questo caso d'uso.

## Esempio in Pseudocodice Python

```python
import time

TIME = int(time.time())
LOWER_LIMIT = TIME - (60 * 60 * 24) # Definire il limite inferiore come 1 giorno nel passato
UPPER_LIMIT = TIME + (60 * 15)      # Definire il limite superiore come 15 minuti nel futuro

if event.created_at not in range(LOWER_LIMIT, UPPER_LIMIT):
  ws.send('["OK", event.id, False, "invalid: il campo created_at dell\'evento è fuori dal range accettabile (-24h, +15min) per questo relay"]')
```

Nota: Questi sono solo limiti di esempio, l'operatore del relay può scegliere i limiti che desidera.