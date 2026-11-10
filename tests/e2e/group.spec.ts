import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Group attaches controls, grows children, follows RTL, and responds to width", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/group/");
  const attached = page.getByTestId("attached-group");
  await expect(attached).toHaveCSS("gap", "0px");
  const day = attached.getByRole("button", { name: "Day" });
  const week = attached.getByRole("button", { name: "Week" });
  const first = await day.boundingBox();
  const second = await week.boundingBox();
  expect(Math.abs(first!.x + first!.width - second!.x)).toBeLessThanOrEqual(1);
  await day.click();
  await expect(day).toHaveAttribute("aria-pressed", "true");
  const grow = page.getByTestId("grow-group");
  const widths = await Promise.all(
    [0, 1, 2].map(
      async (index) =>
        (await grow.locator("button").nth(index).boundingBox())!.width,
    ),
  );
  expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(1);
  await expect(grow).toHaveCSS("gap", "16px");
  const rtl = page.getByTestId("rtl-group").locator("button");
  const rtlFirst = await rtl.first().boundingBox();
  const rtlSecond = await rtl.last().boundingBox();
  expect(rtlFirst!.x).toBeGreaterThan(rtlSecond!.x);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(grow).toHaveCSS("gap", "8px");
  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function GroupExample", { exact: false }),
  ).toBeVisible();
});
