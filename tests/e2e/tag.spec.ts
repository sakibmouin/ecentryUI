import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Tag can be dismissed with the keyboard and focus transfers to a valid control", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/tag/");
  const example = page.getByRole("region", { name: "Tag example" });
  const remove = example.getByRole("button", { name: "Remove Design" });
  await remove.focus();
  await remove.press("Enter");
  await expect(remove).toHaveCount(0);
  const restore = example.getByRole("button", { name: "Restore Design tag" });
  await expect(restore).toBeFocused();
  await restore.press("Space");
  await expect(remove).toBeVisible();
  await example.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      ({ impact }) => impact === "critical" || impact === "serious",
    ),
  ).toEqual([]);
});
