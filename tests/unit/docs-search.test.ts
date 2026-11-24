import { expect, it } from "vitest";
import { searchDocs } from "../../apps/docs/src/search.js";

const fixtures = [
  {
    id: "steps",
    title: "Steps",
    href: "/components/steps/",
    version: "0.1.0",
    aliases: ["wizard"],
    keywords: ["disabled"],
    api: [
      {
        name: "StepsProps",
        props: [
          {
            name: "onValueChange",
            type: "(value: string) => void",
            required: false,
            description: "",
          },
        ],
      },
    ],
  },
];

it("matches names, aliases, states, guides and precise prop links", () => {
  expect(searchDocs(fixtures, "steps")[0]?.href).toBe("/components/steps/");
  expect(searchDocs(fixtures, "wizard")[0]?.href).toBe("/components/steps/");
  expect(searchDocs(fixtures, "disabled")[0]?.href).toBe("/components/steps/");
  expect(searchDocs(fixtures, "onValueChange")[0]?.href).toBe(
    "/components/steps/#api-reference",
  );
  expect(searchDocs(fixtures, "examples guide")[0]?.href).toBe(
    "/guides/examples/",
  );
  expect(searchDocs(fixtures, "")).toEqual([]);
});
