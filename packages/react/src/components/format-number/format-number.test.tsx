import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { FormatNumber } from "./format-number.js";

it("formats numbers and bigint with native locale and style options", () => {
  expect(
    renderToStaticMarkup(
      <FormatNumber value={0.25} options={{ style: "percent" }} />,
    ),
  ).toBe("25%");
  expect(
    renderToStaticMarkup(<FormatNumber value={1_234.5} locale="de" />),
  ).toBe("1.234,5");
  expect(
    renderToStaticMarkup(<FormatNumber value={9_007_199_254_740_993n} />),
  ).toBe("9,007,199,254,740,993");
});
