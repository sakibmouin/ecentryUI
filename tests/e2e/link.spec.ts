import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Link navigates internally and marks external destinations safely", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/link/");
  const external = page.getByRole("link", { name: "React documentation" });
  await expect(external).toHaveAttribute("target", "_blank");
  await expect(external).toHaveAttribute("rel", /noopener noreferrer/);
  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("link", { name: "Button guide" }).click();
  await expect(page).toHaveURL(/\/components\/button\/$/);
});
