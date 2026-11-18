import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Empty State exposes an action, compact state, and loading feedback", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/empty-state/");
  const region = page.getByRole("region", { name: "Empty State example" });
  await expect(
    region.getByRole("heading", { name: "No projects yet" }),
  ).toBeVisible();
  await expect(
    region.getByRole("heading", { name: "No search results" }),
  ).toBeVisible();
  await expect(region.getByRole("status", { name: "" })).toHaveText("Loading");
  await region.getByRole("button", { name: "Create project" }).click();
  await expect(region.getByRole("status", { name: "" }).first()).toHaveText(
    "Project created",
  );
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
