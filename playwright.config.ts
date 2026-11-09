import { defineConfig } from "@playwright/test";

const localChromium = process.env.ECENTRY_CHROMIUM_PATH;

export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    browserName: "chromium",
    headless: true,
    launchOptions: localChromium ? { executablePath: localChromium } : {},
  },
});
