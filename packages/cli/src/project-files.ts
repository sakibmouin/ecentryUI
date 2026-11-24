import {
  link,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  rename,
  rm,
  rmdir,
  unlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

export const safePath = /^[a-z0-9][a-z0-9._-]*(?:\/[a-z0-9][a-z0-9._-]*)*$/;

export interface ProjectChange {
  path: string;
  before: string | null;
  after: string | null;
}

async function statIfPresent(file: string) {
  try {
    return await lstat(file);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    return null;
  }
}

export async function readProjectFile(root: string, relative: string) {
  if (!safePath.test(relative))
    throw new Error(`Unsafe project path: ${relative}`);
  const parts = relative.split("/");
  let current = root;
  for (const part of parts.slice(0, -1)) {
    current = path.join(current, part);
    const info = await statIfPresent(current);
    if (!info) return { content: null };
    if (!info.isDirectory() || info.isSymbolicLink())
      throw new Error(`Unsafe project directory: ${relative}`);
  }

  const target = path.join(root, relative);
  const info = await statIfPresent(target);
  if (!info) return { content: null };
  if (!info.isFile() || info.isSymbolicLink())
    throw new Error(`Unsafe project file: ${relative}`);
  return { content: await readFile(target, "utf8"), mode: info.mode & 0o777 };
}

async function writeChange(
  root: string,
  relative: string,
  content: string | null,
  create: boolean,
  mode?: number,
) {
  const target = path.join(root, relative);
  if (content === null) {
    await unlink(target);
    return;
  }
  const parent = path.dirname(target);
  await mkdir(parent, { recursive: true });
  const temp = await mkdtemp(path.join(parent, ".ecentry-"));
  try {
    const draft = path.join(temp, "source");
    await writeFile(draft, content, { mode });
    if (create) await link(draft, target);
    else await rename(draft, target);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
}

export async function applyProjectChanges(
  root: string,
  changes: readonly ProjectChange[],
  dryRun = false,
) {
  const paths = new Set(changes.map((change) => change.path));
  if (paths.size !== changes.length)
    throw new Error("Duplicate project changes");

  async function verify(change: ProjectChange) {
    const existing = await readProjectFile(root, change.path);
    if (existing.content !== change.before) {
      throw new Error(`File already exists or was modified: ${change.path}`);
    }
    return existing.mode;
  }

  if (dryRun) {
    for (const change of changes) await verify(change);
    return;
  }
  if (!changes.length) return;

  const lock = path.join(root, ".ecentry-operation");
  try {
    await mkdir(lock);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    throw new Error("Another ecentry operation holds the project lock.", {
      cause: error,
    });
  }

  const completed: { change: ProjectChange; mode: number | undefined }[] = [];
  try {
    for (const change of changes) await verify(change);
    for (const change of changes) {
      const mode = await verify(change);
      await writeChange(
        root,
        change.path,
        change.after,
        change.before === null,
        mode,
      );
      completed.push({ change, mode });
    }
  } catch (error) {
    const failures: unknown[] = [];
    for (const { change, mode } of completed.reverse()) {
      try {
        if (
          (await readProjectFile(root, change.path)).content !== change.after
        ) {
          throw new Error(`File changed during rollback: ${change.path}`, {
            cause: error,
          });
        }
        await writeChange(
          root,
          change.path,
          change.before,
          change.after === null,
          mode,
        );
      } catch (rollbackError) {
        failures.push(rollbackError);
      }
    }
    if (failures.length) {
      throw new AggregateError(
        [error, ...failures],
        `Update failed with rollback errors: ${failures.map(String).join("; ")}`,
        { cause: error },
      );
    }
    throw error;
  } finally {
    await rmdir(lock);
  }
}
