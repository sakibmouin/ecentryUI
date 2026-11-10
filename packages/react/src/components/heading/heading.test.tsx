// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Heading } from "./heading.js";
afterEach(cleanup);
describe("Heading", () => {
  it("defaults to a semantic h2 and forwards a ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Heading ref={ref} data-testid="heading">
        Title
      </Heading>,
    );
    const heading = screen.getByTestId("heading");
    expect(heading.tagName).toBe("H2");
    expect(ref.current).toBe(heading);
  });
  it("supports custom heading levels and native overrides", () => {
    render(
      <Heading as="h1" style={{ lineHeight: "1" }} data-testid="heading">
        Title
      </Heading>,
    );
    const heading = screen.getByTestId("heading");
    expect(heading.tagName).toBe("H1");
    expect(heading.style.lineHeight).toBe("1");
  });
});
