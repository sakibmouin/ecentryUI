import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Marquee pauses and resumes", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/marquee/");
  const region = page.getByRole("region", { name: "Marquee example" });
  await region.getByRole("button", { name: "Pause animation" }).click();
  await expect(region.locator(".ec-marquee")).toHaveAttribute(
    "data-paused",
    "true",
  );
  await region.getByRole("button", { name: "Resume animation" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
