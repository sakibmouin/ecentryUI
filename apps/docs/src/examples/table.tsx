import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Table } from "../../../../packages/react/src/components/table/index.js";

const orders = [
  ["#1024", "Studio North", "Delivered", "$148.00"],
  ["#1025", "Juniper Press", "In transit", "$72.00"],
  ["#1026", "Parkside Office", "Processing", "$219.00"],
];

export function TableExample() {
  const [dark, setDark] = useState(false);
  const [compact, setCompact] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Table example"
      >
        <Table
          caption="Recent orders"
          scrollLabel="Scroll recent orders"
          density={compact ? "compact" : "regular"}
          striped
          style={{ minInlineSize: "28rem" }}
        >
          <thead>
            <tr>
              <th scope="col">Order</th>
              <th scope="col">Customer</th>
              <th scope="col">Status</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(([id, customer, status, total]) => (
              <tr key={id}>
                <th scope="row">{id}</th>
                <td>{customer}</td>
                <td>{status}</td>
                <td>{total}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <label>
          <input
            type="checkbox"
            checked={compact}
            onChange={(event) => setCompact(event.target.checked)}
          />{" "}
          Compact rows
        </label>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
