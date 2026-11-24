import { useId, useState } from "react";
import {
  Button,
  buttonRecipe,
} from "../../../packages/react/src/components/button/button.js";
import type { ButtonProps } from "../../../packages/react/src/components/button/button.js";

import "../../../packages/react/src/components/button/button.css";

const selects = [
  { prop: "variant", label: "Variant", choices: buttonRecipe.variants },
  { prop: "size", label: "Size", choices: buttonRecipe.sizes },
  { prop: "color", label: "Color", choices: buttonRecipe.colors },
] as const;

const toggles = [
  { prop: "disabled", label: "Disabled" },
  { prop: "loading", label: "Loading" },
] as const;

type PlaygroundProps = Required<
  Pick<ButtonProps, "variant" | "size" | "color" | "disabled" | "loading">
>;

const initial: PlaygroundProps = {
  ...buttonRecipe.defaults,
  disabled: false,
  loading: false,
};

function buttonCode(props: PlaygroundProps, label: string) {
  const choices = selects.map(
    ({ prop }) => `${prop}=${JSON.stringify(props[prop])}`,
  );
  const flags = toggles.flatMap(({ prop }) => (props[prop] ? [prop] : []));
  return [
    'import { Button } from "@/components/ui/button";',
    "",
    `<Button ${[...choices, ...flags].join(" ")}>`,
    `  {${JSON.stringify(label)}}`,
    "</Button>",
  ].join("\n");
}

export function Playground() {
  const id = useId();
  const [label, setLabel] = useState("Save changes");
  const [props, setProps] = useState(initial);
  const [copyStatus, setCopyStatus] = useState("");
  const previewLabel = label || "Button";
  const source = buttonCode(props, previewLabel);

  async function copy() {
    try {
      await navigator.clipboard.writeText(source);
      setCopyStatus("Copied to clipboard.");
    } catch {
      setCopyStatus("Clipboard unavailable. Select the code to copy it.");
    }
  }

  return (
    <>
      <h1>Playground</h1>
      <p>Try Button props and copy the code for your project.</p>
      <div className="docs-playground">
        <fieldset>
          <legend>Button props</legend>
          <label htmlFor={`${id}-label`}>Button label</label>
          <input
            id={`${id}-label`}
            value={label}
            maxLength={120}
            onChange={(event) => setLabel(event.target.value)}
          />
          {selects.map(({ prop, label: optionLabel, choices }) => (
            <div key={prop}>
              <label htmlFor={`${id}-${prop}`}>{optionLabel}</label>
              <select
                id={`${id}-${prop}`}
                value={props[prop]}
                onChange={(event) => {
                  const selected = choices.find(
                    (choice) => choice === event.target.value,
                  );
                  if (selected)
                    setProps((previous) => ({ ...previous, [prop]: selected }));
                }}
              >
                {choices.map((choice) => (
                  <option key={choice} value={choice}>
                    {choice}
                  </option>
                ))}
              </select>
            </div>
          ))}
          {toggles.map(({ prop, label: toggleLabel }) => (
            <label key={prop}>
              <input
                type="checkbox"
                checked={props[prop]}
                onChange={(event) => {
                  const checked = event.target.checked;
                  setProps((previous) => ({ ...previous, [prop]: checked }));
                }}
              />{" "}
              {toggleLabel}
            </label>
          ))}
        </fieldset>
        <section
          className="docs-playground-preview"
          aria-label="Button preview"
        >
          <Button {...props}>{previewLabel}</Button>
        </section>
        <section className="docs-playground-source" aria-label="Button code">
          <div>
            <button type="button" onClick={copy}>
              Copy code
            </button>
            <output>{copyStatus}</output>
          </div>
          <pre tabIndex={0}>
            <code>{source}</code>
          </pre>
        </section>
      </div>
    </>
  );
}
