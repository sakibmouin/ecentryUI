import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Icon presents meaningful, decorative, and loading states", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/icon/");
  const region = page.getByRole("region", { name: "Icon example" });
  await expect(
    region.getByRole("img", { name: "Favorite", exact: true }),
  ).toBeVisible();
  await expect(region.getByText("Favorites", { exact: true })).toBeVisible();
  await expect(
    region.getByRole("status", { name: "Loading Favorites" }),
  ).toBeVisible();
  await region.getByRole("button", { name: "Finish loading" }).click();
  await expect(region.getByRole("img", { name: "Favorites" })).toBeVisible();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
