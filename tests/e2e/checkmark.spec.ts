import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Checkmark renders three decorative states beside visible labels", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/checkmark/");
  const example = page.getByRole("group", { name: "Checkmark states" });
  for (const state of ["checked", "mixed", "unchecked"]) {
    const mark = example.locator(`[data-state="${state}"]`);
    await expect(mark).toBeVisible();
    await expect(mark).toHaveAttribute("aria-hidden", "true");
  }
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      ({ impact }) => impact === "critical" || impact === "serious",
    ),
  ).toEqual([]);
});
