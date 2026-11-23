import { expect, test } from "@playwright/test";

test("Portal moves content between the destination and its inline source", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/portal/");
  const destination = page.getByRole("group", { name: "Destination" });
  const source = page.getByRole("group", { name: "Source" });
  await expect(destination.getByText("Traveling content")).toBeVisible();
  await page.getByRole("checkbox", { name: "Render inline" }).check();
  await expect(source.getByText("Traveling content")).toBeVisible();
  await expect(destination.getByText("Traveling content")).toHaveCount(0);
});
