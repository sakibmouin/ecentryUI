import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Absolute Center positions each axis in LTR, RTL, and narrow layouts", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/absolute-center/");
  await expect(
    page.getByRole("heading", { name: "Absolute Center" }),
  ).toBeVisible();
  for (const [name, horizontal, vertical] of [
    ["both", true, true],
    ["horizontal", true, false],
    ["vertical", false, true],
    ["rtl", true, true],
  ] as const) {
    const frame = page.getByTestId(`${name}-frame`);
    const parent = await frame.boundingBox();
    const child = await frame.locator(".ec-absolute-center").boundingBox();
    expect(parent).not.toBeNull();
    expect(child).not.toBeNull();
    if (horizontal)
      expect(
        Math.abs(child!.x + child!.width / 2 - (parent!.x + parent!.width / 2)),
      ).toBeLessThan(1);
    if (vertical)
      expect(
        Math.abs(
          child!.y + child!.height / 2 - (parent!.y + parent!.height / 2),
        ),
      ).toBeLessThan(1);
  }
  const rtl = page.getByTestId("rtl-frame").locator(".ec-absolute-center");
  await rtl.evaluate((element) =>
    element.setAttribute("data-ec-axis", "horizontal"),
  );
  const rtlParent = await page.getByTestId("rtl-frame").boundingBox();
  const rtlChild = await rtl.boundingBox();
  expect(
    Math.abs(
      rtlChild!.x + rtlChild!.width / 2 - (rtlParent!.x + rtlParent!.width / 2),
    ),
  ).toBeLessThan(1);
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    ),
  ).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("rtl-frame")).toBeVisible();
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function AbsoluteCenterExample", { exact: false }),
  ).toBeVisible();
});
