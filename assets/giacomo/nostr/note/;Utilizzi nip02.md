## Utilizzi
### Backup della contact list.
Se qualcuno crede che un relay non registrerà i suoi eventi per un tempo abbastanza lungo, potrebbero utilizzare il `kind = 3` per fare un backup dei propri followings e ricaricarli su una device differente.
### Scoperta del profilo e aumento del contesto
Un client potrebbe utilizzare il `kind = 3` per mostrare la lista delle persone che il profilo sul quale si sta navigando segue. Suggerire le persone da seguire in base alla lista dei contatti di altre persone o di persone che qualcuno potrebbe star seguendo od eventualmente navigandoci sul profilo.
### Condivisione Relay
Un client puo pubblicare una lista completa di contatti con i buoni relay per ognuno dei contatti così altri client possono usarli per mettere a giorno la loro lista interna di relay se necessario, aumentando la [[censorship-resistance]]
### Schema per i petname
I dati da queste liste di contatto possono essere usati dai client per costruire delle tabelle di [[petname]] derivati da contatti di altre persone. Questo allevia la necessità di nomi [[human-readable]] globali. Ad esempio:
Uno user con una contact list interna che dice:
```json
[
  ["p", "21df6d143fb96c2ec9d63726bf9edc71", "", "erin"]
]
```
e riceve due contact list, una da `21df6d143fb96c2ec9d63726bf9edc71` che dice:
```json
[
  ["p", "a8bb3d884d5d90b413d9891fe4c4e46d", "", "david"]
]
```
ed un'altra da `a8bb3d884d5d90b413d9891fe4c4e46d`
che dice
```json
[
  ["p", "f57f54057d2a7af0efecc8b0b66f5708", "", "frank"]
]
```
Quando lo user vede `21df6d143fb96c2ec9d63726bf9edc71` il client può mostrare `erin`; quando lo user vede `a8bb3d884d5d90b413d9891fe4c4e46d` il client può mostrare `david.erin`; quando lo user vede `f57f54057d2a7af0efecc8b0b66f5708` il client può mostrare `frank.david.erin`.
#da-approfondire