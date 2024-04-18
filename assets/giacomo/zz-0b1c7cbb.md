---
type: gpt
title: keyframe con js
tags:
  - javascript
  - css
---


> è possibile creare l'equivalente di questo 
> 
```css
@keyframes test {
  0% { color: red; background-color: #fff; } 
  100% { background-color: rgb(20, 255, 226); color: black; } 
}
```
> ma scrivendolo come proprieta di un HTMLElement in js?

Sì, è possibile creare un’animazione equivalente a quella definita nei **keyframes** utilizzando JavaScript e applicarla a un elemento specifico. Per farlo, puoi utilizzare il metodo `.animate()` dell’oggetto `HTMLElement`. Ecco come farlo:

```javascript
// Seleziona l'elemento a cui desideri applicare l'animazione
const myElement = document.getElementById('my-element'); // Sostituisci con l'ID o il selettore del tuo elemento

// Definisci le regole per l'animazione
const keyframes = [
  { color: 'red', backgroundColor: '#fff' }, // 0%
  { color: 'black', backgroundColor: 'rgb(20, 255, 226)' }, // 100%
];

// Opzioni per l'animazione
const options = {
  duration: 2000, // Durata in millisecondi
  iterations: Infinity, // Ripeti l'animazione all'infinito
};

// Applica l'animazione all'elemento
myElement.animate(keyframes, options);
```

Nell’esempio sopra:

- `keyframes` definisce le regole per l’animazione, specificando i valori di stile per il 0% e il 100%.
- `options` contiene le opzioni per l’animazione, come la durata e il numero di iterazioni.

L’animazione verrà eseguita automaticamente sull’elemento selezionato. Puoi personalizzare ulteriormente le proprietà dell’animazione e adattarle alle tue esigenze specifiche. 🎨🚀