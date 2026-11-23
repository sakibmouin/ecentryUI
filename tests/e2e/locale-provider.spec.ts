import { expect, test } from "@playwright/test";

test("Locale Provider updates language, direction, and number formatting", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/locale-provider/");
  const sample = page.getByRole("region", { name: "Localized sample" });
  await expect(sample).toHaveText("1,234.5");
  await page.getByRole("button", { name: "Use Arabic" }).click();
  await expect(sample).toHaveAttribute("lang", "ar-EG");
  await expect(sample).toHaveAttribute("dir", "rtl");
  await expect(sample).toHaveText("١٬٢٣٤٫٥");
});
