// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Float } from "./float.js";

afterEach(cleanup);

describe("Float", () => {
  it("renders a native host and forwards attributes and a ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Float as="span" ref={ref} aria-label="Three updates" data-testid="float">
        3
      </Float>,
    );
    const float = screen.getByTestId("float");
    expect(float.tagName).toBe("SPAN");
    expect(float.getAttribute("aria-label")).toBe("Three updates");
    expect(ref.current).toBe(float);
    expect(float.className).toContain("ec-float");
  });

  it("maps logical placements and responsive changes to stable CSS variables", () => {
    render(
      <Float
        placement={{ base: "top-end", md: "bottom-start", lg: "middle-center" }}
        data-testid="float"
      />,
    );
    const style = screen.getByTestId("float").style;
    expect(style.getPropertyValue("--ec-float-inline-base")).toBe("100%");
    expect(style.getPropertyValue("--ec-float-block-base")).toBe("0%");
    expect(style.getPropertyValue("--ec-float-inline-md")).toBe("0%");
    expect(style.getPropertyValue("--ec-float-block-md")).toBe("100%");
    expect(style.getPropertyValue("--ec-float-inline-lg")).toBe("50%");
    expect(style.getPropertyValue("--ec-float-block-lg")).toBe("50%");
    expect(screen.getByTestId("float").hasAttribute("placement")).toBe(false);
  });

  it("supports offset shorthand and axis overrides with CSS lengths", () => {
    render(
      <Float
        offset={8}
        offsetX="1rem"
        offsetY={-4}
        style={{ color: "red" }}
        data-testid="float"
      />,
    );
    const style = screen.getByTestId("float").style;
    expect(style.getPropertyValue("--ec-float-offset-x")).toBe("1rem");
    expect(style.getPropertyValue("--ec-float-offset-y")).toBe("-4px");
    expect(style.color).toBe("red");
  });
});
