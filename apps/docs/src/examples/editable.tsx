import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Editable } from "../../../../packages/react/src/components/editable/editable.js";
import "../../../../packages/react/src/components/editable/editable.css";

export function EditableExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Editable example"
      >
        <Editable
          label="Project title"
          defaultValue="Quarterly report"
          validate={(value) => (value ? undefined : "Title is required")}
        />
        <Editable
          label="Read only title"
          defaultValue="Locked title"
          readOnly
        />
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
