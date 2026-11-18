import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Overlay Manager stacks dialogs and restores opener focus", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/overlay-manager/");
  const region = page.getByRole("region", { name: "Overlay manager example" });
  const trigger = region.getByRole("button", { name: "Open settings" });
  await trigger.click();
  const settings = page.getByRole("dialog", { name: "Project settings" });
  await expect(settings).toBeVisible();
  await settings.getByRole("button", { name: "Open advanced" }).click();
  const advanced = page.getByRole("dialog", { name: "Advanced settings" });
  await expect(advanced).toBeVisible();
  await advanced.press("Escape");
  await expect(advanced).not.toBeVisible();
  await expect(
    settings.getByRole("button", { name: "Open advanced" }),
  ).toBeFocused();
  await settings.press("Escape");
  await expect(settings).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
