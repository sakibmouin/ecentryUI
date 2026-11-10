import { expect, test } from "@playwright/test";
test("Heading renders semantic hierarchy", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/heading/");
  await expect(
    page.getByRole("heading", { name: "Make the hierarchy clear" }),
  ).toHaveJSProperty("tagName", "H2");
});
