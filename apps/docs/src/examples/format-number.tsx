import { FormatNumber } from "../../../../packages/react/src/components/format-number/index.js";

export function FormatNumberExample() {
  return (
    <div className="code-demo">
      <p>
        Total:{" "}
        <FormatNumber
          value={1234.5}
          options={{ style: "currency", currency: "USD" }}
        />
      </p>
      <p>
        Completion: <FormatNumber value={0.82} options={{ style: "percent" }} />
      </p>
    </div>
  );
}
