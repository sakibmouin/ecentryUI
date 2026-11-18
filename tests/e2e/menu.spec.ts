import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Menu navigates nested items and supports context opening", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/menu/");
  const region = page.getByRole("region", { name: "Menu example" });
  const trigger = region.getByRole("button", { name: "File actions" });
  await trigger.click();
  const menu = region.getByRole("menu", { name: "File actions" });
  await expect(menu.getByRole("menuitem", { name: "Open" })).toBeFocused();
  await menu.getByRole("menuitem", { name: "Open" }).press("ArrowDown");
  await expect(menu.getByRole("menuitem", { name: /Export/ })).toBeFocused();
  await menu.getByRole("menuitem", { name: /Export/ }).press("ArrowRight");
  const submenu = region.getByRole("menu", { name: "Export submenu" });
  await expect(submenu.getByRole("menuitem", { name: "PDF" })).toBeFocused();
  await submenu.getByRole("menuitem", { name: "PDF" }).click();
  await expect(region.getByText("Exported PDF")).toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click({ button: "right" });
  await expect(menu).toHaveAttribute("data-context", "true");
  await menu.getByRole("menuitem", { name: "Open" }).press("Escape");
  await expect(menu).toHaveCount(0);
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
