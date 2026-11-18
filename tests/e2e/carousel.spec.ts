import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Carousel navigates with keys and controls in both appearances", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/carousel/");
  const example = page.getByRole("region", { name: "Carousel example" });
  const carousel = example.getByRole("region", { name: "Project highlights" });
  await expect(
    carousel.getByRole("group", { name: "1 of 3: Plan" }),
  ).toBeVisible();
  await carousel.getByRole("button", { name: "Next slide" }).click();
  await expect(
    carousel.getByRole("group", { name: "2 of 3: Build" }),
  ).toBeVisible();
  await carousel.getByRole("button", { name: "Go to slide 3: Ship" }).click();
  await expect(
    carousel.getByRole("group", { name: "3 of 3: Ship" }),
  ).toBeVisible();
  await carousel.getByRole("button", { name: "Previous slide" }).press("Home");
  await expect(
    carousel.getByRole("group", { name: "1 of 3: Plan" }),
  ).toBeVisible();
  await carousel.getByRole("button", { name: "Pause autoplay" }).click();
  await expect(
    carousel.getByRole("button", { name: "Resume autoplay" }),
  ).toBeVisible();
  await example.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});

test("Carousel disables autoplay for reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.clock.install();
  await page.goto("http://127.0.0.1:4177/components/carousel/");
  const carousel = page.getByRole("region", { name: "Project highlights" });
  await expect(
    carousel.getByRole("group", { name: "1 of 3: Plan" }),
  ).toBeVisible();
  await page.clock.fastForward(6000);
  await expect(
    carousel.getByRole("group", { name: "1 of 3: Plan" }),
  ).toBeVisible();
  await expect(
    carousel.getByRole("button", { name: "Pause autoplay" }),
  ).toHaveCount(0);
});
