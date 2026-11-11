import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Kbd shows an accessible keyboard shortcut in both appearances", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/kbd/");
  const keys = page.locator(".code-demo kbd");
  await expect(keys).toHaveCount(2);
  await expect(keys.first()).toHaveText("Ctrl");
  await expect(keys.first()).toHaveCSS("display", "inline-block");
  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function KbdExample", { exact: false }),
  ).toBeVisible();
});
