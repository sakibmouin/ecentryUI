import {
  AppearancePortal,
  AppearanceProvider,
  useAppearance,
} from "@ecentry/foundations/react";

function ModeButton() {
  const { resolvedAppearance, setAppearance } = useAppearance();
  return (
    <button
      type="button"
      onClick={() =>
        setAppearance(resolvedAppearance === "dark" ? "light" : "dark")
      }
    >
      Switch appearance
    </button>
  );
}

export function App() {
  return (
    <AppearanceProvider
      defaultAppearance="system"
      storageKey="ec-test-appearance"
    >
      <main
        id="surface"
        style={{
          background: "var(--ec-colors-background)",
          color: "var(--ec-colors-text)",
        }}
      >
        <ModeButton />
        <AppearanceProvider defaultAppearance="light">
          <AppearancePortal>
            <span
              id="portal-surface"
              style={{ color: "var(--ec-colors-text)" }}
            >
              Portal content
            </span>
          </AppearancePortal>
        </AppearanceProvider>
      </main>
    </AppearanceProvider>
  );
}

if (typeof document !== "undefined") {
  import("react-dom/client").then(({ hydrateRoot }) => {
    hydrateRoot(document.getElementById("root")!, <App />);
  });
}
