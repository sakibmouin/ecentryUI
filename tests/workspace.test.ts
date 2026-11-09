import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = fileURLToPath(new URL("../", import.meta.url));
const packageIds = ["foundations", "react", "registry-schema", "cli"];

describe("npm workspace", () => {
  it("declares unique package names and source entry points", () => {
    const names = packageIds.map((id) => {
      const manifest = JSON.parse(
        readFileSync(`${root}/packages/${id}/package.json`, "utf8"),
      ) as {
        name: string;
        exports: Record<string, unknown>;
      };
      expect(manifest.exports).toHaveProperty(".");
      return manifest.name;
    });

    expect(new Set(names).size).toBe(packageIds.length);
  });
});
