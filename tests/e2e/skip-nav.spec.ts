import { expect, test } from "@playwright/test";

test("Skip Nav jumps over intervening controls and continues at its destination", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/skip-nav/");
  const skip = page.getByRole("link", { name: "Skip to report" });
  await skip.focus();
  await expect(skip).toHaveCSS("clip-path", "none");
  await skip.press("Enter");
  await expect(page.locator("#skip-nav-example-content")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Download report" }),
  ).toBeFocused();
});
