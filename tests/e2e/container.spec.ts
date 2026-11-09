import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Container caps, centers, and fluidly fills width in LTR and RTL", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/container/");
  await expect(
    page.getByRole("heading", { name: "Container", exact: true }),
  ).toBeVisible();
  const constrained = page.getByTestId("constrained-container");
  const fluid = page.getByTestId("fluid-container");
  await expect(constrained).toHaveJSProperty("tagName", "SECTION");
  await expect(constrained).toHaveCSS("max-width", "480px");
  const parent = await constrained.locator("..").boundingBox();
  const child = await constrained.boundingBox();
  expect(
    Math.abs(child!.x + child!.width / 2 - (parent!.x + parent!.width / 2)),
  ).toBeLessThan(1);
  const fluidParent = await fluid.locator("..").boundingBox();
  const fluidBox = await fluid.boundingBox();
  expect(Math.abs(fluidBox!.width - (fluidParent!.width - 2))).toBeLessThan(1);
  await expect(fluid).toHaveCSS("padding-right", "20px");
  await expect(fluid).toHaveCSS("direction", "rtl");
  const light = await fluid.evaluate(
    (element) => globalThis.getComputedStyle(element).backgroundColor,
  );
  await page.getByRole("button", { name: "Dark mode" }).click();
  await expect
    .poll(() =>
      fluid.evaluate(
        (element) => globalThis.getComputedStyle(element).backgroundColor,
      ),
    )
    .not.toBe(light);
  await page.setViewportSize({ width: 390, height: 844 });
  const narrow = await constrained.boundingBox();
  expect(narrow!.width).toBeLessThan(480);
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function ContainerExample", { exact: false }),
  ).toBeVisible();
});
