import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { IconButton } from "../../../../packages/react/src/components/icon-button/icon-button.js";
import "../../../../packages/react/src/components/icon-button/icon-button.css";
const star = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="m12 2 3 6 7 .9-5 5 .9 7.1-5.9-3.2-5.9 3.2.9-7.1-5-5L9 8z" />
  </svg>
);
export function IconButtonExample() {
  const [dark, setDark] = useState(false);
  const [favorite, setFavorite] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="code-demo" role="region" aria-label="Icon button example">
        <IconButton
          icon={star}
          aria-label={favorite ? "Remove favorite" : "Add favorite"}
          aria-pressed={favorite}
          variant="solid"
          onClick={() => setFavorite(!favorite)}
        />
        <span role="status">{favorite ? "Favorited" : "Not favorited"}</span>
        <IconButton
          icon={star}
          aria-label="Unavailable favorite"
          variant="outline"
          disabled
        />
        <IconButton icon={star} aria-label="Saving favorite" loading />
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
