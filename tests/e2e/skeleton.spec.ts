import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Skeleton reveals content after loading", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/skeleton/");
  const region = page.getByRole("region", { name: "Skeleton example" });
  await expect(
    region.getByRole("status", { name: "Loading profile" }),
  ).toBeVisible();
  await region.getByRole("button", { name: "Finish loading" }).click();
  await expect(region.getByText("Profile ready")).toBeVisible();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
