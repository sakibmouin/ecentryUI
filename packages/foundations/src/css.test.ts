import { describe, expect, it } from "vitest";
import { createTheme, renderThemeCss } from "./index.js";

describe("theme CSS", () => {
  it("emits scoped variables in a stable layer order", () => {
    const theme = createTheme({
      prefix: "custom",
      tokens: { "colors.paper": "#ffffff", "colors.ink": "#111111" },
      semanticTokens: {
        "colors.text": { light: "{colors.ink}", dark: "{colors.paper}" },
      },
    });

    const css = renderThemeCss(theme, { scope: ".preview" });
    expect(css).toContain(
      "@layer ec.reset, ec.tokens, ec.components, ec.variants, ec.utilities;",
    );
    expect(css).toContain(':where(.preview, .preview [data-ec-theme="light"])');
    expect(css).toContain("--custom-colors-text: #111111;");
    expect(css).toContain("--custom-colors-text: #ffffff;");
    expect(css).toBe(renderThemeCss(theme, { scope: ".preview" }));
    expect(css.match(/--custom-colors-paper: #ffffff;/g)).toHaveLength(1);
  });

  it("rejects ambiguous variable names and unsafe scopes", () => {
    const collision = createTheme({
      tokens: { "colors.a-b": "red", "colors.a.b": "blue" },
    });
    expect(() => renderThemeCss(collision)).toThrow(
      /colors\.a-b.*colors\.a\.b/,
    );
    expect(() =>
      renderThemeCss(createTheme({ tokens: { "colors.ink": "red" } }), {
        scope: "body, *",
      }),
    ).toThrow(/scope/);
    expect(() => createTheme({ tokens: { "colors.ink": "red/*" } })).toThrow(
      /colors\.ink/,
    );
  });
});
