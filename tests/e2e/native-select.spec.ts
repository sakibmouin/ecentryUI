import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Native Select chooses options by pointer and keyboard and resets", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/native-select/");
  const region = page.getByRole("region", { name: "Native select example" });
  const select = region.getByRole("combobox", { name: "Country" });
  await expect(select).toHaveValue("bd");
  await select.selectOption("ca");
  await expect(select).toHaveValue("ca");
  await select.focus();
  await select.press("u");
  await expect(select).toHaveValue("us");
  await region.getByRole("button", { name: "Reset country" }).click();
  await expect(select).toHaveValue("bd");
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
