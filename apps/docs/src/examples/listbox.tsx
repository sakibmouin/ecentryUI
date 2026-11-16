import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Listbox } from "../../../../packages/react/src/components/listbox/listbox.js";
import "../../../../packages/react/src/components/listbox/listbox.css";

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
export function ListboxExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Listbox example"
      >
        <form aria-label="Food preferences">
          <Listbox
            label="Favorite food"
            groups={groups}
            name="favorite"
            defaultValue="apple"
          />
          <Listbox
            label="Shopping list"
            groups={groups}
            name="shopping"
            multiple
            defaultValue={["apricot"]}
          />
          <button type="reset">Reset choices</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
