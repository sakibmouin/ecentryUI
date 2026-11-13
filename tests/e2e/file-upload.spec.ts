import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("File Upload picks, removes, and resets files", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/file-upload/");
  const region = page.getByRole("region", { name: "File upload example" });
  const input = region.locator("input[type=file]");
  await input.setInputFiles({
    name: "note.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("hello"),
  });
  await expect(region.getByText("note.txt")).toBeVisible();
  await region.getByRole("button", { name: "Remove note.txt" }).click();
  await expect(region.getByText("note.txt")).toHaveCount(0);
  await input.setInputFiles({
    name: "again.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("hello"),
  });
  await region.getByRole("button", { name: "Reset attachments" }).click();
  await expect(region.getByText("again.txt")).toHaveCount(0);
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
