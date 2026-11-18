import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { EmptyState } from "../../../../packages/react/src/components/empty-state/empty-state.js";
import "../../../../packages/react/src/components/empty-state/empty-state.css";

export function EmptyStateExample() {
  const [dark, setDark] = useState(false);
  const [created, setCreated] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Empty State example"
      >
        {created ? (
          <p role="status">Project created</p>
        ) : (
          <EmptyState
            title="No projects yet"
            description="Create a project to organize your work."
            icon="◇"
            action={
              <button type="button" onClick={() => setCreated(true)}>
                Create project
              </button>
            }
          />
        )}
        <EmptyState
          title="No search results"
          description="Try a different query."
          size="compact"
        />
        <EmptyState title="Loading projects" loading />
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
