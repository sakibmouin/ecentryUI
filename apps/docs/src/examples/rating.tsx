import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Rating } from "../../../../packages/react/src/components/rating/rating.js";
import "../../../../packages/react/src/components/rating/rating.css";

export function RatingExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Rating example"
      >
        <form aria-label="Review">
          <Rating label="Product rating" name="rating" defaultValue={2.5} />
          <Rating label="Previous rating" defaultValue={4.5} readOnly />
          <button type="reset">Reset rating</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
