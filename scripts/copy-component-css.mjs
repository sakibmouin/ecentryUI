import { copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const sourceRoot = path.resolve("packages/react/src/components");
const targetRoot = path.resolve("packages/react/dist/components");

async function copyStyles(directory, relative = "") {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const next = path.join(relative, entry.name);
    if (entry.isDirectory())
      await copyStyles(path.join(directory, entry.name), next);
    else if (entry.name.endsWith(".css")) {
      const destination = path.join(targetRoot, next);
      await mkdir(path.dirname(destination), { recursive: true });
      await copyFile(path.join(directory, entry.name), destination);
    }
  }
}

await copyStyles(sourceRoot);
