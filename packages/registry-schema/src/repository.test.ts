import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { generateRegistryItem } from "./index.js";
import { validateRepository } from "./repository.js";

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(
    roots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  );
});

describe("repository registry validation", () => {
  it("matches generated files to canonical component source", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ec-registry-"));
    roots.push(root);
    const sourcePath = "packages/react/src/components/example/example.tsx";
    const canonical = "export const Example = () => null;\n";
    const payload = generateRegistryItem(
      {
        id: "example",
        version: "0.1.0",
        framework: "react",
        files: [{ source: sourcePath, path: "example.tsx" }],
        dependencies: [],
        peerDependencies: { react: ">=18" },
        tokens: [],
        docsUrl: "https://ecentry.dev/docs/components/example",
        license: "MIT",
      },
      () => canonical,
    );
    const sourceFile = path.join(root, sourcePath);
    const registryRoot = path.join(root, "registry/react/example");
    await mkdir(path.dirname(sourceFile), { recursive: true });
    await mkdir(registryRoot, { recursive: true });
    await writeFile(sourceFile, canonical);
    await writeFile(
      path.join(registryRoot, "example.tsx"),
      payload.files["example.tsx"]!,
    );
    await writeFile(
      path.join(registryRoot, "manifest.json"),
      JSON.stringify(payload.manifest),
    );

    expect(await validateRepository(root)).toEqual(["example"]);
    await writeFile(sourceFile, "changed\n");
    await expect(validateRepository(root)).rejects.toThrow(/canonical source/);
    expect(await readFile(path.join(registryRoot, "example.tsx"), "utf8")).toBe(
      canonical,
    );
  });
});
