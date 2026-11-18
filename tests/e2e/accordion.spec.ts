import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Accordion expands, moves focus, and supports both appearances", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/accordion/");
  const region = page.getByRole("region", { name: "Accordion example" });
  const shipping = region.getByRole("button", {
    name: "When will my order ship?",
  });
  const returns = region.getByRole("button", { name: "Can I return an item?" });
  await expect(shipping).toHaveAttribute("aria-expanded", "true");
  await shipping.focus();
  await shipping.press("ArrowDown");
  await expect(returns).toBeFocused();
  await returns.press("Enter");
  await expect(returns).toHaveAttribute("aria-expanded", "true");
  await expect(shipping).toHaveAttribute("aria-expanded", "false");
  await region.getByRole("button", { name: "Multiple expansion" }).click();
  await returns.click();
  await expect(shipping).toHaveAttribute("aria-expanded", "true");
  await expect(returns).toHaveAttribute("aria-expanded", "true");
  await region.getByRole("button", { name: "Dark mode" }).click();
  await expect(returns).toHaveAttribute("aria-expanded", "true");
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
