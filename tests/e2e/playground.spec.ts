import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Playground keeps controls, live preview, and copied source in sync", async ({
  context,
  page,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:4177/guides/playground/");
  const preview = page.getByRole("region", { name: "Button preview" });
  const code = page.getByRole("region", { name: "Button code" });
  const text = '<img src="preview-test">';
  await page.getByLabel("Button label").fill(text);
  await page.getByLabel("Variant").selectOption("outline");
  await page.getByLabel("Color").selectOption("danger");
  await page.getByLabel("Disabled").check();

  const button = preview.getByRole("button", { name: text });
  await expect(button).toBeDisabled();
  await expect(button).toHaveAttribute("data-ec-variant", "outline");
  await expect(button).toHaveAttribute("data-ec-color", "danger");
  await expect(preview.locator("img")).toHaveCount(0);
  await expect(code.locator("pre")).toContainText('variant="outline"');
  await expect(code.locator("pre")).toContainText(JSON.stringify(text));
  await code.getByRole("button", { name: "Copy code" }).click();
  await expect(code.getByRole("status")).toHaveText("Copied to clipboard.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    await code.locator("pre").innerText(),
  );

  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      ({ impact }) => impact === "critical" || impact === "serious",
    ),
  ).toEqual([]);
});
