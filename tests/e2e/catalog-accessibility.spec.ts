import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// These component flows do not run axe in their individual tests.
const components = [
  "client-only",
  "environment-provider",
  "for",
  "format-byte",
  "format-number",
  "heading",
  "highlight",
  "locale-provider",
  "portal",
  "presence",
  "radiomark",
  "show",
  "skip-nav",
  "theme",
  "visually-hidden",
];

test.describe.configure({ mode: "parallel" });

for (const component of components) {
  test(`${component} default preview has no serious accessibility violations`, async ({
    page,
  }) => {
    await page.goto(`http://127.0.0.1:4177/components/${component}/`);
    await expect(
      page.getByRole("region", { name: "Live example" }).getByRole("tabpanel"),
    ).toBeVisible();
    const audit = await new AxeBuilder({ page }).analyze();
    expect(
      audit.violations.filter(
        ({ impact }) => impact === "critical" || impact === "serious",
      ),
    ).toEqual([]);
  });
}
