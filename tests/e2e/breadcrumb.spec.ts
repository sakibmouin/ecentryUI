import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Breadcrumb navigates by keyboard and marks current page", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/breadcrumb/");
  const region = page.getByRole("region", { name: "Breadcrumb example" });
  const nav = region.getByRole("navigation", {
    name: "Breadcrumb",
    exact: true,
  });
  await expect(nav.getByRole("link", { name: "Home" })).toHaveAttribute(
    "href",
    "/",
  );
  await expect(nav.getByRole("link", { name: "Button" })).toHaveAttribute(
    "href",
    "/components/button/",
  );
  await expect(nav.locator('[aria-current="page"]')).toHaveText("Breadcrumb");
  await nav.getByRole("link", { name: "Home" }).focus();
  await page.keyboard.press("Tab");
  await expect(nav.getByRole("link", { name: "Button" })).toBeFocused();
  await region.getByRole("button", { name: "Dark mode" }).click();
  await expect(
    region.getByRole("navigation", { name: "RTL breadcrumb" }),
  ).toBeVisible();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await nav.getByRole("link", { name: "Button" }).click();
  await expect(page).toHaveURL("http://127.0.0.1:4177/components/button/");
  await expect(
    page.getByRole("heading", { name: "Button", exact: true }),
  ).toBeVisible();
});
