// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { List, ListItem } from "./list.js";
afterEach(cleanup);
describe("List", () => {
  it("renders an unordered list with native list items", () => {
    render(
      <List aria-label="Tasks">
        <ListItem>First</ListItem>
        <ListItem>Second</ListItem>
      </List>,
    );
    const list = screen.getByRole("list", { name: "Tasks" });
    expect(list.tagName).toBe("UL");
    expect(list.querySelectorAll("li")).toHaveLength(2);
  });
  it("renders ordered and marker-free variants", () => {
    render(
      <List ordered marker="none" data-testid="list">
        <ListItem>Step</ListItem>
      </List>,
    );
    const list = screen.getByTestId("list");
    expect(list.tagName).toBe("OL");
    expect(list.getAttribute("data-marker")).toBe("none");
  });
});
