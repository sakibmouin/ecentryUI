import { expect, test } from "@playwright/test";

test("Format Byte localizes the decimal separator and unit", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/format-byte/");
  await expect(page.getByText("Download size: 1.5 MB")).toBeVisible();
  await expect(page.locator('p[lang="fr"]')).toHaveText(/1,5\sMo/);
});
