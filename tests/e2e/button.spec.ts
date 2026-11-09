import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Button docs preview covers variants, focus and loading", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/button/");
  await expect(page.getByRole("heading", { name: "Button" })).toBeVisible();
  const preview = page.getByRole("region", { name: "Button examples" });
  const solid = preview.getByRole("button", { name: "Save changes" });
  await expect(solid).toHaveCSS("background-color", "rgb(17, 110, 94)");
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    ),
  ).toEqual([]);
  await preview.getByRole("button", { name: "Toggle loading" }).click();
  await expect(preview.getByRole("button", { name: /Saving/ })).toBeDisabled();
  await preview.getByRole("button", { name: "Dark mode" }).click();
  await expect(preview).toHaveCSS("background-color", "rgb(25, 33, 28)");
  await expect(solid).toHaveCSS("background-color", "rgb(215, 243, 235)");
  const darkAudit = await new AxeBuilder({ page }).analyze();
  expect(
    darkAudit.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    ),
  ).toEqual([]);
  await page.reload();
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus-visible")).toHaveCount(1);
  await expect(preview.getByRole("button", { name: "Delete" })).toHaveAttribute(
    "data-ec-color",
    "danger",
  );
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function ButtonExample", { exact: false }),
  ).toBeVisible();
});
