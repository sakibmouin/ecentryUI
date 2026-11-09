import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Bleed extends past padding on logical edges in LTR and RTL", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/bleed/");
  await expect(page.getByRole("heading", { name: "Bleed" })).toBeVisible();
  const normalParent = await page.getByTestId("default-parent").boundingBox();
  const normalBleed = await page
    .getByTestId("default-parent")
    .locator(".ec-bleed")
    .boundingBox();
  expect(Math.abs(normalBleed!.x - (normalParent!.x + 1))).toBeLessThan(1);
  expect(
    Math.abs(
      normalBleed!.x +
        normalBleed!.width -
        (normalParent!.x + normalParent!.width - 1),
    ),
  ).toBeLessThan(1);
  const blockParent = await page.getByTestId("block-parent").boundingBox();
  const blockBleed = await page
    .getByTestId("block-parent")
    .locator(".ec-bleed")
    .boundingBox();
  expect(Math.abs(blockBleed!.y - (blockParent!.y + 5))).toBeLessThan(1);
  const rtlParent = await page.getByTestId("rtl-parent").boundingBox();
  const rtlBleed = await page
    .getByTestId("rtl-parent")
    .locator(".ec-bleed")
    .boundingBox();
  expect(rtlBleed!.x + rtlBleed!.width).toBeGreaterThan(
    rtlParent!.x + rtlParent!.width,
  );
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    ),
  ).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("rtl-parent")).toBeVisible();
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function BleedExample", { exact: false }),
  ).toBeVisible();
});
