import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Tags Input adds, edits, removes and resets in both appearances", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/tags-input/");
  const region = page.getByRole("region", { name: "Tags input example" });
  const field = region.getByRole("textbox", { name: "Skills" });
  await field.fill("Accessibility");
  await field.press("Enter");
  await expect(
    region.getByRole("button", { name: "Remove Accessibility" }),
  ).toBeVisible();
  await region
    .getByRole("button", { name: "Accessibility, press F2 to edit" })
    .press("F2");
  await region
    .getByRole("textbox", { name: "Edit Accessibility" })
    .fill("A11y");
  await region
    .getByRole("textbox", { name: "Edit Accessibility" })
    .press("Enter");
  await expect(
    region.getByRole("button", { name: "Remove A11y" }),
  ).toBeVisible();
  await region.getByRole("button", { name: "Remove React" }).click();
  await region.getByRole("button", { name: "Reset tags" }).click();
  await expect(
    region.getByRole("button", { name: "Remove React" }),
  ).toBeVisible();
  await expect(region.getByRole("button", { name: "Remove A11y" })).toHaveCount(
    0,
  );
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
