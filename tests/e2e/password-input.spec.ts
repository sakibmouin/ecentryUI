import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Password Input reveals and resets its value", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/password-input/");
  const region = page.getByRole("region", { name: "Password input example" });
  const input = region.getByLabel("Password", { exact: true });
  await expect(input).toHaveAttribute("type", "password");
  await region.getByRole("button", { name: "Show password" }).click();
  await expect(input).toHaveAttribute("type", "text");
  await input.fill("changedpass");
  await region.getByRole("button", { name: "Reset password" }).click();
  await expect(input).toHaveValue("examplepass");
  await region.getByRole("button", { name: "Hide password" }).click();
  await expect(input).toHaveAttribute("type", "password");
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
