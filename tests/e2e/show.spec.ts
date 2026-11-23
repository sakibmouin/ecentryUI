import { expect, test } from "@playwright/test";

test("Show switches between fallback and content", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/show/");
  await expect(page.getByText("Details are hidden.")).toBeVisible();
  await page.getByRole("button", { name: "Show details" }).click();
  await expect(page.getByText("The report is ready to share.")).toBeVisible();
  await expect(page.getByText("Details are hidden.")).toHaveCount(0);
});
