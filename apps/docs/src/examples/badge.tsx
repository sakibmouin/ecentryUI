import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Badge } from "../../../../packages/react/src/components/badge/badge.js";
import "../../../../packages/react/src/components/badge/badge.css";

export function BadgeExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Badge example"
      >
        <Badge>Draft</Badge>
        <Badge variant="info">Review</Badge>
        <Badge variant="success">Published</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="error">Failed</Badge>
        <Badge size="sm" loading>
          Syncing
        </Badge>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
