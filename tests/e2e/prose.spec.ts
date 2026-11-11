import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Prose styles semantic long form content responsively", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/prose/");
  const article = page.getByRole("article", { name: "Getting started guide" });
  await expect(article.getByRole("listitem")).toHaveCount(2);
  expect((await article.boundingBox())!.width).toBeLessThan(800);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(article).toBeVisible();
  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
