import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Select } from "../../../../packages/react/src/components/select/select.js";
import "../../../../packages/react/src/components/select/select.css";

const groups = [
  {
    label: "Fruit",
    options: [
      { value: "apple", label: "Apple" },
      { value: "apricot", label: "Apricot" },
    ],
  },
  {
    label: "Vegetables",
    options: [
      { value: "carrot", label: "Carrot", disabled: true },
      { value: "celery", label: "Celery" },
    ],
  },
];
export function SelectExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Select example"
      >
        <form aria-label="Food order">
          <Select
            label="Favorite food"
            groups={groups}
            name="favorite"
            defaultValue="apple"
            description="Use arrow keys to explore"
          />
          <Select
            label="Shopping list"
            groups={groups}
            name="shopping"
            multiple
            defaultValue={["apricot"]}
            error="Review your choices"
          />
          <button type="reset">Reset order</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
