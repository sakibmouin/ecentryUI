import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Timeline maintains event order and exposes current status in both appearances", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/timeline/");
  const example = page.getByRole("region", { name: "Timeline example" });
  const entries = example
    .getByRole("list", { name: "Shipment history" })
    .getByRole("listitem");
  await expect(entries).toHaveCount(3);
  await expect(entries.first()).toContainText("Order received");
  await expect(entries.last()).toHaveAttribute("aria-current", "true");
  await expect(entries.last().locator("time")).toHaveAttribute(
    "datetime",
    "2026-11-22",
  );
  await example.getByRole("button", { name: "Dark mode" }).click();
  await expect(entries.last()).toContainText("Currently in transit");
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      ({ impact }) => impact === "critical" || impact === "serious",
    ),
  ).toEqual([]);
});
