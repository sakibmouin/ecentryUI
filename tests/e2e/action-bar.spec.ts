import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Action Bar manages focus, keyboard movement and dismissal", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/action-bar/");
  const region = page.getByRole("region", { name: "Action bar example" });
  const trigger = region.getByRole("button", {
    name: "Show actions for 3 items",
  });
  await trigger.click();
  const toolbar = region.getByRole("toolbar", { name: "Selected items" });
  await expect(toolbar).toBeVisible();
  await expect(toolbar.getByRole("button", { name: "Archive" })).toBeFocused();
  await toolbar.getByRole("button", { name: "Archive" }).press("ArrowRight");
  await expect(toolbar.getByRole("button", { name: "Share" })).toBeFocused();
  await toolbar.getByRole("button", { name: "Share" }).press("Escape");
  await expect(toolbar).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await toolbar.getByRole("button", { name: "Archive" }).click();
  await expect(region.getByText("Archived 3 items")).toBeVisible();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
