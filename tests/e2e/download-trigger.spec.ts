import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Download Trigger downloads by keyboard and locks unavailable links", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/download-trigger/");
  const region = page.getByRole("region", { name: "Download trigger example" });
  const link = region.getByRole("link", { name: "Download example" });
  await link.focus();
  const download = page.waitForEvent("download");
  await page.keyboard.press("Space");
  expect((await download).suggestedFilename()).toBe("example.txt");
  await expect(region.getByText("Unavailable download")).toHaveAttribute(
    "aria-disabled",
    "true",
  );
  await expect(region.getByText("Preparing download")).toHaveAttribute(
    "aria-busy",
    "true",
  );
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
