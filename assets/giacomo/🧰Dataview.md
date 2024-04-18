# Query
`dv.current()`
`dv.pages(source)`
`dv.pagePaths(source)`
`dv.page(path)
# Render
`dv.el(element, text)`
`dv.header(level, text)`
`dv.paragraph(text)`
`dv.span(text)`
`dv.execute(source)`
`dv.executeJs(source)`
`dv.view(path, input)`
# Dataviews
`dv.list(elements)`
`dv.taskList(tasks, groupByFile)`
`dv.table(headers, elements)`
# Markdown Dataviews
`dv.markdownTable(headers, values)`
`dv.markdownList(values)`
`dv.markdownTaskList(tasks)`
# Utility
`dv.array(value)`
`dv.isArray(value)`
`dv.fileLink(path, [embed?], [display-name])`
`dv.sectionLink(path, section, [embed?], [display?])`
`dv.blockLink(path, blockId, [embed?], [display?])`
`dv.date(text)`
`dv.duration(text)`
`dv.compare(a, b)`
`dv.equal(a, b)`
`dv.clone(value)`
`dv.parse(value)`
# File I/O
`⌛ dv.io.csv(path, [origin-file])`
`⌛ dv.io.load(path, [origin-file])`
`dv.io.normalize(path, [origin-file])`
# Query Evaluation
`⌛ dv.query(source, [file, settings])`
`⌛ dv.tryQuery(source, [file, settings])`
`⌛ dv.queryMarkdown(source, [file], [settings])`
`⌛ dv.tryQueryMarkdown(source, [file], [settings])`
`dv.tryEvaluate(expression, [context])`
`dv.evaluate(expression, [context])`