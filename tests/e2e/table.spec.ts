import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Table preserves native semantics and scrolls at narrow widths", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:4177/components/table/");
  const example = page.getByRole("region", { name: "Table example" });
  const table = example.getByRole("table", { name: "Recent orders" });
  await expect(
    table.getByRole("columnheader", { name: "Total" }),
  ).toBeVisible();
  await expect(table).toHaveCSS("display", "table");
  const scroller = example.getByRole("region", {
    name: "Scroll recent orders",
  });
  await scroller.focus();
  await scroller.press("ArrowRight");
  await expect
    .poll(() => scroller.evaluate((node) => node.scrollLeft))
    .toBeGreaterThan(0);
  await example.getByRole("checkbox", { name: "Compact rows" }).check();
  await expect(table).toHaveAttribute("data-density", "compact");
  await example.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      ({ impact }) => impact === "critical" || impact === "serious",
    ),
  ).toEqual([]);
});
