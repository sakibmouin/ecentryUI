import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Flex changes direction by breakpoint and Spacer fills RTL space", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:4177/components/flex/");
  await expect(
    page.getByRole("heading", { name: "Flex", exact: true }),
  ).toBeVisible();
  const flex = page.getByTestId("responsive-flex");
  await expect(flex).toHaveJSProperty("tagName", "SECTION");
  await expect(flex).toHaveCSS("flex-direction", "column");
  await expect(flex).toHaveCSS("gap", "12px");
  await page.setViewportSize({ width: 900, height: 844 });
  await expect(flex).toHaveCSS("flex-direction", "row");
  await expect(flex).toHaveCSS("gap", "20px");
  const toolbar = page.getByTestId("spacer-flex");
  const spacer = page.getByTestId("spacer");
  await expect(toolbar).toHaveCSS("direction", "rtl");
  await expect(spacer).toHaveCSS("flex-grow", "1");
  const first = await toolbar.getByText("Start").boundingBox();
  const last = await toolbar.getByText("End").boundingBox();
  expect(first!.x).toBeGreaterThan(last!.x);
  const light = await flex.evaluate(
    (element) => globalThis.getComputedStyle(element).backgroundColor,
  );
  await page.getByRole("button", { name: "Dark mode" }).click();
  await expect
    .poll(() =>
      flex.evaluate(
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
    page.getByText("function FlexExample", { exact: false }),
  ).toBeVisible();
});
