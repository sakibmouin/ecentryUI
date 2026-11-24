import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Hover Card opens by pointer and keyboard and closes on Escape", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/hover-card/");
  const region = page.getByRole("region", { name: "Hover card example" });
  const trigger = region.getByRole("button", { name: "Meet the team" });
  await trigger.hover();
  const card = region.getByRole("dialog", { name: "Design team" });
  await expect(card).toBeVisible();
  await trigger.focus();
  await trigger.press("ArrowDown");
  await expect(
    card.getByRole("link", { name: "Read team details" }),
  ).toBeFocused();
  await card.press("Escape");
  await expect(card).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});

test("Hover Card stays open when the pointer leaves keyboard-focused content", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("http://127.0.0.1:4177/components/hover-card/");
  const example = page.getByRole("region", { name: "Hover card example" });
  const trigger = example.getByRole("button", { name: "Meet the team" });
  await trigger.hover();
  await expect(
    example.getByRole("dialog", { name: "Design team" }),
  ).toBeVisible();
  await trigger.press("ArrowDown");
  const link = example.getByRole("link", { name: "Read team details" });
  await expect(link).toBeFocused();
  await page.getByRole("heading", { name: "Hover Card", exact: true }).hover();
  await page.clock.runFor(250);
  await expect(link).toBeFocused();
  await link.press("Escape");
  await expect(trigger).toBeFocused();
});
