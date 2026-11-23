import { expect, test } from "@playwright/test";

test("For renders a fallback when the collection is empty", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/for/");
  const items = page.getByRole("list", { name: "Teams" }).getByRole("listitem");
  await expect(items).toHaveText(["Design", "Engineering"]);
  await page.getByRole("button", { name: "Clear teams" }).click();
  await expect(items).toHaveText(["No teams"]);
});
