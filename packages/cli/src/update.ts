import { diff3Merge, diffPatch } from "node-diff3";
import type { InstallPlan } from "./index.js";
import { readProjectFile, safePath } from "./project-files.js";
import type { ProjectChange } from "./project-files.js";

const lockPath = "ecentry.lock.json";

interface InstallState {
  version: 1;
  files: Record<string, string>;
}

async function loadState(root: string) {
  const { content } = await readProjectFile(root, lockPath);
  if (content === null)
    return { content, state: { version: 1, files: {} } as InstallState };
  const value = JSON.parse(content) as InstallState | null;
  if (
    value?.version !== 1 ||
    !value.files ||
    typeof value.files !== "object" ||
    Array.isArray(value.files)
  ) {
    throw new Error("Invalid ecentry.lock.json");
  }
  for (const [file, source] of Object.entries(value.files)) {
    if (!safePath.test(file) || typeof source !== "string")
      throw new Error("Invalid file in ecentry.lock.json");
  }
  return { content, state: value };
}

export async function readInstallState(root: string) {
  return (await loadState(root)).state;
}

function lockChange(
  before: string | null,
  files: Record<string, string>,
): ProjectChange {
  const sorted = Object.fromEntries(
    Object.entries(files).sort(([a], [b]) => a.localeCompare(b)),
  );
  return {
    path: lockPath,
    before,
    after: `${JSON.stringify({ version: 1, files: sorted }, null, 2)}\n`,
  };
}

export async function planAdd(root: string, plan: InstallPlan) {
  const { content, state } = await loadState(root);
  const files = { ...state.files };
  const changes: ProjectChange[] = [];
  for (const file of plan.files) {
    if (Object.hasOwn(files, file.path)) {
      if (files[file.path] !== file.content) {
        throw new Error(
          `A newer registry version is available for ${file.path}. Use update.`,
        );
      }
      if ((await readProjectFile(root, file.path)).content === null) {
        throw new Error(`A tracked file is missing: ${file.path}`);
      }
      continue;
    }
    files[file.path] = file.content;
    changes.push({ path: file.path, before: null, after: file.content });
  }
  if (changes.length) changes.push(lockChange(content, files));
  return changes;
}

function lines(content: string | null) {
  return content?.match(/[^\n]*\n|[^\n]+$/g) ?? [];
}

function conflictText(
  local: string | null,
  base: string | null,
  upstream: string | null,
) {
  function display(content: string | null) {
    if (content === null) return "(file absent)\n";
    return content.endsWith("\n") ? content : `${content}\n`;
  }
  return `<<<<<<< local\n${display(local)}||||||| base\n${display(base)}=======\n${display(upstream)}>>>>>>> registry`;
}

function mergeFile(
  local: string | null,
  base: string | null,
  upstream: string | null,
) {
  if (local === upstream || upstream === base) return { content: local };
  if (local === base) return { content: upstream };
  if (local === null || base === null || upstream === null) {
    return { conflict: conflictText(local, base, upstream) };
  }

  const regions = diff3Merge(lines(local), lines(base), lines(upstream), {
    excludeFalseConflicts: true,
  });
  const conflicts = regions.flatMap(({ conflict }) =>
    conflict
      ? [
          conflictText(
            conflict.a.join(""),
            conflict.o.join(""),
            conflict.b.join(""),
          ),
        ]
      : [],
  );
  if (conflicts.length) return { conflict: conflicts.join("\n") };
  return { content: regions.flatMap(({ ok }) => ok ?? []).join("") };
}

async function selectedFiles(
  root: string,
  sourceDir: string,
  plan: InstallPlan,
) {
  const { content, state } = await loadState(root);
  const upstream = new Map(plan.files.map((file) => [file.path, file.content]));
  const prefixes = new Set(plan.items.map((item) => `${sourceDir}/${item}`));
  const depth = sourceDir.split("/").length + 1;
  const tracked = Object.keys(state.files).filter((file) =>
    prefixes.has(file.split("/").slice(0, depth).join("/")),
  );
  const files = [...new Set([...upstream.keys(), ...tracked])].sort();
  const sides = await Promise.all(
    files.map(async (file) => ({
      path: file,
      local: (await readProjectFile(root, file)).content,
      base: state.files[file] ?? null,
      upstream: upstream.get(file) ?? null,
    })),
  );
  return { content, state, sides };
}

export async function planUpdate(
  root: string,
  sourceDir: string,
  plan: InstallPlan,
) {
  const { content, state, sides } = await selectedFiles(root, sourceDir, plan);
  const files = { ...state.files };
  const changes: ProjectChange[] = [];
  const conflicts: { path: string; detail: string }[] = [];

  for (const file of sides) {
    const merged = mergeFile(file.local, file.base, file.upstream);
    if ("conflict" in merged && merged.conflict !== undefined) {
      conflicts.push({ path: file.path, detail: merged.conflict });
      continue;
    }
    if (file.upstream === null) delete files[file.path];
    else files[file.path] = file.upstream;
    if (merged.content !== undefined && merged.content !== file.local) {
      changes.push({
        path: file.path,
        before: file.local,
        after: merged.content,
      });
    }
  }
  if (conflicts.length) return { changes: [], conflicts };
  const lock = lockChange(content, files);
  if (lock.before !== lock.after) changes.push(lock);
  return { changes, conflicts };
}

export function describeDiff(file: ProjectChange) {
  if (file.before === file.after) return "";
  const hunks = diffPatch(lines(file.before), lines(file.after)).flatMap(
    ({ buffer1, buffer2 }) => [
      `@@ -${buffer1.offset + 1},${buffer1.length} +${buffer2.offset + 1},${buffer2.length} @@`,
      ...buffer1.chunk.map((line) => `-${line.replace(/\r?\n$/, "")}`),
      ...buffer2.chunk.map((line) => `+${line.replace(/\r?\n$/, "")}`),
    ],
  );
  return [
    `--- ${file.before === null ? "/dev/null" : file.path}`,
    `+++ ${file.after === null ? "/dev/null" : file.path}`,
    ...hunks,
  ].join("\n");
}

export async function previewDiff(
  root: string,
  sourceDir: string,
  plan: InstallPlan,
) {
  const { sides } = await selectedFiles(root, sourceDir, plan);
  return sides
    .map((file) =>
      describeDiff({
        path: file.path,
        before: file.local,
        after: file.upstream,
      }),
    )
    .filter(Boolean);
}
