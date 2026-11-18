import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Avatar shows image, fallback, busy state, and dark appearance", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/avatar/");
  const region = page.getByRole("region", { name: "Avatar example" });
  await expect(
    region.getByRole("img", { name: "Ada Lovelace" }).locator("img"),
  ).toBeVisible();
  await expect(region.getByRole("img", { name: "Grace Hopper" })).toHaveText(
    "GH",
  );
  await expect(
    region.getByRole("img", { name: "Loading profile" }),
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
});
