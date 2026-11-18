// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { DataList } from "./data-list.js";

afterEach(cleanup);
describe("DataList", () => {
  it("renders term and value pairs with native description list semantics", () => {
    render(
      <DataList
        items={[
          { label: "Name", value: "Ada" },
          { label: "Role", value: <strong>Admin</strong> },
        ]}
      />,
    );
    const list = document.querySelector("dl")!;
    expect(list.tagName).toBe("DL");
    expect(list.querySelectorAll("dt")).toHaveLength(2);
    expect(list.querySelectorAll("dd")).toHaveLength(2);
    expect(list.textContent).toContain("NameAda");
    expect(list.textContent).toContain("RoleAdmin");
  });
  it("announces loading and empty states without fake values", () => {
    const { rerender } = render(<DataList items={[]} loading />);
    expect(document.querySelector("dl")?.getAttribute("aria-busy")).toBe(
      "true",
    );
    expect(screen.getByRole("status").textContent).toBe("Loading details");
    rerender(<DataList items={[]} emptyMessage="No details yet" />);
    expect(screen.getByRole("status").textContent).toBe("No details yet");
    expect(document.querySelector("dl")?.querySelector("dd")).toBeNull();
  });
  it("exposes orientation and forwards native list attributes", () => {
    render(
      <DataList
        items={[{ label: "Status", value: "Active" }]}
        orientation="horizontal"
        aria-label="Account details"
      />,
    );
    expect(document.querySelector("dl")?.getAttribute("data-orientation")).toBe(
      "horizontal",
    );
  });
});
