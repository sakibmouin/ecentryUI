import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Select chooses grouped options and resets in both appearances", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/select/");
  const region = page.getByRole("region", { name: "Select example" });
  const food = region.getByRole("button", { name: /^Favorite food / });
  await food.press("ArrowDown");
  await expect(food).toHaveAttribute("aria-expanded", "true");
  await food.press("End");
  await food.press("Enter");
  await expect(food).toContainText("Celery");
  const shopping = region.getByRole("button", { name: /Shopping list/ });
  await shopping.click();
  await region.getByRole("option", { name: "Apple" }).click();
  await expect(shopping).toContainText("Apple");
  await shopping.press("Escape");
  await region.getByRole("button", { name: "Reset order" }).click();
  await expect(food).toContainText("Apple");
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
