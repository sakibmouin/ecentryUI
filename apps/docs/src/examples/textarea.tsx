import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Textarea } from "../../../../packages/react/src/components/textarea/textarea.js";
import "../../../../packages/react/src/components/textarea/textarea.css";

export function TextareaExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Textarea example"
      >
        <form aria-label="Feedback">
          <Textarea
            label="Feedback"
            name="feedback"
            defaultValue="The new design feels clear."
            description="Tell us what works for you"
            rows={4}
          />
          <Textarea
            label="Additional notes"
            variant="filled"
            placeholder="Add a note"
          />
          <Textarea label="Required response" error="Please enter a response" />
          <button type="reset">Reset feedback</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
