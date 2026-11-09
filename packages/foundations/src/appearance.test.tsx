// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { renderToString } from "react-dom/server";
import {
  AppearancePortal,
  AppearanceProvider,
  useAppearance,
} from "./appearance.js";

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.unstubAllGlobals();
});

function ModeButton() {
  const { appearance, resolvedAppearance, setAppearance } = useAppearance();
  return (
    <button type="button" onClick={() => setAppearance("dark")}>
      {appearance}:{resolvedAppearance}
    </button>
  );
}

describe("AppearanceProvider", () => {
  it("switches and persists appearance when a storage key is supplied", async () => {
    render(
      <AppearanceProvider
        defaultAppearance="light"
        storageKey="test-appearance"
      >
        <ModeButton />
      </AppearanceProvider>,
    );

    const scope = screen.getByRole("button").closest("[data-ec-scope]");
    expect(scope?.getAttribute("data-ec-theme")).toBe("light");
    fireEvent.click(screen.getByRole("button", { name: "light:light" }));
    await waitFor(() =>
      expect(scope?.getAttribute("data-ec-theme")).toBe("dark"),
    );
    expect(localStorage.getItem("test-appearance")).toBe("dark");
  });

  it("tracks system preference changes", async () => {
    let dark = false;
    let listener: ((event: MediaQueryListEvent) => void) | undefined;
    vi.stubGlobal("matchMedia", () => ({
      get matches() {
        return dark;
      },
      addEventListener: (_type: string, callback: typeof listener) => {
        listener = callback;
      },
      removeEventListener: vi.fn(),
    }));

    render(
      <AppearanceProvider defaultAppearance="system">
        <ModeButton />
      </AppearanceProvider>,
    );
    expect(screen.getByRole("button", { name: "system:light" })).toBeTruthy();
    dark = true;
    listener?.({ matches: true } as MediaQueryListEvent);
    await screen.findByRole("button", { name: "system:dark" });
  });

  it("inherits the nearest nested appearance inside a portal", async () => {
    render(
      <AppearanceProvider defaultAppearance="dark">
        <AppearanceProvider defaultAppearance="light">
          <AppearancePortal>
            <span data-testid="portalled">Content</span>
          </AppearancePortal>
        </AppearanceProvider>
      </AppearanceProvider>,
    );

    const portal = await screen.findByTestId("portalled");
    const portalScope = portal.closest("[data-ec-scope]");
    expect(portalScope?.getAttribute("data-ec-theme")).toBe("light");
    expect(portalScope?.parentElement).toBe(document.body);
  });

  it("renders a bootstrap script before children for hydration", () => {
    const html = renderToString(
      <AppearanceProvider
        defaultAppearance="system"
        storageKey="test-appearance"
      >
        <span>Content</span>
      </AppearanceProvider>,
    );

    expect(html).toContain('data-ec-theme="light"');
    expect(html).toContain("localStorage");
    expect(html.indexOf("<script")).toBeLessThan(
      html.indexOf("<span>Content</span>"),
    );
  });
});
