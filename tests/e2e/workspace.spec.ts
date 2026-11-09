import { expect, test } from "@playwright/test";

test("browser runner supports keyboard activation", async ({ page }) => {
  await page.setContent(
    '<button type="button" onclick="this.textContent = \'Activated\'">Ready</button>',
  );
  const button = page.getByRole("button", { name: "Ready" });
  await button.focus();
  await expect(button).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Activated" })).toBeVisible();
});
