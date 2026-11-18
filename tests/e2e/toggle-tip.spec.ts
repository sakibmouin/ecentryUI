import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Toggle Tip opens by keyboard, closes and restores focus", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/toggle-tip/");
  const region = page.getByRole("region", { name: "Toggle tip example" });
  const trigger = region.getByRole("button", {
    name: "About project visibility",
  });
  await trigger.focus();
  await trigger.press("Enter");
  const dialog = region.getByRole("dialog", { name: "Project visibility" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toBeFocused();
  await dialog.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
