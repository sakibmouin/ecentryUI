import { expect, test } from "@playwright/test";
import {
  createTheme,
  defaultTheme,
  renderResponsiveCss,
  renderThemeCss,
} from "@ecentry/foundations";

test("scoped tokens switch appearance and preserve variant precedence", async ({
  page,
}) => {
  const theme = createTheme({
    tokens: {
      "colors.light": "#ffffff",
      "colors.dark": "#101010",
      "colors.accent": "#237c66",
    },
    semanticTokens: {
      "colors.text": { light: "{colors.dark}", dark: "{colors.light}" },
    },
  });

  await page.setContent(`
    <style>
      ${renderThemeCss(theme, { scope: ".preview" })}
      @layer ec.components { .target { color: var(--ec-colors-text); background: red; } }
      @layer ec.variants { .target { background: blue; } }
    </style>
    <div id="outside" class="target">Outside</div>
    <section class="preview">
      <div data-ec-theme="light"><button id="light" class="target">Light</button></div>
      <div data-ec-theme="dark">
        <button id="dark" class="target">Dark</button>
        <div data-ec-theme="light"><button id="restored" class="target">Light again</button></div>
      </div>
    </section>
  `);

  await expect(page.locator("#light")).toHaveCSS("color", "rgb(16, 16, 16)");
  await expect(page.locator("#dark")).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(page.locator("#restored")).toHaveCSS("color", "rgb(16, 16, 16)");
  await expect(page.locator("#light")).toHaveCSS(
    "background-color",
    "rgb(0, 0, 255)",
  );
  await expect(page.locator("#outside")).not.toHaveCSS(
    "color",
    "rgb(16, 16, 16)",
  );
});

test("responsive layout and focus respect RTL, contrast and motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 700 });
  await page.setContent(`
    <style>
      ${renderThemeCss(defaultTheme)}
      ${renderResponsiveCss(defaultTheme, ".layout", {
        "padding-inline-start": { base: "8px", md: "24px" },
        "transition-duration": "var(--ec-motion-duration-normal)",
      })}
    </style>
    <main dir="rtl">
      <button class="layout ec-focus-ring">Open</button>
    </main>
  `);
  const button = page.getByRole("button", { name: "Open" });
  await expect(button).toHaveCSS("padding-right", "8px");
  await page.setViewportSize({ width: 800, height: 700 });
  await expect(button).toHaveCSS("padding-right", "24px");
  await page.keyboard.press("Tab");
  await expect(button).toBeFocused();
  await expect(button).toHaveCSS("outline-width", "2px");
  await page.emulateMedia({
    contrast: "more",
    reducedMotion: "reduce",
    forcedColors: "active",
  });
  await expect(button).toHaveCSS("outline-width", "3px");
  await expect(button).toHaveCSS("transition-duration", "0s");
});
