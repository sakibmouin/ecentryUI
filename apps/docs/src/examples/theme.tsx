import { useState } from "react";
import { Theme } from "../../../../packages/react/src/components/theme/index.js";

export function ThemeExample() {
  const [dark, setDark] = useState(false);
  return (
    <div className="code-demo">
      <Theme
        appearance={dark ? "dark" : "light"}
        withBackground
        style={{ padding: 12, borderRadius: 8 }}
      >
        <label>
          Workspace name <input defaultValue="Workshop" />
        </label>
      </Theme>
      <button type="button" onClick={() => setDark(!dark)}>
        {dark ? "Light mode" : "Dark mode"}
      </button>
    </div>
  );
}
