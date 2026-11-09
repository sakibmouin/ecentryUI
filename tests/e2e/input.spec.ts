import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Input docs cover form interaction, states, themes and accessibility", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/input/");
  await expect(page.getByRole("heading", { name: "Input" })).toBeVisible();
  const preview = page.getByRole("region", { name: "Input examples" });
  const email = preview.getByRole("textbox", { name: "Email address" });
  await expect(email).toHaveCSS("min-height", "40px");
  await email.fill("ada@example.com");
  await preview.getByRole("button", { name: "Submit" }).click();
  await expect(preview.getByRole("status")).toHaveText(
    "Submitted: ada@example.com",
  );
  await expect(
    preview.getByRole("textbox", { name: "Invalid" }),
  ).toHaveAttribute("aria-invalid", "true");
  await expect(
    preview.getByRole("textbox", { name: "Disabled" }),
  ).toBeDisabled();
  await expect(
    preview.getByRole("textbox", { name: "Read only" }),
  ).toHaveAttribute("readonly", "");
  const lightAudit = await new AxeBuilder({ page }).analyze();
  expect(
    lightAudit.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    ),
  ).toEqual([]);
  await preview.getByRole("button", { name: "Dark mode" }).click();
  await expect(preview).toHaveCSS("background-color", "rgb(25, 33, 28)");
  const darkAudit = await new AxeBuilder({ page }).analyze();
  expect(
    darkAudit.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function InputExample", { exact: false }),
  ).toBeVisible();
});
