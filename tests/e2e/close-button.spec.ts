import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Close Button dismisses content and exposes disabled states", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/close-button/");
  const region = page.getByRole("region", { name: "Close button example" });
  await region.getByRole("button", { name: "Close", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(region.getByText("Note dismissed")).toBeVisible();
  await expect(
    region.getByRole("button", { name: "Unavailable close" }),
  ).toBeDisabled();
  await expect(region.getByRole("button", { name: "Closing" })).toHaveAttribute(
    "aria-busy",
    "true",
  );
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
