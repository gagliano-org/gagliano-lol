import { calendario } from "../spesa-1032024";
import { makeList } from "./makeList";

const id = `spesa-1032024`;
export const res = { id, list: makeList(calendario) };
console.log(res);
