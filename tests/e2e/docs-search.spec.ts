import { expect, test } from "@playwright/test";

test("Docs search finds aliases, supports keyboard navigation, and links to generated type references", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:4177/");
  const search = page.getByRole("searchbox", { name: "Search docs" });
  await search.fill("wizard");
  await search.press("ArrowDown");
  const result = page
    .getByRole("list", { name: "Search results" })
    .getByRole("link", { name: "Steps" });
  await expect(result).toBeFocused();
  const bounds = await result.boundingBox();
  expect(bounds?.x).toBeGreaterThanOrEqual(0);
  expect((bounds?.x ?? 0) + (bounds?.width ?? 0)).toBeLessThanOrEqual(390);
  await result.press("Enter");
  await expect(page).toHaveURL(/components\/steps/);
  await expect(
    page.getByRole("heading", { name: "API reference" }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("region", { name: "StepsProps" })
      .getByRole("rowheader", { name: "onValueChange" }),
  ).toBeVisible();
  const manifestPath = "/registry/react/steps/0.1.0/manifest.json";
  await expect(
    page.getByRole("link", { name: "Registry source 0.1.0" }),
  ).toHaveAttribute("href", manifestPath);
  const manifest = await page.request.get(
    new URL(manifestPath, page.url()).toString(),
  );
  expect(manifest.ok()).toBe(true);
  expect(await manifest.json()).toMatchObject({
    id: "steps",
    version: "0.1.0",
  });
});
