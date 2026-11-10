import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Em renders semantic emphasis", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/em/");
  await expect(page.locator("em")).toHaveText("important detail");
  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
