

```dataviewjs
const a = [["ciao","bimba"]]
let pagesWithTasks = dv.pages().where(p => p.file.tasks.length > 0);
let tasksArray = [];
for (let page of pagesWithTasks) {
    tasksArray.push(...page.file.tasks);
}
dv.taskList(tasksArray);
console.log(tasksArray)
// dv.paragraph(dv.markdownTable(["mamma","mia"],a))
```

