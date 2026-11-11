import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Text preserves paragraph semantics and wraps in both appearances", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/text/");
  const region = page.getByRole("region", { name: "Text example" });
  await expect(region.locator("p.ec-text")).toHaveCount(2);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(
    region.getByText("Supporting copy wraps naturally across narrow layouts."),
  ).toBeVisible();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
