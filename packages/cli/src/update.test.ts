import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, expect, it } from "vitest";
import { applyProjectChanges } from "./project-files.js";
import { planAdd, planUpdate, readInstallState } from "./update.js";
import type { InstallPlan } from "./index.js";

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(
    roots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  );
});

const sourceDir = "src/components/ui";
const file = `${sourceDir}/sample/index.ts`;
const base = "one\ntwo\nthree\nfour\n";
function install(content: string): InstallPlan {
  return {
    files: [{ path: file, content }],
    items: ["sample"],
    npmDependencies: {},
    peerDependencies: {},
  };
}

async function setup() {
  const root = await mkdtemp(path.join(os.tmpdir(), "ec-entry-update-"));
  roots.push(root);
  await applyProjectChanges(root, await planAdd(root, install(base)));
  return root;
}

it("plans a dry update, merges disjoint edits, and records the new upstream base", async () => {
  const root = await setup();
  const local = "one edited locally\ntwo\nthree\nfour\n";
  const upstream = "one\ntwo\nthree\nfour upstream\n";
  await writeFile(path.join(root, file), local);
  const { changes, conflicts } = await planUpdate(
    root,
    sourceDir,
    install(upstream),
  );
  expect(conflicts).toEqual([]);
  expect(await readFile(path.join(root, file), "utf8")).toBe(local);
  expect((await readInstallState(root)).files[file]).toBe(base);
  await applyProjectChanges(root, changes);
  expect(await readFile(path.join(root, file), "utf8")).toBe(
    "one edited locally\ntwo\nthree\nfour upstream\n",
  );
  expect((await readInstallState(root)).files[file]).toBe(upstream);
});

it("shows a three-way conflict and leaves files unchanged", async () => {
  const root = await setup();
  const local = base.replace("two", "local change");
  await writeFile(path.join(root, file), local);
  const update = await planUpdate(
    root,
    sourceDir,
    install(base.replace("two", "upstream change")),
  );
  expect(update.changes).toEqual([]);
  expect(update.conflicts[0]?.detail).toContain("<<<<<<< local");
  expect(update.conflicts[0]?.detail).toContain("||||||| base");
  expect(update.conflicts[0]?.detail).toContain(">>>>>>> registry");
  expect(await readFile(path.join(root, file), "utf8")).toBe(local);
});

it("refuses to overwrite files changed after the update preview", async () => {
  const root = await setup();
  const update = await planUpdate(root, sourceDir, install("new content"));
  await writeFile(path.join(root, file), "concurrent edit");
  await expect(applyProjectChanges(root, update.changes)).rejects.toThrow(
    /modified/,
  );
  expect(await readFile(path.join(root, file), "utf8")).toBe("concurrent edit");
  expect((await readInstallState(root)).files[file]).toBe(base);
});

it("can add an item that shares a tracked dependency without replacing local edits", async () => {
  const root = await setup();
  await writeFile(path.join(root, file), "Customized dependency");
  const other = `${sourceDir}/other/index.ts`;
  const installWithDependency = install(base);
  const changes = await planAdd(root, {
    ...installWithDependency,
    files: [
      ...installWithDependency.files,
      { path: other, content: "New component" },
    ],
  });
  await applyProjectChanges(root, changes);
  expect(await readFile(path.join(root, file), "utf8")).toBe(
    "Customized dependency",
  );
  expect(await readFile(path.join(root, other), "utf8")).toBe("New component");
});
