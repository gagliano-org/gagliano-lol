---
type: termine
contesto:
  - http
  - "[[authentication|autenticazione]]"
aliases:
  - sfida
termine: "[[Challenge-response authentication]]"
---

In HTTP, una “challenge” è un termine usato nel contesto dell’autenticazione. [Quando un client tenta di accedere a una risorsa protetta su un server, il server può rispondere con una “challenge” che il client deve soddisfare per dimostrare la propria identità](https://cert-manager.io/docs/concepts/acme-orders-challenges/)[1](https://cert-manager.io/docs/concepts/acme-orders-challenges/).

Ad esempio, nel contesto dell’autenticazione “Basic” di HTTP, la “challenge” è semplicemente una richiesta di username e password. Il server invia un’intestazione `WWW-Authenticate` con il valore `Basic`, indicando al client che deve fornire un username e una password. [Il client risponde fornendo queste credenziali codificate in base64 nell’intestazione `Authorization`](https://cert-manager.io/docs/concepts/acme-orders-challenges/)[1](https://cert-manager.io/docs/concepts/acme-orders-challenges/).

Per ulteriori informazioni sulle challenge HTTP e sull’autenticazione HTTP in generale, puoi consultare le seguenti risorse:

Ricorda che le specifiche delle challenge possono variare a seconda del metodo di autenticazione utilizzato. 😊