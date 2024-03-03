#!/usr/bin/env bun

const main = await Bun.build({
  entrypoints: ["./src/index.js"],
  outdir: "build",
  target: "browser",
});

const spesa = await Bun.build({
  entrypoints: ["./src/spesa/index.ts"],
  outdir: "build/spesa",
  target: "browser",
});

console.log({
  main: main.success,
  spesa: spesa.success,
});
