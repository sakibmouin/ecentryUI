import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { generateRegistryItem } from "@ecentry/registry-schema";
import { afterEach, expect, it } from "vitest";
import { inspectProject } from "./doctor.js";

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(
    roots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  );
});

const config = {
  version: 1 as const,
  sourceDir: "src/ui",
  cssEntry: "src/index.css",
  importAlias: "@/ui",
};
const registry = [
  generateRegistryItem(
    {
      id: "sample",
      version: "0.1.0",
      framework: "react",
      files: [
        {
          source: "packages/react/src/components/sample/index.tsx",
          path: "index.tsx",
        },
      ],
      dependencies: [],
      peerDependencies: { react: ">=18" },
      tokens: [],
      docsUrl: "https://ecentry.dev/components/sample/",
      license: "MIT",
    },
    () => "export {}\n",
  ),
];

async function temporaryProject() {
  const root = await mkdtemp(path.join(os.tmpdir(), "ecentry-doctor-"));
  roots.push(root);
  return root;
}

it("reports missing source and an incompatible installed peer", async () => {
  const root = await temporaryProject();
  const peer = path.join(root, "node_modules/react");
  await mkdir(peer, { recursive: true });
  await writeFile(
    path.join(peer, "package.json"),
    JSON.stringify({ version: "17.0.2" }),
  );
  const issues = await inspectProject(root, config, registry, ["sample"]);
  expect(issues).toContain("Missing source file: src/ui/sample/index.tsx");
  expect(issues).toContain(
    "Incompatible peer react: installed 17.0.2, requires >=18.",
  );
});

it("rejects corrupted registry contents before checking the project", async () => {
  const root = await temporaryProject();
  const corrupt = registry.map((item) => ({
    ...item,
    files: { "index.tsx": "changed\n" },
  }));
  await expect(inspectProject(root, config, corrupt)).rejects.toThrow(
    /hash mismatch/,
  );
});
