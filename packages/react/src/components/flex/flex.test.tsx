// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Flex, Spacer } from "./flex.js";

afterEach(cleanup);

describe("Flex", () => {
  it("renders a semantic host and forwards native attributes and a ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Flex as="nav" ref={ref} aria-label="Links" data-testid="flex">
        Items
      </Flex>,
    );
    const flex = screen.getByTestId("flex");
    expect(flex.tagName).toBe("NAV");
    expect(flex.getAttribute("aria-label")).toBe("Links");
    expect(ref.current).toBe(flex);
  });

  it("emits responsive layout variables and consumes its props", () => {
    render(
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify={{ base: "start", lg: "space-between" }}
        wrap="wrap"
        gap={{ base: 8, sm: "1rem" }}
        inline
        data-testid="flex"
      />,
    );
    const flex = screen.getByTestId("flex");
    expect(flex.style.getPropertyValue("--ec-flex-direction-base")).toBe(
      "column",
    );
    expect(flex.style.getPropertyValue("--ec-flex-direction-md")).toBe("row");
    expect(flex.style.getPropertyValue("--ec-flex-justify-lg")).toBe(
      "space-between",
    );
    expect(flex.style.getPropertyValue("--ec-flex-gap-base")).toBe("8px");
    expect(flex.style.getPropertyValue("--ec-flex-gap-sm")).toBe("1rem");
    expect(flex.className).toContain("ec-flex--inline");
    expect(flex.hasAttribute("direction")).toBe(false);
    expect(flex.hasAttribute("inline")).toBe(false);
  });

  it("lets native style override flex props and renders Spacer", () => {
    render(
      <Flex gap={8} style={{ gap: 20 }} data-testid="flex">
        <Spacer as="span" data-testid="spacer" />
      </Flex>,
    );
    const flex = screen.getByTestId("flex");
    expect(flex.style.gap).toBe("20px");
    expect(screen.getByTestId("spacer").tagName).toBe("SPAN");
    expect(screen.getByTestId("spacer").className).toContain("ec-spacer");
  });
});
