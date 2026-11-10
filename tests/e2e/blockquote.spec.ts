import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Blockquote presents wrapping text and attribution accessibly", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/blockquote/");
  const quote = page.locator("blockquote");
  await expect(quote).toBeVisible();
  await expect(quote).toHaveCSS("font-style", "italic");
  await expect(quote.locator("cite")).toHaveText("A design note");
  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function BlockquoteExample", { exact: false }),
  ).toBeVisible();
});
