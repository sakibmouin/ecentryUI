import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { generateRegistryItem } from "@ecentry/registry-schema";
import { applyInstallPlan, createInitPlan, installItems } from "./index.js";

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(
    roots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  );
});

const config = {
  version: 1 as const,
  sourceDir: "src/components/ui",
  importAlias: "@/components/ui",
  cssEntry: "src/index.css",
};

const source = "export function Sample() { return null; }\n";
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
      docsUrl: "https://ecentry.dev/docs/components/sample",
      license: "MIT",
    },
    () => source,
  ),
];

describe("CLI install planning", () => {
  it("plans init and add without writing, then installs only declared files", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ec-cli-"));
    roots.push(root);
    const init = createInitPlan(config);
    const plan = installItems(["sample"], config, { registry });
    expect(init.files.map((file) => file.path)).toEqual(["ecentry.json"]);
    expect(plan.files.map((file) => file.path)).toEqual([
      "src/components/ui/sample/index.tsx",
    ]);
    expect(plan.peerDependencies).toEqual({ react: ">=18" });
    await applyInstallPlan(root, init, { dryRun: true });
    await applyInstallPlan(root, plan, { dryRun: true });
    await expect(
      readFile(path.join(root, "ecentry.json"), "utf8"),
    ).rejects.toThrow();
    await applyInstallPlan(root, init);
    await applyInstallPlan(root, plan);
    expect(
      await readFile(
        path.join(root, "src/components/ui/sample/index.tsx"),
        "utf8",
      ),
    ).toBe(source);
    expect(
      JSON.parse(await readFile(path.join(root, "ecentry.json"), "utf8")),
    ).toEqual(config);
  });

  it("preserves edited files and rejects unsafe config paths", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ec-cli-"));
    roots.push(root);
    const plan = installItems(["sample"], config, { registry });
    await applyInstallPlan(root, plan);
    const installed = path.join(root, plan.files[0]!.path);
    await writeFile(installed, "local edit\n");
    await expect(applyInstallPlan(root, plan)).rejects.toThrow(
      /exists|modified/i,
    );
    expect(await readFile(installed, "utf8")).toBe("local edit\n");
    expect(() =>
      installItems(
        ["sample"],
        { ...config, sourceDir: "../escape" },
        { registry },
      ),
    ).toThrow(/sourceDir/);
  });
});
