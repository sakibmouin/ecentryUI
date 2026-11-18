import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Tooltip appears on hover and focus and dismisses on Escape", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/tooltip/");
  const region = page.getByRole("region", { name: "Tooltip example" });
  const trigger = region.getByRole("button", { name: "Version history" });
  await trigger.hover();
  const tip = region.getByRole("tooltip");
  await expect(tip).toBeVisible();
  await trigger.focus();
  await expect(trigger).toHaveAttribute(
    "aria-describedby",
    (await tip.getAttribute("id")) ?? "",
  );
  await trigger.press("Escape");
  await expect(tip).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
