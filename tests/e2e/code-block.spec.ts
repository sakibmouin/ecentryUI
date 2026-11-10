import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Code Block copies and collapses safe source text", async ({ page }) => {
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"], {
    origin: "http://127.0.0.1:4177",
  });
  await page.goto("http://127.0.0.1:4177/components/code-block/");
  const block = page.getByTestId("code-block-example");
  await expect(block).toBeVisible();
  await expect(block.locator("code")).toContainText("function greet");
  await block.getByRole("button", { name: "Collapse code" }).click();
  await expect(block.locator("pre")).toBeHidden();
  await block.getByRole("button", { name: "Expand code" }).click();
  await expect(block.locator("pre")).toBeVisible();
  await block.getByRole("button", { name: "Copy code" }).click();
  await expect(block.getByRole("button", { name: "Copied" })).toBeVisible();
  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function CodeBlockExample", { exact: false }),
  ).toBeVisible();
});
