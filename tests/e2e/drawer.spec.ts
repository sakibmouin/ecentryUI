import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Drawer locks scroll, restores focus and supports placements", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/drawer/");
  const region = page.getByRole("region", { name: "Drawer example" });
  const trigger = region.getByRole("button", { name: "Open settings drawer" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Project settings" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("data-ec-placement", "right");
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(
    dialog.getByRole("button", { name: "Close Project settings" }),
  ).toBeFocused();
  await dialog.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await region.getByRole("button", { name: "Open bottom drawer" }).click();
  const bottom = page.getByRole("dialog", { name: "Quick filters" });
  await expect(bottom).toHaveAttribute("data-ec-placement", "bottom");
  await bottom.getByRole("button", { name: "Close Quick filters" }).click();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
