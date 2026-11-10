import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Scroll Area handles vertical, horizontal, two-axis, and RTL scrolling", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/scroll-area/");
  const vertical = page.getByRole("region", { name: "Recent activity" });
  await expect(vertical).toHaveCSS("overflow-y", "auto");
  await expect(vertical).toHaveCSS("max-height", "220px");
  expect(
    await vertical.evaluate(
      (element) =>
        getComputedStyle(element, "::-webkit-scrollbar-thumb").backgroundColor,
    ),
  ).toBe("rgba(0, 0, 0, 0)");
  expect(
    await vertical.evaluate(
      (element) => element.scrollHeight > element.clientHeight,
    ),
  ).toBe(true);
  await vertical.focus();
  await page.keyboard.press("End");
  await expect
    .poll(() => vertical.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);
  await page.getByRole("button", { name: "Scroll to top" }).click();
  await expect
    .poll(() => vertical.evaluate((element) => element.scrollTop))
    .toBe(0);
  await page.getByRole("button", { name: "Scroll to bottom" }).click();
  await expect
    .poll(() => vertical.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);

  await page
    .getByRole("combobox", { name: "Scrollbar" })
    .selectOption("always");
  await page.getByRole("combobox", { name: "Size" }).selectOption("lg");
  await expect(vertical).toHaveAttribute("data-variant", "always");
  await expect(vertical).toHaveAttribute("data-size", "lg");
  await expect(vertical).toHaveCSS("--ec-scrollbar-thickness", "12px");
  expect(
    await vertical.evaluate(
      (element) => getComputedStyle(element, "::-webkit-scrollbar").width,
    ),
  ).toBe("12px");
  expect(
    await vertical.evaluate(
      (element) =>
        getComputedStyle(element, "::-webkit-scrollbar-thumb").backgroundColor,
    ),
  ).not.toBe("rgba(0, 0, 0, 0)");

  const horizontal = page.getByRole("region", {
    name: "Project stages",
    exact: true,
  });
  expect((await horizontal.boundingBox())!.height).toBeLessThan(100);
  expect(
    await horizontal.evaluate(
      (element) => element.scrollWidth > element.clientWidth,
    ),
  ).toBe(true);
  await horizontal.focus();
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(() => horizontal.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0);
  const rtl = page.getByRole("region", { name: "RTL project stages" });
  await rtl.focus();
  await page.keyboard.press("ArrowLeft");
  await expect
    .poll(() => rtl.evaluate((element) => element.scrollLeft))
    .toBeLessThan(0);
  const both = page.getByRole("region", { name: "Planning matrix" });
  expect(
    await both.evaluate(
      (element) =>
        element.scrollHeight > element.clientHeight &&
        element.scrollWidth > element.clientWidth,
    ),
  ).toBe(true);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(vertical).toHaveCSS("max-height", "180px");
  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function ScrollAreaExample", { exact: false }),
  ).toBeVisible();
});

test("Scroll Area keeps its thumb visible on touch screens", async ({
  browser,
}) => {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  await page.goto("http://127.0.0.1:4177/components/scroll-area/");
  expect(await page.evaluate(() => matchMedia("(hover: none)").matches)).toBe(
    true,
  );
  const area = page.getByRole("region", { name: "Recent activity" });
  expect(
    await area.evaluate(
      (element) =>
        getComputedStyle(element, "::-webkit-scrollbar-thumb").backgroundColor,
    ),
  ).not.toBe("rgba(0, 0, 0, 0)");
  await page.close();
});
