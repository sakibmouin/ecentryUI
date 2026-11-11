import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import {
  List,
  ListItem,
} from "../../../../packages/react/src/components/list/list.js";
import "../../../../packages/react/src/components/list/list.css";

export function ListExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="code-demo" role="region" aria-label="List examples">
        <List aria-label="Project phases">
          <ListItem>Plan the work</ListItem>
          <ListItem>Build a slice</ListItem>
          <ListItem>Verify the result</ListItem>
        </List>
        <List ordered aria-label="Release steps">
          <ListItem>Test</ListItem>
          <ListItem>Ship</ListItem>
        </List>
        <List dir="rtl" aria-label="Arabic steps">
          <ListItem>الأول</ListItem>
          <ListItem>الثاني</ListItem>
        </List>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
