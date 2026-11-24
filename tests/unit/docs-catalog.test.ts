import { expect, it } from "vitest";
import { generateCatalog } from "../../apps/docs/scripts/catalog.mjs";

it("derives docs entries and API fields from canonical public types", async () => {
  const entries = await generateCatalog();
  expect(entries.length).toBeGreaterThan(100);
  expect(new Set(entries.map(({ href }) => href)).size).toBe(entries.length);
  const steps = entries.find(({ id }) => id === "steps");
  expect(steps?.api.find(({ name }) => name === "StepsProps")?.props).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name: "orientation",
        type: expect.stringContaining("vertical"),
        required: false,
      }),
      expect.objectContaining({ name: "items", required: true }),
    ]),
  );
  expect(
    steps?.api.flatMap(({ props }) => props.map(({ name }) => name)),
  ).not.toContain("draggable");
});
