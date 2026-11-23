import { expect, test } from "@playwright/test";

test("Presence hides and remounts content with reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("http://127.0.0.1:4177/components/presence/");
  const toggle = page.getByRole("button", { name: "Toggle message" });
  const message = page.getByText("Report saved");
  await expect(message).toBeVisible();
  await toggle.click();
  await expect(message).toHaveCount(0);
  await expect(toggle).toBeFocused();
  await toggle.press("Space");
  await expect(message).toBeVisible();
});
