import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Slider handles RTL keys, range bounds, vertical keys and reset", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/slider/");
  const region = page.getByRole("region", { name: "Slider example" });
  const volume = region.getByRole("slider", { name: "Volume" });
  const start = region.getByRole("slider", { name: "Price range start" });
  const end = region.getByRole("slider", { name: "Price range end" });
  const height = region.getByRole("slider", { name: "Height" });
  await expect(volume).toHaveAttribute("aria-valuenow", "40");
  await volume.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(volume).toHaveAttribute("aria-valuenow", "50");
  await start.focus();
  await page.keyboard.press("End");
  await expect(start).toHaveAttribute("aria-valuenow", "80");
  await end.focus();
  await page.keyboard.press("Home");
  await expect(end).toHaveAttribute("aria-valuenow", "80");
  await height.focus();
  await page.keyboard.press("ArrowUp");
  await expect(height).toHaveAttribute("aria-valuenow", "40");
  const track = region
    .locator(".ec-slider--horizontal .ec-slider__track")
    .first();
  const box = await track.boundingBox();
  if (!box) throw new Error("Slider track missing");
  await page.mouse.click(box.x + box.width * 0.75, box.y + box.height / 2);
  await expect(volume).toHaveAttribute("aria-valuenow", "30");
  await region.getByRole("button", { name: "Reset sliders" }).click();
  await expect(volume).toHaveAttribute("aria-valuenow", "40");
  await expect(start).toHaveAttribute("aria-valuenow", "20");
  await expect(height).toHaveAttribute("aria-valuenow", "30");
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
