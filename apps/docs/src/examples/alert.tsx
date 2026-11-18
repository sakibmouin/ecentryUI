import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Alert } from "../../../../packages/react/src/components/alert/alert.js";
import "../../../../packages/react/src/components/alert/alert.css";

export function AlertExample() {
  const [dark, setDark] = useState(false);
  const [show, setShow] = useState(true);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Alert example"
      >
        <Alert title="Update available">
          A newer version is ready to install.
        </Alert>
        <Alert variant="success" title="Changes saved">
          Your preferences are up to date.
        </Alert>
        <Alert variant="warning" title="Review required">
          Check the details before continuing.
        </Alert>
        {show && (
          <Alert
            variant="error"
            title="Upload failed"
            dismissible
            onDismiss={() => setShow(false)}
            action={<button type="button">Retry</button>}
          >
            The file could not be uploaded.
          </Alert>
        )}
        <Alert title="Uploading" loading>
          Please wait while your file is processed.
        </Alert>
        <button type="button" onClick={() => setShow(true)}>
          Show error
        </button>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
