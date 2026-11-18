import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Alert displays semantic variants, loading, and dismissal", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/alert/");
  const region = page.getByRole("region", { name: "Alert example" });
  await expect(
    region.getByRole("status", { name: "Update available" }),
  ).toBeVisible();
  await expect(
    region.getByRole("status", { name: "Changes saved" }),
  ).toBeVisible();
  await expect(
    region.getByRole("alert", { name: "Review required" }),
  ).toBeVisible();
  await expect(
    region.getByRole("alert", { name: "Upload failed" }),
  ).toBeVisible();
  await expect(
    region.getByRole("status", { name: "Uploading" }),
  ).toHaveAttribute("aria-busy", "true");
  await region.getByRole("button", { name: "Dismiss alert" }).click();
  await expect(
    region.getByRole("alert", { name: "Upload failed" }),
  ).toHaveCount(0);
  await expect(
    region.getByRole("button", { name: "Show error" }),
  ).toBeFocused();
  await region.getByRole("button", { name: "Show error" }).click();
  await expect(
    region.getByRole("alert", { name: "Upload failed" }),
  ).toBeVisible();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
