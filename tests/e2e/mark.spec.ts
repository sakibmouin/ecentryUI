import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Mark renders semantic text with accessible contrast", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/mark/");
  await expect(page.locator(".code-demo mark")).toHaveText("important passage");
  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
