import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Radio selects by label and arrow key and resets", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/radio/");
  const region = page.getByRole("region", { name: "Radio example" });
  const basic = region.getByRole("radio", { name: "Basic" });
  const pro = region.getByRole("radio", { name: "Pro" });
  await expect(basic).toBeChecked();
  await region.getByText("For teams").click();
  await expect(pro).toBeChecked();
  await pro.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(basic).toBeChecked();
  await pro.check();
  await region.getByRole("button", { name: "Reset plan" }).click();
  await expect(basic).toBeChecked();
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
