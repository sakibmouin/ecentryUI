import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Listbox selects across groups, typeaheads and resets", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/listbox/");
  const region = page.getByRole("region", { name: "Listbox example" });
  const favorite = region.getByRole("listbox", { name: "Favorite food" });
  await favorite.focus();
  await favorite.press("c");
  await expect(favorite).toHaveAttribute("aria-activedescendant", /option-3/);
  await favorite.press("Enter");
  await expect(
    favorite.getByRole("option", { name: "Celery" }),
  ).toHaveAttribute("aria-selected", "true");
  const shopping = region.getByRole("listbox", { name: "Shopping list" });
  await shopping.getByRole("option", { name: "Apple" }).click();
  await expect(shopping.getByRole("option", { name: "Apple" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await region.getByRole("button", { name: "Reset choices" }).click();
  await expect(favorite.getByRole("option", { name: "Apple" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
