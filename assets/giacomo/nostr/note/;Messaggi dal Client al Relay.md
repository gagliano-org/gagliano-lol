## Messaggi dal [[client]] al [[relay]]
I client possono mandare tre tipi di messaggi.

| nome                 | forma della tuple    | usage                |
| -------------------- | -------------------- | -------------------- |
| ![[event#^58e287]]   | ![[event#^36fe9a]]   | ![[event#^a33524]]   |
| ![[request#^43a24a]] | ![[request#^3f2e7d]] | ![[request#^f5a4a1]] |
| ![[close#^8b80b5]]   | ![[close#^268452]]   | ![[close#^6416f4]]   |

![[event#json]]
![[💾subscription_id#^f6f5a6]]
![[filter#json]]

Quando un [[relay]] riceve una `REQ` dovrebbe cercare nel suo database, inviare gli eventi presenti nel suo storage ed usare il filtro per inviare gli [[update]] fino a quando il [[websocket]] è chiuso. L'evento `CLOSE`. Nel caso in cui il [[client]] invii una richiesta con la stessa `<subscription_id>` il [[relay]] dovrebbe sovrascrivere la richiesta precedente (aggiornando il filtro)