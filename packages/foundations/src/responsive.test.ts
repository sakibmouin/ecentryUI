import { describe, expect, it } from "vitest";
import { createTheme, renderResponsiveCss } from "./index.js";

const theme = createTheme({
  tokens: {
    "breakpoints.lg": "64rem",
    "breakpoints.sm": "40rem",
    "breakpoints.md": "48rem",
  },
});

describe("responsive styles", () => {
  it("orders media queries by width and preserves logical properties", () => {
    const css = renderResponsiveCss(theme, ".layout", {
      "padding-inline-start": { base: "8px", md: "24px", sm: "16px" },
      display: "flex",
    });

    expect(css).toContain("padding-inline-start: 8px;");
    expect(css).toContain("display: flex;");
    expect(css.indexOf("min-width: 40rem")).toBeLessThan(
      css.indexOf("min-width: 48rem"),
    );
    expect(css).not.toContain("min-width: 64rem");
  });

  it("rejects unknown breakpoints and unsafe selectors", () => {
    expect(() =>
      renderResponsiveCss(theme, ".layout", { display: { tablet: "grid" } }),
    ).toThrow(/tablet/);
    expect(() =>
      renderResponsiveCss(theme, "body, *", { display: "grid" }),
    ).toThrow(/selector/);
  });
});
