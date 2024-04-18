# KUBERNETES

  

DISABILITARE MEMORIA SWAP:

Kubernetes si rifiuterà di funzionare se il sistema utilizza la memoria di swap. Prima di procedere ulteriormente, assicurarsi che il nodo master e il nodo di lavoro abbiano disabilitato la memoria di swap con questo comando:

  

``sudo swapoff -a`

  

Questo comando disabiliterà la memoria di swap fino al riavvio dei sistemi, quindi per rendere persistente questa modifica, usa nano o il tuo editor di testo preferito per aprire questo file:

  

`$ sudo nano /etc/fstab`

  

All'interno di questo file, se presente, commentare la riga precedundola con un simbolo, come mostrato di seguito. Quindi, chiudere questo file e salvare le modifiche./swapfile# (Aggiungi # per commentare la riga del file di scambio)

Accedi al tuo nodo master: Puoi farlo utilizzando SSH o qualsiasi altro metodo che preferisci per accedere al tuo server.

  

Imposta l’hostname: Puoi impostare l’hostname del tuo nodo master utilizzando il comando hostnamectl. Ad esempio:

  

`sudo hostnamectl set-hostname kubernetes-master`

  

Installa Kubernetes: Se non hai già installato Kubernetes sul tuo nodo master, dovrai farlo.

  

Inizializza il cluster Kubernetes: Una volta installato Kubernetes, puoi inizializzare il cluster utilizzando il comando kubeadm init. Questo comando avvierà il cluster con il nodo master1.

  

`sudo kubeadm init --node-name=kubernetes-master`

  

In questo comando, kubernetes-master è l’hostname del tuo nodo master2. Puoi sostituire kubernetes-master con qualsiasi nome tu preferisca per il tuo nodo.

  

