import { expect, test } from "@playwright/test";

test("Environment Provider resolves the preview's shadow root", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/environment-provider/");
  await page.getByRole("button", { name: "Check root" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Shadow root" }),
  ).toBeVisible();
});
