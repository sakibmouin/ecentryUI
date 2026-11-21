import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Progress shows determinate and indeterminate states", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/progress/");
  const region = page.getByRole("region", { name: "Progress example" });
  await expect(
    region.getByRole("progressbar", { name: "Upload" }),
  ).toHaveAttribute("aria-valuenow", "64");
  await expect(
    region.getByRole("progressbar", { name: "Syncing" }),
  ).not.toHaveAttribute("aria-valuenow");
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
