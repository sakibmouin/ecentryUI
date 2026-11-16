import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Combobox filters, selects, resets and announces options", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/combobox/");
  const region = page.getByRole("region", { name: "Combobox example" });
  const country = region.getByRole("combobox", { name: "Country" });
  await expect(country).toHaveValue("Bangladesh");
  await country.focus();
  await country.fill("Can");
  await country.press("ArrowDown");
  await expect(country).toHaveAttribute("aria-activedescendant", /option-0/);
  await country.press("Enter");
  await expect(country).toHaveValue("Canada");
  await region.getByRole("button", { name: "Reset country" }).click();
  await expect(country).toHaveValue("Bangladesh");
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
