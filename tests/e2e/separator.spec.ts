import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Separator variants, labels, responsive orientation, and RTL render correctly", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/separator/");
  const labeled = page.getByTestId("labeled-separator");
  await expect(labeled).toHaveAttribute("role", "separator");
  await expect(labeled).toHaveAttribute("aria-label", "OR");
  await page.getByRole("combobox", { name: "Line" }).selectOption("dashed");
  await page.getByRole("combobox", { name: "Weight" }).selectOption("lg");
  await expect(labeled).toHaveAttribute("data-variant", "dashed");
  expect(
    await labeled.evaluate(
      (element) => getComputedStyle(element, "::before").borderTopStyle,
    ),
  ).toBe("dashed");
  expect(
    await labeled.evaluate(
      (element) => getComputedStyle(element, "::before").borderTopWidth,
    ),
  ).toBe("4px");
  await page
    .getByRole("combobox", { name: "Label position" })
    .selectOption("start");
  expect(
    await labeled.evaluate(
      (element) => getComputedStyle(element, "::before").display,
    ),
  ).toBe("none");

  const vertical = page.getByTestId("vertical-separator");
  await expect(vertical).toHaveAttribute("aria-orientation", "vertical");
  expect(
    await vertical.evaluate(
      (element) => getComputedStyle(element, "::before").borderLeftStyle,
    ),
  ).toBe("dashed");
  const rtl = page.getByTestId("rtl-separator");
  const rtlBox = await rtl.boundingBox();
  const rtlLabel = await rtl.locator(".ec-separator-label").boundingBox();
  expect(rtlLabel!.x).toBeGreaterThan(rtlBox!.x + rtlBox!.width / 2);

  const responsive = page.getByTestId("responsive-separator");
  await expect(responsive).toHaveCSS("flex-direction", "column");
  await expect(responsive).toHaveAttribute("role", "presentation");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(responsive).toHaveCSS("flex-direction", "row");
  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function SeparatorExample", { exact: false }),
  ).toBeVisible();
});
