import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Field labels inputs and resets native form state", async ({ page }) => {
  await page.goto("http://127.0.0.1:4177/components/field/");
  const region = page.getByRole("region", { name: "Field example" });
  const name = region.getByRole("textbox", { name: "Display name" });
  await expect(name).toHaveValue("Ada");
  await name.fill("Grace");
  await region.getByRole("button", { name: "Reset fields" }).click();
  await expect(name).toHaveValue("Ada");
  await expect(region.getByRole("textbox", { name: "Email" })).toHaveAttribute(
    "aria-invalid",
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
