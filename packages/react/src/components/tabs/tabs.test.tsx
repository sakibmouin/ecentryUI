// @vitest-environment jsdom
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Tabs } from "./tabs.js";

afterEach(cleanup);

const items = [
  { id: "summary", label: "Summary", content: <p>Summary text</p> },
  { id: "audit", label: "Audit", content: <p>Audit text</p>, disabled: true },
  { id: "details", label: "Details", content: <p>Details text</p> },
];

it("automatically activates focused tabs, skips disabled tabs, and associates panels", () => {
  render(<Tabs label="Report" items={items} dir="rtl" />);
  const summary = screen.getByRole("tab", { name: "Summary" });
  const details = screen.getByRole("tab", { name: "Details" });
  act(() => summary.focus());
  fireEvent.keyDown(summary, { key: "ArrowLeft" });
  expect(document.activeElement).toBe(details);
  expect(details.getAttribute("aria-selected")).toBe("true");
  const panel = screen.getByRole("tabpanel", { name: "Details" });
  expect(details.getAttribute("aria-controls")).toBe(panel.id);
  expect(panel.textContent).toBe("Details text");
  expect(screen.queryByRole("tabpanel", { name: "Summary" })).toBeNull();
});

it("uses vertical keys to move focus, with controlled manual selection", () => {
  const onValueChange = vi.fn();
  const { rerender } = render(
    <Tabs
      label="Report"
      items={items}
      orientation="vertical"
      activation="manual"
      value="summary"
      onValueChange={onValueChange}
    />,
  );
  const summary = screen.getByRole("tab", { name: "Summary" });
  const details = screen.getByRole("tab", { name: "Details" });
  act(() => summary.focus());
  fireEvent.keyDown(summary, { key: "ArrowDown" });
  expect(document.activeElement).toBe(details);
  expect(onValueChange).not.toHaveBeenCalled();
  expect(summary.getAttribute("aria-selected")).toBe("true");
  fireEvent.click(details);
  expect(onValueChange).toHaveBeenCalledExactlyOnceWith("details");
  expect(summary.getAttribute("aria-selected")).toBe("true");

  rerender(
    <Tabs
      label="Report"
      items={items}
      orientation="vertical"
      activation="manual"
      value="details"
      onValueChange={onValueChange}
    />,
  );
  expect(document.activeElement).toBe(details);
  expect(details.getAttribute("aria-selected")).toBe("true");
  fireEvent.keyDown(details, { key: "Home" });
  expect(document.activeElement).toBe(summary);
});
