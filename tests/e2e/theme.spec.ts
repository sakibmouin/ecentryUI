import { expect, test } from "@playwright/test";

test("Theme applies its color scheme to native fields", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/theme/");
  const field = page.getByRole("textbox", { name: "Workspace name" });
  await expect(field).toHaveCSS("color-scheme", "light");
  await page.getByRole("button", { name: "Dark mode" }).click();
  await expect(field).toHaveCSS("color-scheme", "dark");
  await expect(field).toHaveValue("Workshop");
});
