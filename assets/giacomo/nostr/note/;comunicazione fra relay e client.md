## Comunicazione fra [[relay]] e [[client]]
Il [[relay]] espone un [[websocket]] [[endpoint]] alla quale i [[client]]s possono connettersi. I [[client]]s **DOVREBBERO** aprire una singola connessione [[websocket]] con ogni [[relay]] ed usarla per tutte le [[sottoscrizioni]]. I [[relay]]s **POTREBBERO** limitare il numero di connessioni da uno specifico [[IP]]/[[client]]/etc.

### Significato degli status code del [[websocket]]
* quando un [[websocket]]è chiuso da un [[relay]] con uno [[status code]] `4000`, significa che il client non dovrebbe cercare di riconnettersi.

![[client messages#Messaggi dal client al relay]]

![[server messages#Messaggi dal relay al client]]

![[event#^b72ab2]]
![[ok#^0d8cc4]]