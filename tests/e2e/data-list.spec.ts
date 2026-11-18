import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Data List renders semantic pairs, states, and both appearances", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/data-list/");
  const region = page.getByRole("region", { name: "Data List example" });
  const list = region.locator('dl[aria-label="Profile details"]');
  await expect(list.locator("dt")).toHaveCount(3);
  await expect(list.locator("dd")).toContainText([
    "Ada Lovelace",
    "Administrator",
    "Active",
  ]);
  await expect(
    region.locator('dl[aria-label="Horizontal details"]'),
  ).toHaveAttribute("data-orientation", "horizontal");
  await expect(region.getByRole("status")).toContainText([
    "No details yet",
    "Loading details",
  ]);
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
