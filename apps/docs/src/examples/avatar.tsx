import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Avatar } from "../../../../packages/react/src/components/avatar/avatar.js";
import "../../../../packages/react/src/components/avatar/avatar.css";

export function AvatarExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Avatar example"
      >
        <Avatar
          name="Ada Lovelace"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23276855'/%3E%3Ctext x='40' y='53' text-anchor='middle' fill='white' font-size='32'%3EAL%3C/text%3E%3C/svg%3E"
        />
        <Avatar name="Grace Hopper" size="sm" />
        <Avatar name="Lin" size="lg" fallback="L" />
        <Avatar name="Loading profile" loading />
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
