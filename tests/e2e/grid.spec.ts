import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Grid lays out responsive spans and follows RTL", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/grid/");
  const grid = page.getByTestId("responsive-grid");
  const feature = page.getByTestId("featured-grid-item");
  await expect(grid).toHaveCSS("display", "grid");
  await expect(grid).toHaveCSS("column-gap", "16px");
  const desktopColumns = await grid.evaluate((element) =>
    getComputedStyle(element).gridTemplateColumns.split(" "),
  );
  expect(desktopColumns).toHaveLength(3);
  const gridBox = await grid.boundingBox();
  const featureBox = await feature.boundingBox();
  expect(featureBox!.width).toBeGreaterThan(gridBox!.width / 2);
  const rtlItems = page.getByTestId("rtl-grid").locator(".ec-grid-item");
  const first = await rtlItems.nth(0).boundingBox();
  const last = await rtlItems.nth(2).boundingBox();
  expect(first!.x).toBeGreaterThan(last!.x);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(grid).toHaveCSS("column-gap", "12px");
  const mobileColumns = await grid.evaluate((element) =>
    getComputedStyle(element).gridTemplateColumns.split(" "),
  );
  expect(mobileColumns).toHaveLength(1);
  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function GridExample", { exact: false }),
  ).toBeVisible();
});
