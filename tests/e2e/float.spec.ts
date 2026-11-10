import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const placements = [
  "top-start",
  "top-center",
  "top-end",
  "middle-start",
  "middle-center",
  "middle-end",
  "bottom-start",
  "bottom-center",
  "bottom-end",
] as const;

test("Float anchors across nine placements, offsets, RTL, and breakpoints", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/float/");
  await expect(
    page.getByRole("heading", { name: "Float", exact: true }),
  ).toBeVisible();
  const select = page.getByRole("combobox", { name: "Placement" });
  const ltrParent = page.getByTestId("ltr-parent");
  const ltrFloat = page.getByTestId("ltr-float");
  const rtlParent = page.getByTestId("rtl-parent");
  const rtlFloat = page.getByTestId("rtl-float");

  for (const placement of placements) {
    await select.selectOption(placement);
    const [block, inline] = placement.split("-");
    for (const [parent, float, rtl] of [
      [ltrParent, ltrFloat, false],
      [rtlParent, rtlFloat, true],
    ] as const) {
      const frame = await parent.boundingBox();
      const badge = await float.boundingBox();
      const x =
        frame!.x +
        frame!.width *
          (inline === "center" ? 0.5 : (inline === "start") === rtl ? 1 : 0);
      const y =
        frame!.y +
        frame!.height * (block === "top" ? 0 : block === "middle" ? 0.5 : 1);
      expect(Math.abs(badge!.x + badge!.width / 2 - x)).toBeLessThan(2);
      expect(Math.abs(badge!.y + badge!.height / 2 - y)).toBeLessThan(2);
    }
  }

  await select.selectOption("top-end");
  const before = await ltrFloat.boundingBox();
  const beforeParent = await ltrParent.boundingBox();
  await page.getByRole("slider", { name: /Offset/ }).focus();
  await page.keyboard.press("End");
  await expect(page.getByText("Offset: 16px")).toBeVisible();
  const after = await ltrFloat.boundingBox();
  const afterParent = await ltrParent.boundingBox();
  const beforeX =
    before!.x + before!.width / 2 - (beforeParent!.x + beforeParent!.width);
  const afterX =
    after!.x + after!.width / 2 - (afterParent!.x + afterParent!.width);
  expect(Math.abs(afterX - beforeX - 16)).toBeLessThan(1);
  expect(
    Math.abs(after!.y - afterParent!.y - (before!.y - beforeParent!.y) - 16),
  ).toBeLessThan(1);

  const responsiveParent = page.getByTestId("responsive-parent");
  const responsiveFloat = page.getByTestId("responsive-float");
  let parentBox = await responsiveParent.boundingBox();
  let badgeBox = await responsiveFloat.boundingBox();
  expect(
    Math.abs(
      badgeBox!.x + badgeBox!.width / 2 - (parentBox!.x + parentBox!.width),
    ),
  ).toBeLessThan(2);
  await page.setViewportSize({ width: 390, height: 844 });
  parentBox = await responsiveParent.boundingBox();
  badgeBox = await responsiveFloat.boundingBox();
  expect(
    Math.abs(badgeBox!.x + badgeBox!.width / 2 - parentBox!.x),
  ).toBeLessThan(2);
  expect(
    Math.abs(
      badgeBox!.y + badgeBox!.height / 2 - (parentBox!.y + parentBox!.height),
    ),
  ).toBeLessThan(2);

  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function FloatExample", { exact: false }),
  ).toBeVisible();
});
