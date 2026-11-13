import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Fieldset groups native radios and resets their state", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/fieldset/");
  const region = page.getByRole("region", { name: "Fieldset example" });
  const group = region.getByRole("group", { name: "Notifications" });
  const email = group.getByRole("radio", { name: "Email" });
  const sms = group.getByRole("radio", { name: "SMS" });
  await expect(email).toBeChecked();
  await sms.check();
  await region.getByRole("button", { name: "Reset preferences" }).click();
  await expect(email).toBeChecked();
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
