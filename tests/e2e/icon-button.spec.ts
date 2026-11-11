import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Icon Button toggles from keyboard and announces its state", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/icon-button/");
  const region = page.getByRole("region", { name: "Icon button example" });
  const favorite = region.getByRole("button", { name: "Add favorite" });
  await favorite.focus();
  await page.keyboard.press("Space");
  await expect(
    region.getByRole("button", { name: "Remove favorite" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(region.getByRole("status")).toHaveText("Favorited");
  await expect(
    region.getByRole("button", { name: "Unavailable favorite" }),
  ).toBeDisabled();
  await expect(
    region.getByRole("button", { name: "Saving favorite" }),
  ).toHaveAttribute("aria-busy", "true");
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
