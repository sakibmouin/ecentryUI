import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Checkbox Card activates across its label and resets in a form", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/checkbox-card/");
  const region = page.getByRole("region", { name: "Checkbox card example" });
  const input = region.getByRole("checkbox", { name: "Priority support" });
  await region.getByText("Get help from our team sooner").click();
  await expect(input).toBeChecked();
  await input.focus();
  await page.keyboard.press("Space");
  await expect(input).not.toBeChecked();
  await region.getByRole("button", { name: "Reset options" }).click();
  await expect(input).not.toBeChecked();
  await expect(
    region.getByRole("checkbox", { name: "Unavailable option" }),
  ).toBeDisabled();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
