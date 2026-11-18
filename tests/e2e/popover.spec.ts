import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Popover anchors, flips, closes outside and restores focus", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/popover/");
  const region = page.getByRole("region", { name: "Popover example" });
  const trigger = region.getByRole("button", { name: "Open details" });
  await trigger.click();
  const panel = region.getByRole("dialog", { name: "Project details" });
  await expect(panel).toBeVisible();
  const triggerBox = await trigger.boundingBox();
  const panelBox = await panel.boundingBox();
  expect(
    triggerBox &&
      panelBox &&
      (panelBox.y >= triggerBox.y + triggerBox.height ||
        panelBox.y + panelBox.height <= triggerBox.y),
  ).toBeTruthy();
  await panel.press("Escape");
  await expect(panel).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await region.getByRole("button", { name: "Open end aligned" }).click();
  await expect(
    region.getByRole("dialog", { name: "End aligned" }),
  ).toBeVisible();
  await region.getByRole("button", { name: "Dark mode" }).click();
  await expect(region.getByRole("dialog")).toHaveCount(0);
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
