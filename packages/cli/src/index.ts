import { applyProjectChanges, safePath } from "./project-files.js";
import { validateRegistry } from "@ecentry/registry-schema";
import type { RegistryPayload } from "@ecentry/registry-schema";

export interface ProjectConfig {
  version: 1;
  sourceDir: string;
  importAlias: string;
  cssEntry: string;
}

export interface PlannedFile {
  path: string;
  content: string;
}

export interface InstallPlan {
  files: readonly PlannedFile[];
  items: readonly string[];
  npmDependencies: Readonly<Record<string, string>>;
  peerDependencies: Readonly<Record<string, string>>;
}

export function validateConfig(config: ProjectConfig): void {
  if (config.version !== 1)
    throw new Error("Unsupported project config version");
  for (const field of ["sourceDir", "cssEntry"] as const) {
    if (typeof config[field] !== "string" || !safePath.test(config[field]))
      throw new Error(`Invalid ${field}: ${config[field]}`);
  }
  if (
    typeof config.importAlias !== "string" ||
    !/^@\/[a-z0-9/_-]+$/.test(config.importAlias)
  ) {
    throw new Error(`Invalid importAlias: ${config.importAlias}`);
  }
}

export function createInitPlan(config: ProjectConfig): InstallPlan {
  validateConfig(config);
  return {
    files: [
      { path: "ecentry.json", content: `${JSON.stringify(config, null, 2)}\n` },
    ],
    items: [],
    npmDependencies: {},
    peerDependencies: {},
  };
}

export function installItems(
  ids: readonly string[],
  projectConfig: ProjectConfig,
  options: { registry: readonly RegistryPayload[] },
): InstallPlan {
  validateConfig(projectConfig);
  const order = validateRegistry(options.registry);
  const byId = new Map(
    options.registry.map((payload) => [payload.manifest.id, payload]),
  );
  const selected = new Set<string>();
  function include(id: string): void {
    const payload = byId.get(id);
    if (!payload) throw new Error(`Unknown registry item: ${id}`);
    if (selected.has(id)) return;
    selected.add(id);
    for (const dependency of payload.manifest.dependencies) include(dependency);
  }
  for (const id of ids) include(id);

  const files: PlannedFile[] = [];
  const npmDependencies: Record<string, string> = {};
  const peerDependencies: Record<string, string> = {};
  const items = order.filter((id) => selected.has(id));
  for (const id of items) {
    const payload = byId.get(id)!;
    for (const file of payload.manifest.files) {
      files.push({
        path: `${projectConfig.sourceDir}/${id}/${file}`,
        content: payload.files[file]!,
      });
    }
    for (const [name, range] of Object.entries(
      payload.manifest.npmDependencies ?? {},
    )) {
      if (npmDependencies[name] && npmDependencies[name] !== range)
        throw new Error(`Conflicting dependency: ${name}`);
      npmDependencies[name] = range;
    }
    for (const [name, range] of Object.entries(
      payload.manifest.peerDependencies,
    )) {
      if (peerDependencies[name] && peerDependencies[name] !== range)
        throw new Error(`Conflicting peer dependency: ${name}`);
      peerDependencies[name] = range;
    }
  }
  return { files, items, npmDependencies, peerDependencies };
}

export async function applyInstallPlan(
  projectRoot: string,
  plan: InstallPlan,
  options: { dryRun?: boolean } = {},
): Promise<void> {
  await applyProjectChanges(
    projectRoot,
    plan.files.map((file) => ({
      path: file.path,
      before: null,
      after: file.content,
    })),
    options.dryRun,
  );
}
