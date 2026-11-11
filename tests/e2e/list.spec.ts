import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("List renders ordered and unordered items with RTL support", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/list/");
  await expect(
    page.getByRole("list", { name: "Project phases" }).locator("li"),
  ).toHaveCount(3);
  await expect(
    page.getByRole("list", { name: "Release steps" }),
  ).toHaveJSProperty("tagName", "OL");
  await expect(page.getByRole("list", { name: "Arabic steps" })).toHaveCSS(
    "direction",
    "rtl",
  );
  await page.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
