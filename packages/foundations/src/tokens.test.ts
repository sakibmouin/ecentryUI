import { describe, expect, it } from "vitest";
import { createTheme, defaultTheme, resolveTokens } from "./tokens.js";

describe("theme token resolution", () => {
  it("resolves primitive and semantic references for each appearance", () => {
    const theme = createTheme({
      tokens: {
        "colors.ink": "#171717",
        "colors.paper": "#ffffff",
        "spacing.2": "8px",
        "spacing.4": "16px",
        "spacing.field": "calc({spacing.2} + {spacing.4})",
      },
      semanticTokens: {
        "colors.text": { light: "{colors.ink}", dark: "{colors.paper}" },
        "colors.input": { light: "{colors.text}", dark: "{colors.text}" },
      },
    });

    expect(resolveTokens(theme, "light")["colors.input"]).toBe("#171717");
    expect(resolveTokens(theme, "dark")["colors.input"]).toBe("#ffffff");
    expect(resolveTokens(theme, "light")["spacing.field"]).toBe(
      "calc(8px + 16px)",
    );
  });

  it("returns a stable sorted map without changing consumer input", () => {
    const tokens = { "spacing.4": "16px", "colors.ink": "#171717" };
    const theme = createTheme({ tokens });

    expect(Object.keys(resolveTokens(theme, "light"))).toEqual([
      "colors.ink",
      "spacing.4",
    ]);
    expect(tokens).toEqual({ "spacing.4": "16px", "colors.ink": "#171717" });
    expect(() =>
      Object.assign(theme.tokens, { "colors.ink": "red" }),
    ).toThrow();
  });

  it("rejects missing references with the referring token name", () => {
    expect(() =>
      createTheme({ tokens: { "colors.text": "{colors.missing}" } }),
    ).toThrow(/colors\.text.*colors\.missing/);
  });

  it("rejects cycles even when they occur only in dark appearance", () => {
    expect(() =>
      createTheme({
        tokens: { "colors.base": "#111111" },
        semanticTokens: {
          "colors.a": { light: "{colors.base}", dark: "{colors.b}" },
          "colors.b": { light: "{colors.base}", dark: "{colors.a}" },
        },
      }),
    ).toThrow(/colors\.a.*colors\.b.*colors\.a/);
  });

  it("rejects invalid paths and CSS separators", () => {
    expect(() => createTheme({ tokens: { "Colors.bad": "red" } })).toThrow(
      /Colors\.bad/,
    );
    expect(() =>
      createTheme({ tokens: { "colors.bad": "red; display:none" } }),
    ).toThrow(/colors\.bad/);
  });

  it("provides a balanced default theme for both appearances", () => {
    const light = resolveTokens(defaultTheme, "light");
    const dark = resolveTokens(defaultTheme, "dark");

    expect(light["colors.text"]).not.toBe(dark["colors.text"]);
    expect(light["spacing.4"]).toBe("16px");
    expect(light["radii.md"]).toBeDefined();
    expect(light["motion.duration.fast"]).toBeDefined();
  });
});
