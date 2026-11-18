import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Card presents labelled content, loading state, and a working action", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/card/");
  const region = page.getByRole("region", { name: "Card example" });
  const notes = region.getByRole("article", { name: "Release notes" });
  await expect(notes).toContainText(
    "New component guidance is ready for review.",
  );
  await expect(
    region.getByRole("article", { name: "Activity" }),
  ).toHaveAttribute("aria-busy", "true");
  await region.getByRole("button", { name: "Dark mode" }).click();
  await expect(
    region.getByRole("button", { name: "Light mode" }),
  ).toBeVisible();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await notes.getByRole("link", { name: "Read button guide" }).click();
  await expect(page).toHaveURL("http://127.0.0.1:4177/components/button/");
});
