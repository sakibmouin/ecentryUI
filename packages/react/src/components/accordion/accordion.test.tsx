// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Accordion } from "./accordion.js";

const items = [
  { value: "one", title: "First", content: "First content" },
  { value: "two", title: "Second", content: "Second content" },
  {
    value: "three",
    title: "Unavailable",
    content: "Third content",
    disabled: true,
  },
];
afterEach(cleanup);
describe("Accordion", () => {
  it("opens one item at a time and keeps disabled items closed", () => {
    render(<Accordion items={items} defaultValue="one" />);
    const first = screen.getByRole("button", { name: "First" });
    const second = screen.getByRole("button", { name: "Second" });
    expect(first.getAttribute("aria-expanded")).toBe("true");
    expect(
      screen.getByRole("region", { name: "First" }).hasAttribute("hidden"),
    ).toBe(false);
    fireEvent.click(second);
    expect(first.getAttribute("aria-expanded")).toBe("false");
    expect(second.getAttribute("aria-expanded")).toBe("true");
    expect(
      screen
        .getByRole("button", { name: "Unavailable" })
        .hasAttribute("disabled"),
    ).toBe(true);
    fireEvent.click(second);
    expect(second.getAttribute("aria-expanded")).toBe("false");
  });
  it("allows multiple panels and reports controlled changes without changing state", () => {
    const onValueChange = vi.fn();
    render(
      <Accordion
        items={items}
        type="multiple"
        value={["one"]}
        onValueChange={onValueChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Second" }));
    expect(onValueChange).toHaveBeenCalledWith(["one", "two"]);
    expect(
      screen
        .getByRole("button", { name: "Second" })
        .getAttribute("aria-expanded"),
    ).toBe("false");
  });
  it("moves focus with arrows and Home/End, skipping disabled triggers", () => {
    render(<Accordion items={items} />);
    const first = screen.getByRole("button", { name: "First" });
    const second = screen.getByRole("button", { name: "Second" });
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowDown" });
    expect(document.activeElement).toBe(second);
    fireEvent.keyDown(second, { key: "End" });
    expect(document.activeElement).toBe(second);
    fireEvent.keyDown(second, { key: "ArrowDown" });
    expect(document.activeElement).toBe(first);
    fireEvent.keyDown(first, { key: " " });
    fireEvent.click(first);
    expect(document.activeElement).toBe(first);
  });
});
