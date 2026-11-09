import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  generateRegistryItem,
  validateRegistry,
  type CanonicalItem,
  type RegistryPayload,
} from "./index.js";

const source = "export function Example() { return null; }\n";
const example: CanonicalItem = {
  id: "example",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/example/example.tsx",
      path: "example.tsx",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: ["colors.text"],
  docsUrl: "https://ecentry.dev/docs/components/example",
  license: "MIT",
};

function makeItem(input: CanonicalItem = example): RegistryPayload {
  const item = {
    ...input,
    files: input.files.map((file) => ({
      ...file,
      source: file.source.replace("/example/", `/${input.id}/`),
    })),
  };
  return generateRegistryItem(item, (path) => {
    if (path !== item.files[0]?.source) throw new Error("Unexpected source");
    return source;
  });
}

describe("registry schema", () => {
  it("generates deterministic payload bytes and hashes from canonical source", () => {
    const generated = makeItem();
    expect(generated.files["example.tsx"]).toBe(source);
    expect(generated.manifest.hashes["example.tsx"]).toBe(
      createHash("sha256").update(source).digest("hex"),
    );
    expect(generated).toEqual(makeItem());
    expect(validateRegistry([generated])).toEqual(["example"]);
  });

  it("rejects unsafe IDs, paths, commands and mismatched hashes", () => {
    expect(() => makeItem({ ...example, id: "../example" })).toThrow(/id/i);
    expect(() =>
      makeItem({
        ...example,
        files: [{ ...example.files[0]!, path: "../escape.tsx" }],
      }),
    ).toThrow(/path/i);
    expect(() =>
      makeItem({ ...example, postinstall: "curl bad.test" } as CanonicalItem),
    ).toThrow(/field|command/i);
    expect(() =>
      makeItem({ ...example, npmDependencies: { helper: "file:../helper" } }),
    ).toThrow(/package dependency/i);
    const tampered = makeItem();
    tampered.files["example.tsx"] = "changed";
    expect(() => validateRegistry([tampered])).toThrow(/hash/i);
  });

  it("resolves dependencies in a stable order and rejects missing or cyclic items", () => {
    const base = makeItem();
    const middle = makeItem({
      ...example,
      id: "middle",
      dependencies: ["example"],
    });
    const top = makeItem({
      ...example,
      id: "top",
      dependencies: ["middle", "example"],
    });
    expect(validateRegistry([top, base, middle])).toEqual([
      "example",
      "middle",
      "top",
    ]);
    expect(() =>
      validateRegistry([makeItem({ ...example, dependencies: ["missing"] })]),
    ).toThrow(/missing/);
    expect(() =>
      validateRegistry([
        makeItem({ ...example, dependencies: ["middle"] }),
        makeItem({ ...example, id: "middle", dependencies: ["example"] }),
      ]),
    ).toThrow(/cycle/i);
  });
});
