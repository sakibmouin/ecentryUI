import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Steps keeps focus during navigation and supports vertical layout", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:4177/components/steps/");
  const example = page.getByRole("region", { name: "Steps example" });
  const review = example.getByRole("button", { name: "Review" });
  await expect(review).toBeDisabled();
  const next = example.getByRole("button", { name: "Next" });
  await next.click();
  await expect(next).toBeFocused();
  await expect(example.getByText("Choose a delivery method.")).toBeVisible();

  await example.getByRole("checkbox", { name: "Vertical layout" }).check();
  await example.getByRole("button", { name: "Dark mode" }).click();
  expect(await example.locator("xpath=..").getAttribute("data-ec-theme")).toBe(
    "dark",
  );
  const delivery = example.getByRole("button", { name: "Delivery" });
  await delivery.focus();
  await delivery.press("ArrowDown");
  await expect(review).toBeFocused();
  await review.press("Enter");
  await expect(review).toHaveAttribute("aria-current", "step");
  await expect(example.getByText("Review your order.")).toBeVisible();

  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      ({ impact }) => impact === "critical" || impact === "serious",
    ),
  ).toEqual([]);
});
