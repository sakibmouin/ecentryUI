import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Clipboard copies, reports failures, and supports appearance", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("http://127.0.0.1:4177/components/clipboard/");
  const region = page.getByRole("region", { name: "Clipboard example" });
  await region.getByRole("button", { name: "Copy" }).first().click();
  await expect(region.getByRole("status").first()).toHaveText("Copied");
  await expect(
    region.getByRole("button", { name: "Copy" }).first(),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "https://ecentry.dev",
  );
  await expect(
    region.getByRole("button", { name: "Copy" }).nth(1),
  ).toBeDisabled();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
