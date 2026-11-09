#!/usr/bin/env node
import { readFile, readdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";
import { validateRegistry } from "@ecentry/registry-schema";
import type { RegistryPayload } from "@ecentry/registry-schema";
import { applyInstallPlan, createInitPlan, installItems } from "./index.js";
import type { InstallPlan, ProjectConfig } from "./index.js";

async function loadRegistry(directory: string): Promise<RegistryPayload[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const payloads: RegistryPayload[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory())
      throw new Error(`Unexpected registry entry: ${entry.name}`);
    const root = path.join(directory, entry.name);
    const manifest = JSON.parse(
      await readFile(path.join(root, "manifest.json"), "utf8"),
    ) as RegistryPayload["manifest"];
    if (!Array.isArray(manifest.files))
      throw new Error(`Invalid files for ${entry.name}`);
    const files: Record<string, string> = {};
    for (const file of manifest.files) {
      if (
        typeof file !== "string" ||
        !/^[a-z0-9][a-z0-9._-]*(?:\/[a-z0-9][a-z0-9._-]*)*$/.test(file)
      ) {
        throw new Error(`Unsafe registry path: ${file}`);
      }
      files[file] = await readFile(path.join(root, file), "utf8");
    }
    payloads.push({ manifest, files });
  }
  validateRegistry(payloads);
  return payloads;
}

function showPlan(plan: InstallPlan): void {
  for (const file of plan.files) console.log(`  file ${file.path}`);
  for (const [name, range] of Object.entries(plan.npmDependencies)) {
    console.log(`  npm ${name}@${range}`);
  }
  for (const [name, range] of Object.entries(plan.peerDependencies)) {
    console.log(`  peer ${name}@${range}`);
  }
}

async function confirm(): Promise<boolean> {
  const prompt = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  try {
    return (
      (await prompt.question("Apply these changes? [y/N] "))
        .trim()
        .toLowerCase() === "y"
    );
  } finally {
    prompt.close();
  }
}

async function installDependencies(
  root: string,
  plan: InstallPlan,
): Promise<void> {
  const packages = Object.entries(plan.npmDependencies).map(
    ([name, range]) => `${name}@${range}`,
  );
  if (!packages.length) return;
  await readFile(path.join(root, "package.json"), "utf8");
  await new Promise<void>((resolve, reject) => {
    const child = spawn(
      "npm",
      ["install", "--ignore-scripts", "--save", ...packages],
      {
        cwd: root,
        stdio: "inherit",
      },
    );
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`npm install failed with exit code ${code}`));
    });
  });
}

async function main(args: string[]): Promise<void> {
  const [command, ...rest] = args;
  const dryRun = rest.includes("--dry-run");
  const yes = rest.includes("--yes");
  const registryFlag = rest.indexOf("--registry");
  const registryDirectory =
    registryFlag >= 0 ? rest[registryFlag + 1] : undefined;
  if (registryFlag >= 0 && !registryDirectory)
    throw new Error("--registry needs a directory");
  const ids = rest.filter(
    (argument, index) =>
      !argument.startsWith("--") &&
      !(registryFlag >= 0 && index === registryFlag + 1),
  );
  const root = process.cwd();

  if (command === "init") {
    if (ids.length) throw new Error("init does not accept component IDs");
    const config: ProjectConfig = {
      version: 1,
      sourceDir: "src/components/ui",
      importAlias: "@/components/ui",
      cssEntry: "src/index.css",
    };
    const plan = createInitPlan(config);
    showPlan(plan);
    if (dryRun) return;
    if (!yes && !(await confirm())) return;
    await applyInstallPlan(root, plan);
    return;
  }

  if (command === "add") {
    if (!ids.length) throw new Error("add needs at least one component ID");
    const config = JSON.parse(
      await readFile(path.join(root, "ecentry.json"), "utf8"),
    ) as ProjectConfig;
    const defaultRegistry = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "../../../registry/react",
    );
    const registry = await loadRegistry(registryDirectory ?? defaultRegistry);
    const plan = installItems(ids, config, { registry });
    showPlan(plan);
    if (dryRun) return;
    if (!yes && !(await confirm())) return;
    await applyInstallPlan(root, plan, { dryRun: true });
    await installDependencies(root, plan);
    await applyInstallPlan(root, plan);
    return;
  }

  throw new Error(
    "Usage: ecentry init|add [components] [--dry-run] [--yes] [--registry dir]",
  );
}

main(process.argv.slice(2)).catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
