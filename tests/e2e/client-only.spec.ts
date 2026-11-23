import { expect, test } from "@playwright/test";

test("Client Only reads browser state after mounting", async ({ page }) => {
  await page.setViewportSize({ width: 840, height: 800 });
  await page.goto("http://127.0.0.1:4177/components/client-only/");
  await expect(page.getByText("Viewport width: 840 px")).toBeVisible();
  await expect(page.getByText("Checking this browser…")).toHaveCount(0);
});
