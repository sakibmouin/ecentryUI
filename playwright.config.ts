import { defineConfig } from "@playwright/test";

const localChromium = process.env.ECENTRY_CHROMIUM_PATH;

export default defineConfig({
  testDir: "./tests/e2e",
  webServer: {
    command: "npm run preview --workspace @ecentry/docs -- --port 4177",
    url: "http://127.0.0.1:4177/",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  use: {
    browserName: "chromium",
    headless: true,
    launchOptions: localChromium ? { executablePath: localChromium } : {},
  },
});
