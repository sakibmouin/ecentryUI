import { expect, test } from "@playwright/test";

test("Visually Hidden exposes text and reveals an explicitly configured focusable link", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/visually-hidden/");
  const status = page.getByText("Shipment status:");
  await expect(status).toHaveCSS("clip-path", "inset(50%)");
  const link = page.getByRole("link", { name: "Tracking help" });
  const wrapper = link.locator("xpath=..");
  await expect(wrapper).toHaveCSS("clip-path", "inset(50%)");
  await link.focus();
  await expect(wrapper).toHaveCSS("clip-path", "none");
});
