import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Button } from "../../../../packages/react/src/components/button/button.js";
import "../../../../packages/react/src/components/button/button.css";

export function ButtonExample() {
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="button-showcase"
        role="region"
        aria-label="Button examples"
      >
        <Button>Save changes</Button>
        <Button variant="outline">Preview</Button>
        <Button variant="ghost">More options</Button>
        <Button variant="text">Text action</Button>
        <Button color="danger">Delete</Button>
        <Button disabled>Disabled</Button>
        <Button loading={loading} loadingText="Saving">
          Save
        </Button>
        <Button variant="outline" onClick={() => setLoading(!loading)}>
          Toggle loading
        </Button>
        <Button variant="text" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </Button>
      </div>
    </AppearanceProvider>
  );
}
