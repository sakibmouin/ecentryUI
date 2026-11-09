"use client";

import { useState } from "react";

export function Sample() {
  const [count, setCount] = useState(0);
  return (
    <button
      type="button"
      style={{ color: "var(--ec-colors-text)" }}
      onClick={() => setCount(count + 1)}
    >
      Count: {count}
    </button>
  );
}
