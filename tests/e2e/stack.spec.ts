import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Stack lays out responsive content and preserves RTL order", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/stack/");
  const stack = page.getByTestId("responsive-stack");
  await expect(stack).toHaveJSProperty("tagName", "SECTION");
  await expect(stack).toHaveCSS("flex-direction", "row");
  await expect(stack).toHaveCSS("gap", "20px");

  const rtl = page.getByTestId("rtl-stack").locator("span");
  await expect(rtl.first()).toHaveText("الأول");
  await expect(rtl.last()).toHaveText("الثالث");

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(stack).toHaveCSS("flex-direction", "column");
  await expect(stack).toHaveCSS("gap", "12px");
  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function StackExample", { exact: false }),
  ).toBeVisible();
});
