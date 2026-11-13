import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Number Input steps, scrubs, and resets", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/number-input/");
  const region = page.getByRole("region", { name: "Number input example" });
  const input = region.getByRole("spinbutton", { name: "Quantity" });
  await expect(input).toHaveValue("2");
  await region.getByRole("button", { name: "Increase Quantity" }).click();
  await expect(input).toHaveValue("3");
  const scrub = region.getByRole("slider", { name: "Scrub Quantity" });
  await scrub.focus();
  await page.keyboard.press("ArrowRight");
  await expect(input).toHaveValue("4");
  const box = await scrub.boundingBox();
  if (!box) throw new Error("Scrub handle missing");
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 32, box.y + box.height / 2);
  await page.mouse.up();
  await expect(input).toHaveValue("6");
  await region.getByRole("button", { name: "Reset quantity" }).click();
  await expect(input).toHaveValue("2");
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
