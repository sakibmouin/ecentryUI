import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Skeleton } from "../../../../packages/react/src/components/skeleton/skeleton.js";
import "../../../../packages/react/src/components/skeleton/skeleton.css";
export function SkeletonExample() {
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Skeleton example"
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Skeleton circle width={48} height={48} loading={loading} />
          <Skeleton
            label="Loading profile"
            width={200}
            height={24}
            loading={loading}
          >
            Profile ready
          </Skeleton>
        </div>
        <button type="button" onClick={() => setLoading(!loading)}>
          {loading ? "Finish loading" : "Start loading"}
        </button>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
