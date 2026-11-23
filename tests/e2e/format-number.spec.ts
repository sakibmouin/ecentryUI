import { expect, test } from "@playwright/test";

test("Format Number renders USD amounts and ratios", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/format-number/");
  await expect(page.getByText("Total: $1,234.50")).toBeVisible();
  await expect(page.getByText("Completion: 82%")).toBeVisible();
});
