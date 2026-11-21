import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("QR Code renders a labelled scannable symbol", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/qr-code/");
  const region = page.getByRole("region", { name: "QR Code example" });
  const symbol = region.getByRole("img", { name: "Open ecentryUI website" });
  await expect(symbol.locator("path")).toHaveAttribute("d", /^M/);
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
