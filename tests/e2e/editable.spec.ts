import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Editable saves, validates, cancels, and changes appearance", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/editable/");
  const region = page.getByRole("region", { name: "Editable example" });
  await region.getByRole("button", { name: /Edit Project title:/ }).click();
  const input = region.getByRole("textbox", { name: "Project title" });
  await input.fill("");
  await region.getByRole("button", { name: "Save" }).click();
  await expect(region.getByRole("alert")).toHaveText("Title is required");
  await input.fill("New title");
  await input.press("Enter");
  await expect(
    region.getByRole("button", { name: /Edit Project title:/ }),
  ).toHaveText("New title");
  await region.getByRole("button", { name: /Edit Project title:/ }).click();
  await region.getByRole("textbox", { name: "Project title" }).fill("Discard");
  await region.getByRole("textbox", { name: "Project title" }).press("Escape");
  await expect(
    region.getByRole("button", { name: /Edit Project title:/ }),
  ).toHaveText("New title");
  await expect(
    region.getByRole("button", { name: /Edit Read only title:/ }),
  ).toBeDisabled();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
