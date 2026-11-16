import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Rating supports fractional keys, pointer selection and reset", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/rating/");
  const region = page.getByRole("region", { name: "Rating example" });
  const slider = region.getByRole("slider", { name: "Product rating" });
  const previous = region.getByRole("slider", { name: "Previous rating" });
  await expect(slider).toHaveAttribute("aria-valuenow", "2.5");
  await slider.focus();
  await page.keyboard.press("ArrowRight");
  await expect(slider).toHaveAttribute("aria-valuenow", "3");
  const box = await slider.boundingBox();
  if (!box) throw new Error("Rating slider missing");
  await page.mouse.click(box.x + box.width * 0.9, box.y + box.height / 2);
  await expect(slider).toHaveAttribute("aria-valuenow", "4.5");
  await previous.focus();
  await page.keyboard.press("ArrowRight");
  await expect(previous).toHaveAttribute("aria-valuenow", "4.5");
  await region.getByRole("button", { name: "Reset rating" }).click();
  await expect(slider).toHaveAttribute("aria-valuenow", "2.5");
  await expect(region.locator('input[name="rating"]')).toHaveValue("2.5");
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
