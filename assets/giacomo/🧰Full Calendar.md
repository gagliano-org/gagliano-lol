---
type: "[[zz-bdea89e7|software]]"
---

```ts
enum days {
	monday = "M",
	tuesday = "T",
	wednsday = "W",
	thursday = "R",
	friday = "F",
	saturday = "S",
	sunday = "U",
}

interface FullCalendarEvent {
	title: string;
	startTime: `${number}:${number}`;
	endTime: `${number}:${number}`;
	allDay: boolean;
	type: "recurring" | "single";
	daysOfWeek: []
	startRecur?: Date;
	date: Date;
	endRecur?: Date;
	completed?: boolean;
}
```