import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Badge shows readable variants and loading in both appearances", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/badge/");
  const region = page.getByRole("region", { name: "Badge example" });
  for (const label of ["Draft", "Review", "Published", "Pending", "Failed"]) {
    await expect(region.getByText(label, { exact: true })).toBeVisible();
  }
  await expect(region.getByText("Syncing")).toHaveAttribute(
    "aria-busy",
    "true",
  );
  await region.getByRole("button", { name: "Dark mode" }).click();
  await expect(
    region.getByRole("button", { name: "Light mode" }),
  ).toBeVisible();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
