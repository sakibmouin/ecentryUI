import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Toast queues announcements, actions and dismissals", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/toast/");
  const region = page.getByRole("region", { name: "Toast example" });
  await region.getByRole("button", { name: "Show success" }).click();
  await expect(page.getByRole("status")).toContainText("Changes saved");
  await region.getByRole("button", { name: "Show error" }).click();
  await page.getByRole("button", { name: "Dismiss Changes saved" }).click();
  await expect(page.getByRole("alert")).toContainText("Save failed");
  await page.getByRole("button", { name: "Retry" }).click();
  await expect(region.getByText("Retry requested")).toBeVisible();
  await expect(page.getByRole("alert")).toHaveCount(0);
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
