import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Color Swatch selects by label, keyboard and resets", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/color-swatch/");
  const region = page.getByRole("region", { name: "Color swatch example" });
  const teal = region.getByRole("radio", { name: "Teal" });
  const red = region.getByRole("radio", { name: "Red" });
  await expect(teal).toBeChecked();
  await region.getByText("Warm accent").click();
  await expect(red).toBeChecked();
  await red.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(teal).toBeChecked();
  await red.check();
  await region.getByRole("button", { name: "Reset color" }).click();
  await expect(teal).toBeChecked();
  await expect(
    region.getByRole("radio", { name: "Unavailable" }),
  ).toBeDisabled();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
