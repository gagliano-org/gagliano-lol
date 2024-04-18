### UFW

  

UFW (Uncomplicated Firewall) è un’utilità di configurazione del firewall fornita con Ubuntu. Tuttavia, non è sempre installato per impostazione predefinita su tutti i sistemi Ubuntu. Per verificare se UFW è già installato sul tuo sistema Ubuntu, puoi utilizzare il comando:

  

```

sudo ufw status

```

  

Se UFW è già installato e abilitato sul tuo sistema, vedrai un output simile a questo:

  

```

Status: active

```

  

In caso contrario, vedrai un messaggio che indica che UFW non è attualmente abilitato o installato. In questo caso, puoi installarlo utilizzando il comando:

  

```

sudo apt install ufw

```

  
