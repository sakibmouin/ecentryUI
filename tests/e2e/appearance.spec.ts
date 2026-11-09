import { build } from "esbuild";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { expect, test } from "@playwright/test";
import { App } from "../fixtures/appearance-client.js";
import { AppearanceProvider } from "@ecentry/foundations/react";

test("SSR appearance matches the first paint and persists after hydration", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.emulateMedia({ colorScheme: "dark" });

  const bundle = await build({
    entryPoints: ["tests/fixtures/appearance-client.tsx"],
    bundle: true,
    write: false,
    format: "iife",
    platform: "browser",
    jsx: "automatic",
  });
  const html = `<!doctype html><html><body><div id="root">${renderToString(createElement(App))}</div></body></html>`;
  await page.route("http://ecentry.test/", (route) =>
    route.fulfill({ contentType: "text/html", body: html }),
  );
  await page.goto("http://ecentry.test/");

  const surface = page.locator("#surface");
  const scope = surface.locator("xpath=ancestor::*[@data-ec-scope][1]");
  await expect(scope).toHaveAttribute("data-ec-theme", "dark");
  await expect(surface).toHaveCSS("background-color", "rgb(16, 23, 19)");

  await page.addScriptTag({ content: bundle.outputFiles[0]!.text });
  await expect(page.locator("#portal-surface")).toBeVisible();
  await expect(scope).toHaveAttribute("data-ec-theme", "dark");
  await expect(page.locator("#portal-surface")).toHaveCSS(
    "color",
    "rgb(16, 23, 19)",
  );
  expect(errors).toEqual([]);

  await page.getByRole("button", { name: "Switch appearance" }).click();
  await expect(scope).toHaveAttribute("data-ec-theme", "light");
  expect(
    await page.evaluate(() => localStorage.getItem("ec-test-appearance")),
  ).toBe("light");

  await page.reload();
  await expect(scope).toHaveAttribute("data-ec-theme", "light");
  await expect(surface).toHaveCSS("background-color", "rgb(255, 255, 255)");
});

test("controlled appearance wins over stored preference before hydration", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("ec-test-appearance", "dark"),
  );
  const html = renderToString(
    createElement(AppearanceProvider, {
      appearance: "light",
      storageKey: "ec-test-appearance",
      children: createElement("span", { id: "controlled" }, "Controlled"),
    }),
  );
  await page.route("http://ecentry.test/controlled", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: `<!doctype html><html><body>${html}</body></html>`,
    }),
  );
  await page.goto("http://ecentry.test/controlled");
  await expect(
    page.locator("#controlled").locator("xpath=ancestor::*[@data-ec-scope][1]"),
  ).toHaveAttribute("data-ec-theme", "light");
});
