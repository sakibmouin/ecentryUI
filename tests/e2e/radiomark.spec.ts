import { expect, test } from "@playwright/test";

test("Radiomark renders decorative selected and unselected indicators", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/radiomark/");
  const group = page.getByRole("group", { name: "Radiomark states" });
  await expect(group.locator('[data-state="checked"]')).toBeVisible();
  await expect(group.locator('[data-state="unchecked"]')).toBeVisible();
  await expect(group.getByRole("radio")).toHaveCount(0);
});
