import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Simple Grid adapts tracks, auto fits cards, and follows RTL", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/simple-grid/");
  const grid = page.getByTestId("simple-grid-example");
  await expect(grid).toHaveCSS("display", "grid");
  await expect(grid).toHaveCSS("column-gap", "16px");
  expect(
    await grid.evaluate(
      (element) =>
        getComputedStyle(element).gridTemplateColumns.split(" ").length,
    ),
  ).toBe(3);
  const rtlCards = page.getByTestId("simple-grid-rtl").locator("span");
  const first = await rtlCards.first().boundingBox();
  const last = await rtlCards.last().boundingBox();
  expect(first!.x).toBeGreaterThan(last!.x);

  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await grid.evaluate(
      (element) =>
        getComputedStyle(element).gridTemplateColumns.split(" ").length,
    ),
  ).toBe(1);
  await page.getByLabel("Layout").selectOption("auto");
  await expect(grid).toHaveAttribute("data-ec-simple-grid-mode", "auto-fit");
  expect(
    await grid.evaluate(
      (element) =>
        getComputedStyle(element).gridTemplateColumns.split(" ").length,
    ),
  ).toBe(1);
  await page.setViewportSize({ width: 1280, height: 900 });
  expect(
    await grid.evaluate(
      (element) =>
        getComputedStyle(element).gridTemplateColumns.split(" ").length,
    ),
  ).toBeGreaterThan(1);
  await page.getByLabel("Gap").selectOption("24");
  await expect(grid).toHaveCSS("column-gap", "24px");
  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function SimpleGridExample", { exact: false }),
  ).toBeVisible();
});
