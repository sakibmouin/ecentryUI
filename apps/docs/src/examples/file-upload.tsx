import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { FileUpload } from "../../../../packages/react/src/components/file-upload/file-upload.js";
import "../../../../packages/react/src/components/file-upload/file-upload.css";

export function FileUploadExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="File upload example"
      >
        <form aria-label="Attachments">
          <FileUpload
            label="Attachments"
            name="attachments"
            accept=".txt"
            multiple
            maxFiles={2}
            maxSize={1024}
          />
          <button type="reset">Reset attachments</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
