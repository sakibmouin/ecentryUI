import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Switch toggles, resets and stays accessible in both appearances", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/switch/");
  const region = page.getByRole("region", { name: "Switch example" });
  const email = region.getByRole("switch", { name: "Email notifications" });
  await expect(email).toBeChecked();
  await email.press("Space");
  await expect(email).not.toBeChecked();
  await region.getByRole("button", { name: "Reset switches" }).click();
  await expect(email).toBeChecked();
  await expect(
    region.getByRole("switch", { name: "SMS notifications" }),
  ).toBeDisabled();
  await region.getByRole("button", { name: "Dark mode" }).click();
  await expect(region).toHaveCSS("background-color", "rgb(25, 33, 28)");
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
