import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { RichTextEditor } from "../../../../packages/react/src/components/rich-text-editor/rich-text-editor.js";
import "../../../../packages/react/src/components/rich-text-editor/rich-text-editor.css";

export function RichTextEditorExample() {
  const [dark, setDark] = useState(false);
  const [saved, setSaved] = useState("");
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo"
        role="region"
        aria-label="Rich text editor example"
      >
        <RichTextEditor
          label="Article body"
          initialText="Write your story here."
          onSave={setSaved}
          saveDelay={300}
        />
        <p role="status">{saved ? "Saved" : "Waiting for changes"}</p>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
