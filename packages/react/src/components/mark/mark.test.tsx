// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Mark } from "./mark.js";
afterEach(cleanup);
describe("Mark", () => {
  it("renders marked content and forwards native props and ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Mark ref={ref} title="Relevant note" data-testid="mark">
        Relevant
      </Mark>,
    );
    const mark = screen.getByTestId("mark");
    expect(mark.tagName).toBe("MARK");
    expect(mark.title).toBe("Relevant note");
    expect(mark.textContent).toBe("Relevant");
    expect(ref.current).toBe(mark);
  });
});
