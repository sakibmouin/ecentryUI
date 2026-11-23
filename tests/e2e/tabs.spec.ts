import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Tabs supports manual activation and vertical navigation in the dark appearance", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/tabs/");
  const example = page.getByRole("region", { name: "Tabs example" });
  const overview = example.getByRole("tab", { name: "Overview" });
  const members = example.getByRole("tab", { name: "Members" });
  await overview.focus();
  await overview.press("ArrowRight");
  await expect(members).toHaveAttribute("aria-selected", "true");
  await expect(
    example.getByRole("tabpanel", { name: "Members" }),
  ).toBeVisible();
  await example.getByRole("checkbox", { name: "Manual activation" }).check();
  await example.getByRole("checkbox", { name: "Vertical layout" }).check();
  await example.getByRole("button", { name: "Dark mode" }).click();
  await members.focus();
  await members.press("ArrowUp");
  await expect(overview).toBeFocused();
  await expect(members).toHaveAttribute("aria-selected", "true");
  await overview.press("Space");
  await expect(
    example.getByRole("tabpanel", { name: "Overview" }),
  ).toBeVisible();

  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      ({ impact }) => impact === "critical" || impact === "serious",
    ),
  ).toEqual([]);
});
