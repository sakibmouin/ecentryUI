import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Calendar selects a range, skips unavailable dates, and works in both appearances", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/calendar/");
  const region = page.getByRole("region", { name: "Calendar example" });
  const grid = region.getByRole("grid", { name: "Choose travel dates" });
  await expect(grid.locator('button[data-date="2026-11-13"]')).toBeDisabled();
  await grid.locator('button[data-date="2026-11-10"]').click();
  await grid.locator('button[data-date="2026-11-12"]').click();
  await expect(region.getByRole("status")).toHaveText(
    "2026-11-10 to 2026-11-12",
  );
  await grid.locator('button[data-date="2026-11-12"]').focus();
  await page.keyboard.press("ArrowRight");
  await expect(grid.locator('button[data-date="2026-11-14"]')).toBeFocused();
  await region.getByRole("button", { name: "Dark mode" }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(grid).toBeVisible();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
