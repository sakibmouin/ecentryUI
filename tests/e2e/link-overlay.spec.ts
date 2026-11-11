import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Link Overlay activates the card while preserving its button", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/link-overlay/");
  const card = page.getByTestId("link-card");
  await card.getByRole("button", { name: "Save" }).click();
  await expect(card.getByRole("button", { name: "Saved" })).toBeVisible();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await card.getByRole("link", { name: "Button guide" }).click();
  await expect(page).toHaveURL(/\/components\/button\/$/);
});
