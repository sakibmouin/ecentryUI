import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Stat presents metrics and context in both appearances", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/stat/");
  const region = page.getByRole("region", { name: "Stat example" });
  await expect(region.getByText("$12,480")).toBeVisible();
  await expect(region.getByText("Up 12%")).toBeVisible();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
