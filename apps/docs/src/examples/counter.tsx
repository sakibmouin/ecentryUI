import { useState } from "react";

export function CounterExample() {
  const [count, setCount] = useState(0);
  return (
    <button
      className="example-button"
      type="button"
      onClick={() => setCount(count + 1)}
    >
      Count: {count}
    </button>
  );
}
