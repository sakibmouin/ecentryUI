import { readFile, readdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { validateRegistry } from "@ecentry/registry-schema";
import type { RegistryPayload } from "@ecentry/registry-schema";
import { satisfies, valid } from "semver";
import { installItems, validateConfig } from "./index.js";
import type { ProjectConfig } from "./index.js";
import { readProjectFile } from "./project-files.js";
import { readInstallState } from "./update.js";

async function installedVersion(root: string, name: string) {
  const require = createRequire(path.resolve(root, "package.json"));
  for (const directory of require.resolve.paths(name) ?? []) {
    const file = path.join(directory, name, "package.json");
    try {
      const { version } = JSON.parse(await readFile(file, "utf8")) as {
        version?: unknown;
      };
      if (typeof version !== "string" || !valid(version))
        throw new Error(`Invalid version for installed package ${name}`);
      return version;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  return null;
}

export async function inspectProject(
  root: string,
  config: ProjectConfig,
  registry: readonly RegistryPayload[],
  requestedIds: readonly string[] = [],
): Promise<string[]> {
  validateConfig(config);
  const known = new Set(validateRegistry(registry));
  const issues: string[] = [];
  const state = await readInstallState(root);
  const directories = await readdir(path.join(root, config.sourceDir), {
    withFileTypes: true,
  }).catch((error: unknown) => {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    return [];
  });
  const installed = new Set(
    directories
      .filter((entry) => entry.isDirectory() && known.has(entry.name))
      .map((entry) => entry.name),
  );
  const prefix = `${config.sourceDir}/`;
  for (const file of Object.keys(state.files)) {
    if (!file.startsWith(prefix)) {
      issues.push(`Tracked file outside configured source directory: ${file}`);
      continue;
    }
    const id = file.slice(prefix.length).split("/")[0];
    if (id) installed.add(id);
    if ((await readProjectFile(root, file)).content === null)
      issues.push(`Missing source file: ${file}`);
  }
  const ids = requestedIds.length ? requestedIds : [...installed];
  const available = ids.filter((id) => {
    if (known.has(id)) return true;
    issues.push(`Component absent from registry snapshot: ${id}`);
    return false;
  });
  const plan = installItems(available, config, { registry });
  for (const { path: file } of plan.files) {
    if ((await readProjectFile(root, file)).content === null)
      issues.push(`Missing source file: ${file}`);
  }
  if ((await readProjectFile(root, config.cssEntry)).content === null)
    issues.push(`Missing configured CSS entry: ${config.cssEntry}`);

  for (const [kind, dependencies] of [
    ["peer", plan.peerDependencies],
    ["dependency", plan.npmDependencies],
  ] as const) {
    for (const [name, range] of Object.entries(dependencies)) {
      const version = await installedVersion(root, name);
      if (version === null)
        issues.push(`Missing ${kind} ${name}: requires ${range}.`);
      else if (!satisfies(version, range))
        issues.push(
          `Incompatible ${kind} ${name}: installed ${version}, requires ${range}.`,
        );
    }
  }

  return [...new Set(issues)].sort();
}
