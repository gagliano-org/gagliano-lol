> quali sono i simboli che vengono "escaped" da scringify?

Nel contesto del processore `unified`, il metodo `stringify` è utilizzato per convertire un albero di sintassi (AST) in una stringa. Durante questo processo, alcuni caratteri potrebbero essere “escaped” o resi sicuri per l’inclusione in una stringa Markdown. Questi caratteri includono, ma non sono limitati a:

- Backslash (`\`)
- Asterisco (`*`)
- Underscore (`_`)
- Tilde (`~`)
- Accolade (`{` e `}`)
- Parentesi quadre (`[` e `]`)
- Parentesi angolari (`<` e `>`)
- Numerali (`#`)
- Più e meno (`+` e `-`)
- Backtick (`` ` ``)

[Questi caratteri sono spesso usati in Markdown per formattare il testo (ad esempio, gli asterischi sono usati per il testo in grassetto o in corsivo), quindi vengono “escaped” per prevenire la formattazione accidentale del testo](https://github.com/unifiedjs/unified)[1](https://github.com/unifiedjs/unified).

[Se vuoi evitare che questi caratteri vengano “escaped”, potresti dover personalizzare il comportamento del plugin `stringify` o post-processare l’output di `stringify` per rimuovere i caratteri di escape indesiderati](https://stackoverflow.com/questions/5506000/json-stringify-doesnt-escape)[2](https://stackoverflow.com/questions/5506000/json-stringify-doesnt-escape).