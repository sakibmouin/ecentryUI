import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Command searches grouped results and selects by keyboard", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/command/");
  const region = page.getByRole("region", { name: "Command example" });
  const input = region.getByRole("combobox", { name: "Quick actions" });
  await expect(region.getByRole("group", { name: "Files" })).toBeVisible();
  await input.fill("theme");
  await expect(region.getByRole("group", { name: "Files" })).toHaveCount(0);
  await input.press("ArrowDown");
  await expect(input).toHaveAttribute("aria-activedescendant", /option-0/);
  await input.press("Enter");
  await expect(region.getByText("Selected: Toggle theme")).toBeVisible();
  await input.press("Escape");
  await expect(input).toHaveValue("");
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
