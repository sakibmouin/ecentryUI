import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { TagsInput } from "../../../../packages/react/src/components/tags-input/tags-input.js";
import "../../../../packages/react/src/components/tags-input/tags-input.css";

export function TagsInputExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Tags input example"
      >
        <form aria-label="Skills form">
          <TagsInput
            label="Skills"
            name="skills"
            defaultValue={["React", "TypeScript"]}
            description="Press Enter or comma to add; F2 edits a tag"
            maxTags={5}
          />
          <TagsInput
            label="Project labels"
            defaultValue={["Design"]}
            error="Add at least one more label"
          />
          <button type="reset">Reset tags</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
