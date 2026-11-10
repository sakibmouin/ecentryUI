import { expect, test } from "@playwright/test";
test("Highlight renders semantic marked content", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/highlight/");
  await expect(page.locator("mark")).toHaveText("match this phrase");
});
