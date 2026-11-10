import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Code renders inline and block snippets accessibly", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/code/");
  const example = page.locator(".code-demo");
  await expect(example.locator("code").first()).toHaveText("npm run build");
  const block = example.locator("code[data-block]");
  await expect(block).toBeVisible();
  await expect(block).toHaveCSS("white-space", "pre-wrap");
  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function CodeExample", { exact: false }),
  ).toBeVisible();
});
