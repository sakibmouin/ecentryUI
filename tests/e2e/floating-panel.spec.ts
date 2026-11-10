import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Floating Panel opens, moves, resizes, changes stage, and restores focus", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/floating-panel/");
  const trigger = page.getByRole("button", { name: "Open floating panel" });
  await trigger.click();
  const panel = page.getByRole("dialog", { name: "Workspace notes" });
  await expect(panel).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const initial = await panel.boundingBox();
  const move = panel.getByRole("button", { name: "Move panel" });
  await move.focus();
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(async () => (await panel.boundingBox())?.x)
    .toBe(initial!.x + 10);
  const handle = await move.boundingBox();
  const beforeDrag = await panel.boundingBox();
  await page.mouse.move(
    handle!.x + handle!.width / 2,
    handle!.y + handle!.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    handle!.x + handle!.width / 2 + 24,
    handle!.y + handle!.height / 2 + 16,
  );
  await page.mouse.up();
  await expect
    .poll(async () => (await panel.boundingBox())?.x)
    .toBe(beforeDrag!.x + 24);
  const resize = panel.getByRole("button", { name: "Resize panel" });
  await resize.focus();
  const size = await panel.boundingBox();
  await page.keyboard.press("ArrowDown");
  await expect
    .poll(async () => (await panel.boundingBox())?.height)
    .toBe(size!.height + 10);
  await panel.getByRole("button", { name: "Minimize" }).click();
  await expect(panel).toHaveAttribute("data-stage", "minimized");
  await expect(panel.getByText("Keep ideas in view")).toBeHidden();
  await panel.getByRole("button", { name: "Maximize" }).click();
  await expect(panel).toHaveAttribute("data-stage", "maximized");
  await panel.getByRole("button", { name: "Restore" }).click();
  await expect(panel).toHaveAttribute("data-stage", "default");
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("Floating Panel opens fully within a mobile viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:4177/components/floating-panel/");
  await page.getByRole("button", { name: "Open floating panel" }).click();
  const panel = page.getByRole("dialog", { name: "Workspace notes" });
  const bounds = await panel.boundingBox();
  expect(bounds).not.toBeNull();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(390);
  expect(bounds!.y).toBeGreaterThanOrEqual(0);
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(844);
});

test("Floating Panel follows appearance in its portal and remains accessible", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/floating-panel/");
  const preview = page.getByRole("region", { name: "Floating Panel examples" });
  await preview.getByRole("button", { name: "Dark mode" }).click();
  await preview.getByRole("button", { name: "Open floating panel" }).click();
  const panel = page.getByRole("dialog", { name: "Workspace notes" });
  await expect(panel).toHaveCSS("background-color", "rgb(16, 23, 19)");
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await panel.getByRole("button", { name: "Close panel" }).click();
  await expect(panel).toBeHidden();
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function FloatingPanelExample", { exact: false }),
  ).toBeVisible();
});
