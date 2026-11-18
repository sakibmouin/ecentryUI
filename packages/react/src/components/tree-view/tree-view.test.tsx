// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { TreeView } from "./tree-view.js";

afterEach(cleanup);
const nodes = [
  {
    id: "docs",
    label: "Documents",
    children: [
      { id: "reports", label: "Reports" },
      { id: "plans", label: "Plans" },
    ],
  },
  {
    id: "media",
    label: "Media",
    children: [{ id: "photos", label: "Photos" }],
  },
  { id: "archive", label: "Archive", disabled: true },
];
describe("TreeView", () => {
  it("expands, navigates hierarchy and selects by keyboard", () => {
    render(<TreeView label="Files" nodes={nodes} />);
    const tree = screen.getByRole("tree", { name: "Files" });
    fireEvent.keyDown(tree, { key: "ArrowRight" });
    expect(screen.getByRole("treeitem", { name: /Reports/ })).toBeTruthy();
    fireEvent.keyDown(tree, { key: "ArrowRight" });
    expect(tree.getAttribute("aria-activedescendant")).toContain("reports");
    fireEvent.keyDown(tree, { key: "Enter" });
    expect(
      screen
        .getByRole("treeitem", { name: /Reports/ })
        .getAttribute("aria-selected"),
    ).toBe("true");
    fireEvent.keyDown(tree, { key: "ArrowLeft" });
    expect(tree.getAttribute("aria-activedescendant")).toContain("docs");
  });
  it("typeaheads and skips disabled nodes", () => {
    render(<TreeView label="Files" nodes={nodes} defaultExpanded={["docs"]} />);
    const tree = screen.getByRole("tree", { name: "Files" });
    fireEvent.keyDown(tree, { key: "p" });
    expect(tree.getAttribute("aria-activedescendant")).toContain("plans");
    fireEvent.keyDown(tree, { key: "End" });
    expect(tree.getAttribute("aria-activedescendant")).toContain("media");
  });
  it("supports controlled selection and expansion", () => {
    function Example() {
      const [value, setValue] = useState("docs");
      const [expanded, setExpanded] = useState<string[]>([]);
      return (
        <TreeView
          label="Files"
          nodes={nodes}
          value={value}
          onValueChange={setValue}
          expanded={expanded}
          onExpandedChange={setExpanded}
        />
      );
    }
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Expand Documents" }));
    expect(screen.getByRole("treeitem", { name: /Reports/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("treeitem", { name: /Reports/ }));
    expect(
      screen
        .getByRole("treeitem", { name: /Reports/ })
        .getAttribute("aria-selected"),
    ).toBe("true");
  });
  it("keeps an active descendant on its parent when collapsing", () => {
    render(<TreeView label="Files" nodes={nodes} defaultExpanded={["docs"]} />);
    const tree = screen.getByRole("tree", { name: "Files" });
    fireEvent.keyDown(tree, { key: "ArrowDown" });
    expect(tree.getAttribute("aria-activedescendant")).toContain("reports");
    fireEvent.click(screen.getByRole("button", { name: "Collapse Documents" }));
    expect(tree.getAttribute("aria-activedescendant")).toContain("docs");
  });
});
