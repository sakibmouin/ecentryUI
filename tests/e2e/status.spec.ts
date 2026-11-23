import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Status updates its live label in both appearances", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/status/");
  const region = page.getByRole("region", { name: "Status example" });
  const status = region.getByRole("status");
  await expect(status).toHaveText("Operational");
  await region.getByRole("button", { name: "Set offline" }).click();
  await expect(status).toHaveText("Offline");
  await region.getByRole("button", { name: "Dark mode" }).click();
  await expect(region.locator("xpath=..")).toHaveAttribute(
    "data-ec-theme",
    "dark",
  );
  await region.getByRole("button", { name: "Set online" }).click();
  await expect(status).toHaveText("Operational");
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      ({ impact }) => impact === "critical" || impact === "serious",
    ),
  ).toEqual([]);
});
