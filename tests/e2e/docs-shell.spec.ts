import { expect, test } from "@playwright/test";

test("docs shell serves static routes and switches live example tabs", async ({
  page,
}) => {
  const staticPage = await page.request.get(
    "http://127.0.0.1:4177/guides/examples/",
  );
  expect(await staticPage.text()).toContain("Interactive preview");
  await page.goto("http://127.0.0.1:4177/");
  await expect(page).toHaveTitle(/ecentryUI/);
  await expect(
    page.getByRole("heading", { name: "Build with clarity" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Examples" }).first().click();
  await expect(page).toHaveURL(/\/guides\/examples\/$/);
  await page.getByRole("button", { name: "Count: 0" }).click();
  await expect(page.getByRole("button", { name: "Count: 1" })).toBeVisible();
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function CounterExample", { exact: false }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Button" }).first().click();
  await expect(page).toHaveURL(/\/components\/button\/$/);
  await expect(page.getByRole("heading", { name: "Button" })).toBeVisible();
});

test("docs navigation remains usable on a narrow screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:4177/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("link", { name: "Input" }).first().click();
  await expect(page).toHaveURL(/\/components\/input\/$/);
  await expect(page.getByRole("heading", { name: "Input" })).toBeVisible();
});

test("Example controls wait for hydration before accepting keyboard input", async ({
  page,
}) => {
  let loadClient = () => {};
  const clientReady = new Promise<void>((resolve) => {
    loadClient = resolve;
  });
  await page.route(/\/assets\/index-[\w-]+\.js$/, async (route) => {
    await clientReady;
    await route.continue();
  });
  const select = page.getByRole("button", { name: /^Favorite food / });
  try {
    await page.goto("http://127.0.0.1:4177/components/select/", {
      waitUntil: "commit",
    });
    const preview = page.locator(".example-preview");
    await expect(
      preview.getByText("Favorite food", { exact: true }),
    ).toBeVisible();
    await expect(preview).toHaveAttribute("inert", "");
    await expect(select).toHaveCount(0);
  } finally {
    loadClient();
  }
  await select.press("ArrowDown");
  await expect(select).toHaveAttribute("aria-expanded", "true");
});
