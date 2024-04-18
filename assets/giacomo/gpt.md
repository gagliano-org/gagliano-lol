
```dataviewjs
const gpt = dv.pages().filter(p=>{
	if(p.type instanceof Link) return p.type.path.includes("gpt");
	else return p.type === "gpt"
})
const mapped = gpt.map(e=>[`[[${e.file.name}|${e.title}]]`,e.tags])
dv.table(["title","tags"],mapped)
```
