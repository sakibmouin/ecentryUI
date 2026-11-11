import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Color Picker edits alpha by keyboard and selects a swatch", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/color-picker/");
  const region = page.getByRole("region", { name: "Color picker example" });
  const hex = region.getByRole("textbox", { name: "Brand color hex" });
  await expect(hex).toHaveValue("#116E5EFF");
  const alpha = region.getByRole("slider", { name: /Alpha/ });
  await alpha.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(hex).not.toHaveValue("#116E5EFF");
  await region.getByRole("button", { name: "Select #C43843FF" }).click();
  await expect(hex).toHaveValue("#C43843FF");
  await expect(region.locator('input[name="brand"]')).toHaveValue("#C43843FF");
  await region.getByRole("button", { name: "Dark mode" }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(hex).toBeVisible();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
