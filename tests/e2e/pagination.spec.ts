import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Pagination navigates by pointer and keyboard in both appearances", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/pagination/");
  const region = page.getByRole("region", { name: "Pagination example" });
  await region.getByRole("button", { name: "Next page" }).click();
  await expect(region.getByRole("button", { name: "Page 5" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await region.getByRole("button", { name: "Page 6" }).focus();
  await page.keyboard.press("Enter");
  await expect(region.getByText("Showing page 6 of 12")).toBeVisible();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
