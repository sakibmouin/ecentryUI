import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { generateRegistryItem } from "@ecentry/registry-schema";

test("CLI init and add install a registry item after dry runs", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "ec-cli-e2e-"));
  const project = path.join(root, "consumer");
  const registry = path.join(root, "registry");
  const bin = path.resolve("packages/cli/dist/bin.js");
  const content = "export function Sample() { return null; }\n";
  try {
    await mkdir(project);
    await mkdir(path.join(registry, "sample"), { recursive: true });
    const payload = generateRegistryItem(
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
        docsUrl: "https://ecentry.dev/docs/components/sample",
        license: "MIT",
      },
      () => content,
    );
    await writeFile(
      path.join(registry, "sample/manifest.json"),
      JSON.stringify(payload.manifest),
    );
    await writeFile(path.join(registry, "sample/index.tsx"), content);

    const run = (...args: string[]) =>
      spawnSync(process.execPath, [bin, ...args], {
        cwd: project,
        encoding: "utf8",
      });
    expect(run("init", "--dry-run").status).toBe(0);
    await expect(
      readFile(path.join(project, "ecentry.json"), "utf8"),
    ).rejects.toThrow();
    expect(run("init", "--yes").status).toBe(0);
    expect(
      run("add", "sample", "--registry", registry, "--dry-run").status,
    ).toBe(0);
    const installed = path.join(project, "src/components/ui/sample/index.tsx");
    await expect(readFile(installed, "utf8")).rejects.toThrow();
    expect(run("add", "sample", "--registry", registry, "--yes").status).toBe(
      0,
    );
    expect(await readFile(installed, "utf8")).toBe(content);
    await writeFile(installed, "local edit\n");
    expect(run("add", "sample", "--registry", registry, "--yes").status).toBe(
      1,
    );
    expect(await readFile(installed, "utf8")).toBe("local edit\n");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
