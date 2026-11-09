import { expect, test } from "@playwright/test";
import { createTheme, renderThemeCss } from "@ecentry/foundations";

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
