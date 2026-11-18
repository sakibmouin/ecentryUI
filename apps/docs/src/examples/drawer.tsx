import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Drawer } from "../../../../packages/react/src/components/drawer/drawer.js";
import "../../../../packages/react/src/components/drawer/drawer.css";

export function DrawerExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Drawer example"
      >
        <Drawer
          title="Project settings"
          triggerLabel="Open settings drawer"
          description="Manage the current workspace"
          placement="right"
        >
          <p>Changes here affect everyone in the project.</p>
          <label className="drawer-demo-field">
            Project name <input defaultValue="Atlas" />
          </label>
        </Drawer>
        <Drawer
          title="Quick filters"
          triggerLabel="Open bottom drawer"
          placement="bottom"
        >
          <p>Choose a view for the current list.</p>
        </Drawer>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
