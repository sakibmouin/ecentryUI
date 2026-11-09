import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Center, Square, and Circle preserve geometry, semantics, and appearance", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/center/");
  await expect(
    page.getByRole("heading", { name: "Center", exact: true }),
  ).toBeVisible();
  const panel = page.getByTestId("center-panel");
  await expect(panel).toHaveJSProperty("tagName", "SECTION");
  const outer = await panel.boundingBox();
  const inner = await page.getByTestId("center-content").boundingBox();
  expect(
    Math.abs(inner!.x + inner!.width / 2 - (outer!.x + outer!.width / 2)),
  ).toBeLessThan(1);
  expect(
    Math.abs(inner!.y + inner!.height / 2 - (outer!.y + outer!.height / 2)),
  ).toBeLessThan(1);
  const inline = page.getByTestId("inline-center");
  await expect(inline).toHaveCSS("display", "inline-flex");
  const square = page.getByTestId("square");
  const circle = page.getByTestId("circle");
  await expect(square).toHaveCSS("width", "56px");
  await expect(square).toHaveCSS("height", "56px");
  await expect(circle).toHaveCSS("border-radius", "50%");
  await expect(circle).toHaveCSS("direction", "rtl");
  const light = await panel.evaluate(
    (element) => globalThis.getComputedStyle(element).backgroundColor,
  );
  await page.getByRole("button", { name: "Dark mode" }).click();
  await expect
    .poll(() =>
      panel.evaluate(
        (element) => globalThis.getComputedStyle(element).backgroundColor,
      ),
    )
    .not.toBe(light);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(panel).toBeVisible();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function CenterExample", { exact: false }),
  ).toBeVisible();
});
