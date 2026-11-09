import { useId, useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Input } from "../../../../packages/react/src/components/input/input.js";
import { Button } from "../../../../packages/react/src/components/button/button.js";
import "../../../../packages/react/src/components/input/input.css";
import "../../../../packages/react/src/components/button/button.css";

export function InputExample() {
  const [dark, setDark] = useState(false);
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState("");
  const id = useId();
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="input-showcase" role="region" aria-label="Input examples">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(value);
          }}
        >
          <label htmlFor={`${id}-email`}>Email address</label>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            placeholder="you@example.com"
            value={value}
            onValueChange={setValue}
            aria-describedby={`${id}-help`}
          />
          <p id={`${id}-help`} className="input-help">
            Enter an address to see controlled input and form behavior.
          </p>
          <Button type="submit" size="sm">
            Submit
          </Button>
          {submitted && <p role="status">Submitted: {submitted}</p>}
        </form>
        <div className="input-showcase-grid">
          <label>
            Filled
            <Input variant="filled" placeholder="Search" />
          </label>
          <label>
            Flushed
            <Input variant="flushed" placeholder="Enter a value" />
          </label>
          <label>
            Invalid
            <Input
              invalid
              aria-describedby={`${id}-error`}
              defaultValue="bad"
            />
            <span id={`${id}-error`} className="input-error">
              Please check this value.
            </span>
          </label>
          <label>
            Disabled
            <Input disabled placeholder="Unavailable" />
          </label>
          <label>
            Read only
            <Input readOnly defaultValue="Fixed value" />
          </label>
        </div>
        <Button variant="text" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </Button>
      </div>
    </AppearanceProvider>
  );
}
