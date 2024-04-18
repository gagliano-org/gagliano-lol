---
type: gpt
title: dove trovo lista decorators built-in di python
tags:
  - python
  - decorators
---

> dove posso trovare la lista dei decoratori built-in di python?

I **decoratori** in Python sono uno strumento potente che consente di estendere e modificare il comportamento di funzioni e classi senza doverne alterare direttamente il codice sorgente. Sono particolarmente utili per aggiungere funzionalità extra o per garantire la riusabilità del codice. Ecco alcune informazioni sui decoratori:

1. **Definizione dei Decoratori**:
    
    - Un decoratore è una **funzione** che prende come parametro un’altra funzione, aggiunge delle funzionalità e restituisce un’altra funzione senza alterare il codice sorgente della funzione passata come parametro.
    - Le funzioni in Python sono **oggetti di prima classe**, il che significa che possono essere passate come parametri e restituite come qualsiasi altro valore.
2. **Esempio di Creazione e Utilizzo dei Decoratori**:
    
    - Supponiamo di voler creare un decoratore che stampi messaggi prima e dopo l’esecuzione di una funzione. Ecco come potrebbe apparire:
        
        ```python
        def funzione_decoratore(funzione_parametro):
            def wrapper():
                print("... codice da eseguire prima di 'funzione_parametro' ...")
                funzione_parametro()
                print("... codice da eseguire dopo di 'funzione_parametro' ...")
            return wrapper
        
        @funzione_decoratore
        def mia_funzione():
            print("Hello World!")
        
        mia_funzione()
        ```
        
        L’output sarà:
        
        ```
        ... codice da eseguire prima di funzione_parametro ...
        Hello World!
        ... codice da eseguire dopo di funzione_parametro ...
        ```
        
3. **Decoratori Built-in**:
    
    - Python offre alcuni decoratori incorporati che ottimizzano il codice. [Ad esempio, l’annotazione `@staticmethod` e `@classmethod`](https://www.programmareinpython.it/video-corso-python-intermedio/12-i-decoratori/)[1](https://www.programmareinpython.it/video-corso-python-intermedio/12-i-decoratori/).
	    - Tuttavia, per una lista completa dei decoratori built-in, ti consiglio di consultare la [[https://www.python.org/doc/|documentazione]] o fare una ricerca specifica.

In breve, i decoratori sono uno strumento potente per migliorare la modularità e la flessibilità del tuo codice Python! 🐍