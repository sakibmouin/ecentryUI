import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Textarea edits, resets and stays accessible in both appearances", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/textarea/");
  const region = page.getByRole("region", { name: "Textarea example" });
  const feedback = region.getByRole("textbox", { name: "Feedback" });
  await expect(feedback).toHaveValue("The new design feels clear.");
  await feedback.fill("Updated feedback");
  await expect(feedback).toHaveValue("Updated feedback");
  await region.getByRole("button", { name: "Reset feedback" }).click();
  await expect(feedback).toHaveValue("The new design feels clear.");
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
