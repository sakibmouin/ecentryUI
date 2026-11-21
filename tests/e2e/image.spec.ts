import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Image displays informative alternative text", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/image/");
  const region = page.getByRole("region", { name: "Image example" });
  await expect(
    region.getByRole("img", { name: "Green rectangle" }),
  ).toBeVisible();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
