// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { useState } from "react";
import { Carousel } from "./carousel.js";

const slides = [
  { id: "one", label: "First", content: "First content" },
  { id: "two", label: "Second", content: "Second content" },
  { id: "three", label: "Third", content: "Third content" },
];
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
describe("Carousel", () => {
  it("navigates with controls, indicators and keyboard within bounds", () => {
    render(<Carousel label="Highlights" slides={slides} />);
    const region = screen.getByRole("region", { name: "Highlights" });
    expect(
      screen
        .getByRole("button", { name: "Previous slide" })
        .hasAttribute("disabled"),
    ).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(screen.getByRole("group", { name: "2 of 3: Second" })).toBeTruthy();
    fireEvent.keyDown(region, { key: "End" });
    expect(screen.getByRole("group", { name: "3 of 3: Third" })).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: "Go to slide 1: First" }),
    );
    expect(screen.getByRole("group", { name: "1 of 3: First" })).toBeTruthy();
  });
  it("supports controlled index and RTL arrows", () => {
    const onChange = vi.fn();
    function Example() {
      const [index, setIndex] = useState(0);
      return (
        <div dir="rtl">
          <Carousel
            label="Highlights"
            slides={slides}
            index={index}
            onIndexChange={(next) => {
              onChange(next);
              setIndex(next);
            }}
            loop
          />
        </div>
      );
    }
    render(<Example />);
    const region = screen.getByRole("region", { name: "Highlights" });
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(onChange).toHaveBeenCalledWith(2);
  });
  it("autoplays, pauses on hover and respects reduced motion", () => {
    vi.useFakeTimers();
    const query = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => query),
    );
    const { container } = render(
      <Carousel label="Highlights" slides={slides} autoplay interval={1000} />,
    );
    const region = container.firstElementChild!;
    fireEvent.mouseEnter(region);
    act(() => vi.advanceTimersByTime(1100));
    expect(screen.getByRole("group", { name: "1 of 3: First" })).toBeTruthy();
    fireEvent.mouseLeave(region);
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByRole("group", { name: "2 of 3: Second" })).toBeTruthy();
    query.matches = true;
    act(() => query.addEventListener.mock.calls[0]![1]());
    act(() => vi.advanceTimersByTime(1100));
    expect(screen.getByRole("group", { name: "2 of 3: Second" })).toBeTruthy();
  });
});
