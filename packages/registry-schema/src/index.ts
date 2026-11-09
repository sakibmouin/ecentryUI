import { createHash } from "node:crypto";

export interface CanonicalFile {
  source: string;
  path: string;
}

export interface CanonicalItem {
  id: string;
  version: string;
  framework: "react";
  files: readonly CanonicalFile[];
  dependencies: readonly string[];
  npmDependencies?: Readonly<Record<string, string>>;
  peerDependencies: Readonly<Record<string, string>>;
  tokens: readonly string[];
  docsUrl: string;
  license: "MIT";
  compatibility?: string;
}

export interface RegistryItem extends Omit<CanonicalItem, "files"> {
  schemaVersion: 1;
  files: readonly string[];
  hashes: Readonly<Record<string, string>>;
}

export interface RegistryPayload {
  manifest: RegistryItem;
  files: Record<string, string>;
}

const allowedCanonicalKeys = new Set([
  "id",
  "version",
  "framework",
  "files",
  "dependencies",
  "npmDependencies",
  "peerDependencies",
  "tokens",
  "docsUrl",
  "license",
  "compatibility",
]);
const allowedManifestKeys = new Set([
  ...allowedCanonicalKeys,
  "schemaVersion",
  "hashes",
]);
const itemId = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const relativePath = /^[a-z0-9][a-z0-9._-]*(?:\/[a-z0-9][a-z0-9._-]*)*$/;

function assertFields(value: object, allowed: Set<string>): void {
  for (const field of Object.keys(value)) {
    if (!allowed.has(field))
      throw new Error(`Unsupported registry field or command: ${field}`);
  }
}

function assertPath(path: string): void {
  if (!relativePath.test(path) || path.split("/").includes("..")) {
    throw new Error(`Unsafe registry path: ${path}`);
  }
}

function assertItem(item: CanonicalItem): void {
  if (!itemId.test(item.id)) throw new Error(`Invalid registry id: ${item.id}`);
  if (!/^\d+\.\d+\.\d+(?:-[a-z0-9.-]+)?$/.test(item.version)) {
    throw new Error(`Invalid version for ${item.id}`);
  }
  if (item.framework !== "react")
    throw new Error(`Unsupported framework: ${item.framework}`);
  if (item.license !== "MIT")
    throw new Error(`Unsupported license for ${item.id}`);
  if (!/^https:\/\/[^\s/]+\/[^\s]*$/.test(item.docsUrl)) {
    throw new Error(`Invalid HTTPS docs URL for ${item.id}`);
  }
  if (!item.files.length)
    throw new Error(`Registry item ${item.id} needs files`);
  for (const dependency of item.dependencies) {
    if (!itemId.test(dependency))
      throw new Error(`Invalid dependency id: ${dependency}`);
  }
  for (const path of item.tokens) {
    if (!/^[a-z][a-z0-9-]*(?:\.[a-z0-9-]+)+$/.test(path)) {
      throw new Error(`Invalid token path: ${path}`);
    }
  }
  for (const [name, range] of Object.entries({
    ...item.npmDependencies,
    ...item.peerDependencies,
  })) {
    if (
      !/^(?:@[^/\s]+\/)?[a-z0-9][a-z0-9._-]*$/.test(name) ||
      !/^(?:[~^]|[<>]=?|=)?\d+(?:\.\d+){0,2}(?:\s*\|\|\s*(?:[~^]|[<>]=?|=)?\d+(?:\.\d+){0,2})*$/.test(
        range,
      )
    ) {
      throw new Error(`Invalid package dependency: ${name}`);
    }
  }
}

function hash(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

export function generateRegistryItem(
  item: CanonicalItem,
  readSource: (path: string) => string,
): RegistryPayload {
  assertFields(item, allowedCanonicalKeys);
  assertItem(item);
  const files: Record<string, string> = {};
  const hashes: Record<string, string> = {};
  for (const file of [...item.files].sort((a, b) =>
    a.path.localeCompare(b.path),
  )) {
    assertFields(file, new Set(["source", "path"]));
    assertPath(file.path);
    assertPath(file.source);
    if (
      !file.source.startsWith(
        `packages/${item.framework}/src/components/${item.id}/`,
      )
    ) {
      throw new Error(
        `Canonical source path is outside the component tree: ${file.source}`,
      );
    }
    if (Object.hasOwn(files, file.path))
      throw new Error(`Duplicate registry path: ${file.path}`);
    const content = readSource(file.source);
    files[file.path] = content;
    hashes[file.path] = hash(content);
  }
  const manifest: RegistryItem = {
    schemaVersion: 1,
    id: item.id,
    version: item.version,
    framework: item.framework,
    files: Object.keys(files),
    hashes,
    dependencies: [...new Set(item.dependencies)].sort(),
    ...(item.npmDependencies
      ? {
          npmDependencies: Object.fromEntries(
            Object.entries(item.npmDependencies).sort(),
          ),
        }
      : {}),
    peerDependencies: Object.fromEntries(
      Object.entries(item.peerDependencies).sort(),
    ),
    tokens: [...new Set(item.tokens)].sort(),
    docsUrl: item.docsUrl,
    license: item.license,
    ...(item.compatibility ? { compatibility: item.compatibility } : {}),
  };
  return { manifest, files };
}

export function validateRegistry(
  payloads: readonly RegistryPayload[],
): string[] {
  const items = new Map<string, RegistryItem>();
  for (const payload of payloads) {
    const item = payload.manifest;
    assertFields(item, allowedManifestKeys);
    if (item.schemaVersion !== 1)
      throw new Error(
        `Unsupported registry schema version: ${item.schemaVersion}`,
      );
    assertItem({
      ...item,
      files: item.files.map((path) => ({
        path,
        source: `packages/react/src/components/${path}`,
      })),
    });
    if (items.has(item.id))
      throw new Error(`Duplicate registry id: ${item.id}`);
    items.set(item.id, item);
    if (new Set(item.files).size !== item.files.length)
      throw new Error(`Duplicate file in ${item.id}`);
    if (
      Object.keys(payload.files).length !== item.files.length ||
      Object.keys(item.hashes).length !== item.files.length
    ) {
      throw new Error(`File or hash mismatch in ${item.id}`);
    }
    for (const path of item.files) {
      assertPath(path);
      if (
        !Object.hasOwn(payload.files, path) ||
        item.hashes[path] !== hash(payload.files[path]!)
      ) {
        throw new Error(`File hash mismatch: ${item.id}/${path}`);
      }
    }
  }

  const order: string[] = [];
  const state = new Map<string, "visiting" | "done">();
  function visit(id: string): void {
    const entry = items.get(id);
    if (!entry) throw new Error(`Missing registry dependency: ${id}`);
    if (state.get(id) === "visiting")
      throw new Error(`Registry dependency cycle at ${id}`);
    if (state.get(id) === "done") return;
    state.set(id, "visiting");
    for (const dependency of entry.dependencies) visit(dependency);
    state.set(id, "done");
    order.push(id);
  }
  for (const id of [...items.keys()].sort()) visit(id);
  return order;
}
