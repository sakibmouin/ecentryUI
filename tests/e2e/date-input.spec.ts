import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Date Input accepts an ISO date and resets within a form", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/date-input/");
  const region = page.getByRole("region", { name: "Date input example" });
  const input = region.getByLabel("Departure date");
  await expect(input).toHaveValue("2026-11-12");
  await input.fill("2026-11-16");
  await expect(input).toHaveValue("2026-11-16");
  await region.getByRole("button", { name: "Reset dates" }).click();
  await expect(input).toHaveValue("2026-11-12");
  await expect(region.getByLabel("Unavailable date")).toBeDisabled();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
