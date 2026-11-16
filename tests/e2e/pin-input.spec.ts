import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Pin Input moves focus, pastes digits, masks and resets", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/pin-input/");
  const region = page.getByRole("region", { name: "Pin input example" });
  const first = region.getByLabel("Verification code, digit 1 of 4");
  const second = region.getByLabel("Verification code, digit 2 of 4");
  const third = region.getByLabel("Verification code, digit 3 of 4");
  await first.fill("9");
  await expect(second).toBeFocused();
  await third.evaluate((element) => {
    const data = new DataTransfer();
    data.setData("text", "345");
    element.dispatchEvent(
      new ClipboardEvent("paste", {
        bubbles: true,
        cancelable: true,
        clipboardData: data,
      }),
    );
  });
  await expect(region.locator('input[name="code"]')).toHaveValue("9234");
  await expect(region.getByLabel("Masked code, digit 1 of 4")).toHaveAttribute(
    "type",
    "password",
  );
  await region.getByRole("button", { name: "Reset codes" }).click();
  await expect(region.locator('input[name="code"]')).toHaveValue("12");
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
