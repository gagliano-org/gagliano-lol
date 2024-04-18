---
type: gpt
title: come creare un plugin per obsidian
tags:
  - obsidian
---

> come faccio a creare un plug in per obsidian che mi permetta di creare un nome per il mio file e anche aggiungere dei metadata? scrivimi un esempio per iniziare in typescript

Per creare un plugin per Obsidian che ti permetta di creare un nome per il tuo file e aggiungere dei metadati, puoi seguire questi passaggi:

1. **Inizializza un nuovo progetto**:
    
    - Assicurati di avere Node.js installato sul tuo computer.
    - Crea una nuova cartella per il tuo plugin.
    - Apri il terminale e naviga nella cartella del tuo plugin.
2. **Inizializza il progetto**:
    
    - Esegui il seguente comando per inizializzare un nuovo progetto Node.js:
        
        ```
        npm init
        ```
        
    - Rispondi alle domande per configurare il tuo progetto.
3. **Aggiungi TypeScript**:
    
    - Installa TypeScript nel tuo progetto:
        
        ```
        npm install typescript --save-dev
        ```
        
4. **Crea il tuo file TypeScript**:
    
    - Crea un file chiamato `main.ts` (o qualsiasi altro nome preferisci) nella tua cartella del plugin.
    - Inizia a scrivere il tuo codice TypeScript. Ad esempio:
        
        ```typescript
        // main.ts
        import { App, Plugin } from 'obsidian';
        
        export default class MyPlugin extends Plugin {
            async onload() {
                console.log('Plugin loaded!');
        
                // Crea un nuovo file con un nome personalizzato
                await this.app.vault.create('MiaNota.md', '# Titolo della mia nota');
        
                // Aggiungi metadati alla nota
                const myNote = this.app.vault.getAbstractFileByPath('MiaNota.md');
                if (myNote) {
                    myNote.setExcerpt('Questo è un estratto della mia nota.');
                    myNote.setTags(['tag1', 'tag2']);
                }
            }
        
            onunload() {
                console.log('Plugin unloaded!');
            }
        }
        ```
        
5. **Compila il tuo plugin**:
    
    - Esegui il seguente comando per compilare il tuo plugin da TypeScript a JavaScript:
        
        ```
        npx tsc
        ```
        
6. **Carica il tuo plugin in Obsidian**:
    
    - Crea una cartella chiamata `MyPlugin` (o qualsiasi altro nome preferisci) nella tua cartella dei plugin di Obsidian.
    - Copia il file `main.js` generato dalla compilazione TypeScript nella cartella del tuo plugin.
    - Attiva il tuo plugin in Obsidian.

Ora hai un plugin di base che crea un nuovo file con un nome personalizzato e aggiunge metadati ad esso. Puoi espandere il tuo plugin aggiungendo altre funzionalità e personalizzazioni. Buona programmazione! 🐍

[](https://docs.obsidian.md/Plugins/Getting%20started/Build%20a%20plugin)[1](https://docs.obsidian.md/Plugins/Getting%20started/Build%20a%20plugin): [](https://docs.obsidian.md/Plugins/Getting%20started/Build%20a%20plugin)[2](https://github.com/obsidianmd/obsidian-sample-plugin):