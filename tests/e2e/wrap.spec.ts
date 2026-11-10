import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Wrap wraps content responsively and follows RTL", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/wrap/");
  const wrap = page.getByTestId("responsive-wrap");
  await expect(wrap).toHaveCSS("flex-wrap", "wrap");
  await expect(wrap).toHaveCSS("gap", "12px");
  await expect(page.getByTestId("rtl-wrap").locator("span").first()).toHaveText(
    "الأول",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(wrap).toHaveCSS("gap", "8px");
  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function WrapExample", { exact: false }),
  ).toBeVisible();
});
