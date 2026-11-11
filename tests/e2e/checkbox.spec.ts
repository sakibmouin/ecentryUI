import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Checkbox activates by label and keyboard and resets with the form", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/checkbox/");
  const region = page.getByRole("region", { name: "Checkbox example" });
  const input = region.getByRole("checkbox", { name: "Email updates" });
  await expect(input).toBeChecked();
  await region.getByText("Email updates").click();
  await expect(input).not.toBeChecked();
  await input.focus();
  await page.keyboard.press("Space");
  await expect(input).toBeChecked();
  await region.getByRole("button", { name: "Reset preferences" }).click();
  await expect(input).toBeChecked();
  await expect(
    region.getByRole("checkbox", { name: "Disabled option" }),
  ).toBeDisabled();
  const readOnly = region.getByRole("checkbox", { name: "Read-only option" });
  await readOnly.click();
  await expect(readOnly).toBeChecked();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
