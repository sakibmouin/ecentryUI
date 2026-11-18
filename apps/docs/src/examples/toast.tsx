import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Toast } from "../../../../packages/react/src/components/toast/toast.js";
import "../../../../packages/react/src/components/toast/toast.css";

export function ToastExample() {
  const [dark, setDark] = useState(false);
  const [retried, setRetried] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Toast example"
      >
        <Toast>
          {(enqueue) => (
            <div className="toast-demo-actions">
              <button
                type="button"
                onClick={() =>
                  enqueue({
                    id: `saved-${Date.now()}`,
                    title: "Changes saved",
                    description: "Your project is up to date.",
                    tone: "success",
                    duration: 3000,
                  })
                }
              >
                Show success
              </button>
              <button
                type="button"
                onClick={() =>
                  enqueue({
                    id: `failed-${Date.now()}`,
                    title: "Save failed",
                    description: "Try again when ready.",
                    tone: "error",
                    duration: 0,
                    action: { label: "Retry", onClick: () => setRetried(true) },
                  })
                }
              >
                Show error
              </button>
            </div>
          )}
        </Toast>
        {retried && <p>Retry requested</p>}
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
