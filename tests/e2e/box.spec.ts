import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Box applies responsive and logical layout with semantic markup", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:4177/components/box/");
  await expect(
    page.getByRole("heading", { name: "Box", exact: true }),
  ).toBeVisible();
  const card = page.getByTestId("responsive-box");
  const grid = page.getByTestId("responsive-grid");
  const rtl = page.getByTestId("rtl-box");
  await expect(card).toHaveJSProperty("tagName", "SECTION");
  await expect(card).toHaveCSS("padding", "16px");
  await expect(grid).toHaveCSS("display", "block");
  await expect(rtl).toHaveCSS("margin-right", "8px");
  await page.setViewportSize({ width: 900, height: 844 });
  await expect(card).toHaveCSS("padding", "32px");
  await expect(grid).toHaveCSS("display", "grid");
  await expect(grid).toHaveCSS("gap", "20px");
  await expect(rtl).toHaveCSS("margin-right", "16px");
  const light = await card.evaluate(
    (element) => globalThis.getComputedStyle(element).backgroundColor,
  );
  await page.getByRole("button", { name: "Dark mode" }).click();
  await expect(page.getByRole("button", { name: "Light mode" })).toBeVisible();
  await expect
    .poll(() =>
      card.evaluate(
        (element) => globalThis.getComputedStyle(element).backgroundColor,
      ),
    )
    .not.toBe(light);
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function BoxExample", { exact: false }),
  ).toBeVisible();
});
