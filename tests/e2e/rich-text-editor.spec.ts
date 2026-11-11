import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("rich text editor formats and saves keyboard edits", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/rich-text-editor/");
  const editor = page.getByRole("textbox", { name: "Article body" });
  await expect(editor).toContainText("Write your story here.");
  await editor.click();
  await page.keyboard.press("ControlOrMeta+A");
  await page.keyboard.type("A safe draft");
  await expect(editor).toContainText("A safe draft");
  await expect(
    page
      .getByRole("region", { name: "Rich text editor example" })
      .locator("p[role=status]"),
  ).toHaveText("Saved");
  await editor.press("Escape");
  await expect(editor).not.toBeFocused();
  await page.getByRole("button", { name: "Dark mode" }).click();
  await expect(editor).toBeVisible();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
