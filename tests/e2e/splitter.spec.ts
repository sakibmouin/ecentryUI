import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Splitter resizes three panels by pointer and keyboard within limits", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/splitter/");
  const root = page.getByTestId("splitter-example");
  const handle = page.getByRole("separator", {
    name: "Resize navigation and editor",
  });
  await expect(root).toHaveCSS("display", "flex");
  await expect(handle).toHaveAttribute("aria-valuenow", "25");
  await handle.scrollIntoViewIfNeeded();
  const before = await page
    .getByRole("region", { name: "Navigation panel" })
    .boundingBox();
  const handleBox = await handle.boundingBox();
  await page.mouse.move(
    handleBox!.x + handleBox!.width / 2,
    handleBox!.y + handleBox!.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    handleBox!.x + handleBox!.width / 2 + 50,
    handleBox!.y + handleBox!.height / 2,
    { steps: 6 },
  );
  await page.mouse.up();
  const after = await page
    .getByRole("region", { name: "Navigation panel" })
    .boundingBox();
  expect(after!.width).toBeGreaterThan(before!.width);
  const resized = Number(await handle.getAttribute("aria-valuenow"));
  expect(resized).toBeGreaterThan(25);
  await handle.focus();
  await page.keyboard.press("End");
  await expect(handle).toHaveAttribute(
    "aria-valuenow",
    (await handle.getAttribute("aria-valuemax")) ?? "",
  );
  await page.keyboard.press("Home");
  await expect(handle).toHaveAttribute("aria-valuenow", "15");
  await page.getByLabel("Vertical").check();
  await expect(handle).toHaveAttribute("aria-orientation", "horizontal");
  await handle.focus();
  await page.keyboard.press("ArrowDown");
  await expect(handle).toHaveAttribute("aria-valuenow", "20");
  await page.getByLabel("Locked").check();
  await expect(handle).toHaveAttribute("aria-disabled", "true");
  await handle.press("ArrowDown");
  await expect(handle).toHaveAttribute("aria-valuenow", "20");
  await page.getByLabel("Locked").uncheck();
  await page.getByLabel("Vertical").uncheck();
  await page.getByLabel("RTL").check();
  await handle.focus();
  await page.keyboard.press("ArrowRight");
  await expect(handle).toHaveAttribute("aria-valuenow", "15");
  await page.getByLabel("Controlled").check();
  await handle.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(handle).toHaveAttribute("aria-valuenow", "20");
  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function SplitterExample", { exact: false }),
  ).toBeVisible();
});

test("Splitter remains usable on a touch-width screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:4177/components/splitter/");
  const root = page.getByTestId("splitter-example");
  const handle = page.getByRole("separator", {
    name: "Resize navigation and editor",
  });
  const box = await root.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  await handle.focus();
  await page.keyboard.press("ArrowRight");
  await expect(handle).toHaveAttribute("aria-valuenow", "30");
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});

test("Escape cancels a pointer drag and restores the initial sizes", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/splitter/");
  const handle = page.getByRole("separator", {
    name: "Resize navigation and editor",
  });
  await handle.scrollIntoViewIfNeeded();
  const box = await handle.boundingBox();
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  await page.mouse.down();
  await page.mouse.move(
    box!.x + box!.width / 2 + 55,
    box!.y + box!.height / 2,
    { steps: 5 },
  );
  await expect(handle).not.toHaveAttribute("aria-valuenow", "25");
  await page.keyboard.press("Escape");
  await expect(handle).toHaveAttribute("aria-valuenow", "25");
  await page.mouse.up();
});
