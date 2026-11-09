const target = process.argv[2];
if (target !== "vite" && target !== "next") {
  throw new Error("Choose a consumer target: vite or next");
}
await import(`./${target}/scripts/run.mjs`);
