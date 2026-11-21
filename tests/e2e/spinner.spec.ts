import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Spinner exposes labelled loading states", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/spinner/");
  const region = page.getByRole("region", { name: "Spinner example" });
  await expect(
    region.getByRole("status", { name: "Saving report" }),
  ).toBeVisible();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
