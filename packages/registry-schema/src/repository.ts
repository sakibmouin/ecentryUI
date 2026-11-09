import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { generateRegistryItem, validateRegistry } from "./index.js";
import type { CanonicalItem, RegistryItem, RegistryPayload } from "./index.js";

export async function validateRepository(root: string): Promise<string[]> {
  const registryRoot = path.join(root, "registry/react");
  const entries = await readdir(registryRoot, { withFileTypes: true }).catch(
    (error: unknown) => {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw error;
    },
  );
  const payloads: RegistryPayload[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory())
      throw new Error(`Unexpected registry entry: ${entry.name}`);
    const itemRoot = path.join(registryRoot, entry.name);
    const manifest = JSON.parse(
      await readFile(path.join(itemRoot, "manifest.json"), "utf8"),
    ) as RegistryItem;
    if (manifest.id !== entry.name || !Array.isArray(manifest.files)) {
      throw new Error(`Invalid registry manifest: ${entry.name}`);
    }
    const files: Record<string, string> = {};
    for (const file of manifest.files) {
      if (
        typeof file !== "string" ||
        !/^[a-z0-9][a-z0-9._-]*(?:\/[a-z0-9][a-z0-9._-]*)*$/.test(file)
      ) {
        throw new Error(`Unsafe registry path: ${file}`);
      }
      files[file] = await readFile(path.join(itemRoot, file), "utf8");
    }
    payloads.push({ manifest, files });
  }

  const order = validateRegistry(payloads);
  for (const payload of payloads) {
    const manifest = payload.manifest;
    const canonical: CanonicalItem = {
      id: manifest.id,
      version: manifest.version,
      framework: manifest.framework,
      files: manifest.files.map((file) => ({
        path: file,
        source: `packages/react/src/components/${manifest.id}/${file}`,
      })),
      dependencies: manifest.dependencies,
      ...(manifest.npmDependencies
        ? { npmDependencies: manifest.npmDependencies }
        : {}),
      peerDependencies: manifest.peerDependencies,
      tokens: manifest.tokens,
      docsUrl: manifest.docsUrl,
      license: manifest.license,
      ...(manifest.compatibility
        ? { compatibility: manifest.compatibility }
        : {}),
    };
    const generated = generateRegistryItem(canonical, (source) => {
      const file = source.slice(
        `packages/react/src/components/${manifest.id}/`.length,
      );
      return payload.files[file]!;
    });
    for (const file of manifest.files) {
      const canonicalSource = await readFile(
        path.join(
          root,
          canonical.files.find((entry) => entry.path === file)!.source,
        ),
        "utf8",
      );
      if (canonicalSource !== generated.files[file]) {
        throw new Error(
          `Generated payload differs from canonical source: ${manifest.id}/${file}`,
        );
      }
    }
    if (JSON.stringify(generated.manifest) !== JSON.stringify(manifest)) {
      throw new Error(
        `Generated manifest differs from canonical metadata: ${manifest.id}`,
      );
    }
  }
  return order;
}
