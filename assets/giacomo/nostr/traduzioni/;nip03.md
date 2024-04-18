---
definisce:
  - "[[event]]"
eventFields:
  - "[[💾open timestamp]]"
---

# NIP-03
## Attestato OpenTimestamps per gli eventi
Quanto è disponibile un OTS POTREBBE essere incluso nel corso esistente in una chiave opzionale `ots`:
### json
```json
{
  "id": ...,
  "kind": ...,
  ...,
  ...,
  "ots": <base64-encoded OTS file data>
}
```
L' `event id` DEVE essere usato come raw hash da includere nel OpenTimestamp merle tree.
L'attestazione può essere procurata dai relay automaticamente (e i contenuti dell'OTS binary semplicemente appesi all'evento che riceve), o dai client stessi quando caricano l'evento per la prima volta -- ed utilizzato dai client per provare che l'evento è effettivamente "at least as old as [OTS date]"