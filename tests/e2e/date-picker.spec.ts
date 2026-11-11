import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Date Picker selects, resets, and dismisses a localized calendar", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/date-picker/");
  const region = page.getByRole("region", { name: "Date picker example" });
  const departure = region.getByRole("button", { name: /Departure/ });
  await departure.click();
  const dialog = region.getByRole("dialog", { name: "Departure calendar" });
  await expect(dialog).toBeVisible();
  await dialog.locator('button[data-date="2026-11-12"]').click();
  await expect(dialog).toHaveCount(0);
  await expect(departure).toContainText("Nov 12, 2026");
  await expect(region.locator('input[name="departure"]')).toHaveValue(
    "2026-11-12",
  );
  await departure.click();
  await page.keyboard.press("Escape");
  await expect(departure).toBeFocused();
  await region.getByRole("button", { name: "Reset trip" }).click();
  await expect(region.locator('input[name="departure"]')).toHaveValue("");
  await expect(
    region.getByRole("button", { name: /Unavailable picker/ }),
  ).toBeDisabled();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
