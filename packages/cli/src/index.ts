import { lstat, mkdir, open } from "node:fs/promises";
import path from "node:path";
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

const safePath = /^[a-z0-9][a-z0-9._-]*(?:\/[a-z0-9][a-z0-9._-]*)*$/;

function validateConfig(config: ProjectConfig): void {
  if (config.version !== 1)
    throw new Error("Unsupported project config version");
  for (const field of ["sourceDir", "cssEntry"] as const) {
    if (!safePath.test(config[field]))
      throw new Error(`Invalid ${field}: ${config[field]}`);
  }
  if (!/^@\/[a-z0-9/_-]+$/.test(config.importAlias)) {
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

async function assertSafeDestination(
  root: string,
  relative: string,
): Promise<void> {
  if (!safePath.test(relative))
    throw new Error(`Unsafe install path: ${relative}`);
  const parts = relative.split("/");
  let current = root;
  for (const part of parts.slice(0, -1)) {
    current = path.join(current, part);
    const stat = await lstat(current).catch((error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
    if (stat?.isSymbolicLink())
      throw new Error(`Symlink in install path: ${relative}`);
    if (stat && !stat.isDirectory())
      throw new Error(`Non-directory in install path: ${relative}`);
  }
  const target = path.join(root, relative);
  const existing = await lstat(target).catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
  if (existing)
    throw new Error(`File already exists or was modified: ${relative}`);
}

export async function applyInstallPlan(
  projectRoot: string,
  plan: InstallPlan,
  options: { dryRun?: boolean } = {},
): Promise<void> {
  for (const file of plan.files)
    await assertSafeDestination(projectRoot, file.path);
  if (options.dryRun) return;
  const written: string[] = [];
  try {
    for (const file of plan.files) {
      const target = path.join(projectRoot, file.path);
      await mkdir(path.dirname(target), { recursive: true });
      const handle = await open(target, "wx");
      written.push(target);
      try {
        await handle.writeFile(file.content);
      } finally {
        await handle.close();
      }
    }
  } catch (error) {
    const { unlink } = await import("node:fs/promises");
    await Promise.all(
      written.map((file) => unlink(file).catch(() => undefined)),
    );
    throw error;
  }
}
