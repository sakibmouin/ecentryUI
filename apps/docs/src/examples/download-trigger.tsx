import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { DownloadTrigger } from "../../../../packages/react/src/components/download-trigger/download-trigger.js";
import "../../../../packages/react/src/components/download-trigger/download-trigger.css";
export function DownloadTriggerExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo"
        role="region"
        aria-label="Download trigger example"
      >
        <DownloadTrigger
          href="data:text/plain,Hello%20from%20ecentryUI"
          filename="example.txt"
        >
          Download example
        </DownloadTrigger>
        <DownloadTrigger href="/unavailable.txt" disabled>
          Unavailable download
        </DownloadTrigger>
        <DownloadTrigger href="/loading.txt" loading>
          Preparing download
        </DownloadTrigger>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
