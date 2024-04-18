### Ranges

Per un kind `n` si definisce

| range                                    | name                                | description                                  |
| ---------------------------------------- | ----------------------------------- | -------------------------------------------- |
| `1000 <= n < 10000`                      | [[regular event]]                   | ![[regular event#^32c13c]]                   | 
| `10000 <= n < 20000 or n == 0 or n == 3` | [[replaceable event]]               | ![[replaceable event#^6cfba7]]               |
| `20000 <= n < 30000`                     | [[ephemeral event]]                 | ![[ephemeral event#^e4e412]]                 |
| `30000 <= n < 40000`                     | [[parameterized replaceable event]] | ![[parameterized replaceable event#^4d31e0]] |

Nel caso di eventi sostituibili con lo stesso `timestamp`, dovrebbe essere mantenuto l'evento con l'`id` minore (il primo in ordine alfabetico), gli altri dovrebbero essere scartati.

Nel rispondere ai messaggi `[[REQ]]` per [[replaceable event]] o [[parameterized replaceable event]], anche se il [[relay]] ha più di un versione registrate, **DOVREBBE** ritornare solo la versione più recente.

>Queste sono solo convenzioni, ed ogni [[relay]] potrebbe implementarle in modo diverso.
