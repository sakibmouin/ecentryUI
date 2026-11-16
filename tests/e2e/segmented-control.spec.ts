import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Segmented Control selects by label and keys then resets", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/segmented-control/");
  const region = page.getByRole("region", {
    name: "Segmented control example",
  });
  const day = region.getByRole("radio", { name: "Day" });
  const week = region.getByRole("radio", { name: "Week" });
  await expect(day).toBeChecked();
  await region.getByText("Week", { exact: true }).click();
  await expect(week).toBeChecked();
  await week.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(day).toBeChecked();
  await week.check();
  await region.getByRole("button", { name: "Reset range" }).click();
  await expect(day).toBeChecked();
  await expect(region.getByRole("radio", { name: "Month" })).toBeDisabled();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
