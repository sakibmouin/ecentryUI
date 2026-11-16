import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Radio Card selects by card and keyboard and resets", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/radio-card/");
  const region = page.getByRole("region", { name: "Radio card example" });
  const standard = region.getByRole("radio", { name: "Standard" });
  const express = region.getByRole("radio", { name: "Express" });
  await expect(standard).toBeChecked();
  await region.getByText("Next business day").click();
  await expect(express).toBeChecked();
  await express.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(standard).toBeChecked();
  await express.check();
  await region.getByRole("button", { name: "Reset shipping" }).click();
  await expect(standard).toBeChecked();
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
