import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Accordion } from "../../../../packages/react/src/components/accordion/accordion.js";
import "../../../../packages/react/src/components/accordion/accordion.css";

const items = [
  {
    value: "shipping",
    title: "When will my order ship?",
    content: "Orders usually ship within two business days.",
  },
  {
    value: "returns",
    title: "Can I return an item?",
    content: "You can return unused items within 30 days.",
  },
  {
    value: "closed",
    title: "Unavailable question",
    content: "This answer is unavailable.",
    disabled: true,
  },
];

export function AccordionExample() {
  const [dark, setDark] = useState(false);
  const [multiple, setMultiple] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Accordion example"
      >
        <Accordion
          key={multiple ? "multiple" : "single"}
          items={items}
          type={multiple ? "multiple" : "single"}
          defaultValue="shipping"
        />
        <button type="button" onClick={() => setMultiple(!multiple)}>
          {multiple ? "Single expansion" : "Multiple expansion"}
        </button>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
