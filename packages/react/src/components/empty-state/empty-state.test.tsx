// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { EmptyState } from "./empty-state.js";

afterEach(cleanup);
describe("EmptyState", () => {
  it("renders a heading, description, decorative icon, and actionable control", () => {
    render(
      <EmptyState
        title="No projects"
        description="Create one to get started."
        icon={<span>☆</span>}
        action={<button>Create project</button>}
      />,
    );
    expect(screen.getByRole("heading", { name: "No projects" })).toBeTruthy();
    expect(screen.getByText("Create one to get started.")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Create project" })).toBeTruthy();
    expect(
      screen.getByText("☆").parentElement?.getAttribute("aria-hidden"),
    ).toBe("true");
  });
  it("announces loading without duplicate status regions", () => {
    const { rerender } = render(<EmptyState title="No files" loading />);
    expect(screen.getByRole("status").textContent).toBe("Loading");
    expect(screen.getByRole("group").getAttribute("aria-busy")).toBe("true");
    rerender(<EmptyState title="No files" />);
    expect(screen.queryByRole("status")).toBeNull();
  });
  it("supports compact layout and native group attributes", () => {
    render(
      <EmptyState
        title="No results"
        size="compact"
        aria-label="Search results"
      />,
    );
    expect(
      screen
        .getByRole("group", { name: "Search results" })
        .getAttribute("data-size"),
    ).toBe("compact");
  });
});
