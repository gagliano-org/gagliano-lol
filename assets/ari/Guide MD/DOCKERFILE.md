# DOCKERFILE

  

Per testare l'immagine Docker creata con il Dockerfile fornito, puoi seguire questi passaggi:

  

Dockerfile:

  

`````

## Usa un'immagine base leggera di Linux

  

```FROM oven/bun:latest as builder```

  

## Copia i file sorgente nella directory del builder

  

```WORKDIR /src COPY . .```

  

## Installa le dipendenze e esegui il comando yarn build per compilare i file

```RUN bun install RUN bun run build```

  

## Seconda fase per creare l'immagine finale

```FROM alpine:latest```

  

## Aggiorna il sistema e installa Lighttpd

```RUN apk update && apk add lighttpd```

  

## Copia i file compilati nella directory del server

```COPY --from=builder ./src/dist /var/www/localhost/htdocs/```

  

## Esponi la porta 80 per il server Lighttpd

```EXPOSE 80```

  

Costruisci l'immagine: Vai nella directory in cui hai il tuo Dockerfile e apri un terminale. Esegui il seguente comando per costruire l'immagine Docker:

````docker build -t my-lighttpd-image .````

# Avvia Lighttpd quando il contenitore viene eseguito

```CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf"]```

`````

  

### Costruisci l'immagine:

  

Vai nella directory in cui hai il tuo Dockerfile e apri un terminale. Esegui il seguente comando per costruire l'immagine Docker(Questo comando crea un'immagine Docker con il tag "my-lighttpd-image" utilizzando il Dockerfile nella directory corrente "assicurati di essere nella stessa directory del Dockerfile"):

  

```

docker buildx build -t tnl_wip .

  

```

  

### Esegui il contenitore:

  

Dopo aver costruito l'immagine, puoi eseguire un contenitore basato su di essa con il seguente comando:

  

```

docker run -d -p 8080:80 --name tnl_wip tnl_wip

```

  

### Testa il server Lighttpd:

  

Apri il tuo browser web e visita l'indirizzo `http://localhost:8080` per accedere al server Lighttpd. Se tutto è stato configurato correttamente nel tuo Dockerfile e i file dell'applicazione sono stati copiati correttamente, dovresti vedere l'applicazione in esecuzione.

  

### Arresta il contenitore:

  

Per arrestare il contenitore quando hai finito, puoi premere Ctrl + C nel terminale in cui hai eseguito il contenitore o eseguire il seguente comando:

  

```

docker stop <container_id>

  

```

  

Sostituisci `<container_id>` con l'ID del contenitore, che puoi ottenere utilizzando il comando `docker ps`.

  
