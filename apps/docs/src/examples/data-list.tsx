import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { DataList } from "../../../../packages/react/src/components/data-list/data-list.js";
import "../../../../packages/react/src/components/data-list/data-list.css";

const items = [
  { label: "Name", value: "Ada Lovelace" },
  { label: "Role", value: "Administrator" },
  { label: "Status", value: "Active" },
];
export function DataListExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Data List example"
      >
        <DataList items={items} aria-label="Profile details" />
        <DataList
          items={items}
          orientation="horizontal"
          aria-label="Horizontal details"
        />
        <DataList
          items={[]}
          emptyMessage="No details yet"
          aria-label="Empty details"
        />
        <DataList items={[]} loading aria-label="Loading details" />
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
