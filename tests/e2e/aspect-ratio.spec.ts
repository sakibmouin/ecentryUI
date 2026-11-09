import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Aspect Ratio keeps media frames proportional across widths", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/aspect-ratio/");
  await expect(
    page.getByRole("heading", { name: "Aspect Ratio" }),
  ).toBeVisible();
  for (const [name, ratio] of [
    ["wide", 16 / 9],
    ["square", 1],
    ["portrait", 3 / 4],
  ] as const) {
    const frame = await page.getByTestId(`${name}-frame`).boundingBox();
    expect(frame).not.toBeNull();
    expect(Math.abs(frame!.width / frame!.height - ratio)).toBeLessThan(0.02);
  }
  const before = await page.getByTestId("wide-frame").boundingBox();
  await page.setViewportSize({ width: 390, height: 844 });
  const after = await page.getByTestId("wide-frame").boundingBox();
  expect(after!.width).toBeLessThan(before!.width);
  expect(Math.abs(after!.width / after!.height - 16 / 9)).toBeLessThan(0.02);
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function AspectRatioExample", { exact: false }),
  ).toBeVisible();
});
