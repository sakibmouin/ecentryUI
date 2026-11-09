import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "packages/**/*.test.{ts,tsx}",
      "tests/unit/**/*.test.ts",
      "tests/workspace.test.ts",
    ],
  },
});
