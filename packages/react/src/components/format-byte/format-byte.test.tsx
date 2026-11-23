import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { FormatByte } from "./format-byte.js";

it("scales decimal bytes and localizes signed values", () => {
  expect(
    renderToStaticMarkup(<FormatByte value={0} unitDisplay="long" />),
  ).toBe("0 bytes");
  expect(
    renderToStaticMarkup(<FormatByte value={-1_500_000} locale="fr" />),
  ).toBe("-1,5 Mo");
  expect(renderToStaticMarkup(<FormatByte value={2e15} />)).toBe("2 PB");
  expect(renderToStaticMarkup(<FormatByte value={NaN} />)).toBe("");
});
