import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Dialog traps focus, stacks nested content, and restores the trigger", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/dialog/");
  const preview = page.getByRole("region", { name: "Dialog examples" });
  const trigger = preview.getByRole("button", { name: "Open dialog" });
  await trigger.click();
  const outer = page.getByRole("dialog", { name: "Project settings" });
  await expect(outer).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect
    .poll(() =>
      page.evaluate(() =>
        document.activeElement
          ?.closest("dialog")
          ?.getAttribute("aria-labelledby"),
      ),
    )
    .toBe(await outer.getAttribute("aria-labelledby"));
  for (let index = 0; index < 8; index += 1) {
    await page.keyboard.press("Tab");
    await expect
      .poll(() =>
        page.evaluate(() =>
          document.activeElement
            ?.closest("dialog")
            ?.getAttribute("aria-labelledby"),
        ),
      )
      .toBe(await outer.getAttribute("aria-labelledby"));
  }
  const lightAudit = await new AxeBuilder({ page }).analyze();
  expect(
    lightAudit.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    ),
  ).toEqual([]);

  const innerTrigger = outer.getByRole("button", { name: "Advanced settings" });
  await innerTrigger.click();
  const inner = page.getByRole("dialog", { name: "Advanced settings" });
  await expect(inner).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(inner).toBeHidden();
  await expect(innerTrigger).toBeFocused();
  await expect(outer).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(outer).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("Dialog supports backdrop, controlled state, and dark appearance", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/dialog/");
  const preview = page.getByRole("region", { name: "Dialog examples" });
  await preview.getByRole("button", { name: "Dark mode" }).click();
  await expect(preview).toHaveCSS("background-color", "rgb(25, 33, 28)");
  const trigger = preview.getByRole("button", { name: "Controlled dialog" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Controlled dialog" });
  await expect(dialog).toBeVisible();
  const darkAudit = await new AxeBuilder({ page }).analyze();
  expect(
    darkAudit.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    ),
  ).toEqual([]);
  await dialog.getByRole("button", { name: "Close" }).click();
  await expect(dialog).toBeHidden();
  await trigger.click();
  await expect(dialog).toBeVisible();
  await page.mouse.click(5, 5);
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await page.getByRole("tab", { name: "Code" }).click();
  await expect(
    page.getByText("function DialogExample", { exact: false }),
  ).toBeVisible();
});
