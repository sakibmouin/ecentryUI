// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, expect, it } from "vitest";
import { Table } from "./table.js";

afterEach(cleanup);

it("renders native table semantics, forwards the ref, and exposes busy state", () => {
  const ref = createRef<HTMLTableElement>();
  render(
    <Table caption="Orders" striped density="compact" loading ref={ref}>
      <thead>
        <tr>
          <th scope="col">Order</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">#1024</th>
        </tr>
      </tbody>
    </Table>,
  );
  const table = screen.getByRole("table", { name: "Orders" });
  expect(table).toBe(ref.current);
  expect(table.getAttribute("aria-busy")).toBe("true");
  expect(table.dataset.density).toBe("compact");
  expect(table.dataset.striped).toBeDefined();
  expect(screen.getByRole("columnheader", { name: "Order" })).toBeTruthy();
  expect(screen.getByRole("rowheader", { name: "#1024" })).toBeTruthy();
});

it("names the scroll region and allows keyboard scrolling", () => {
  render(
    <Table caption="Inventory" scrollLabel="Scrollable inventory">
      <tbody />
    </Table>,
  );
  const region = screen.getByRole("region", { name: "Scrollable inventory" });
  expect(region.tabIndex).toBe(0);
  expect(
    region.contains(screen.getByRole("table", { name: "Inventory" })),
  ).toBe(true);
});
