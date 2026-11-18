import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Collapsible toggles with keyboard and supports controlled state", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/collapsible/");
  const region = page.getByRole("region", { name: "Collapsible example" });
  const trigger = region.getByRole("button", { name: "Order details" });
  await expect(
    region.getByRole("region", { name: "Order details" }),
  ).toBeVisible();
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Space");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await region.getByRole("button", { name: "Open details" }).click();
  await expect(
    region.getByRole("region", { name: "Controlled details" }),
  ).toBeVisible();
  await expect(
    region.getByRole("button", { name: "Unavailable details" }),
  ).toBeDisabled();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
