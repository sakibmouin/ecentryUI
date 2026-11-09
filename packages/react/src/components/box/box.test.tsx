// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Box } from "./box.js";

afterEach(cleanup);

describe("Box", () => {
  it("renders a native div and forwards a ref and attributes", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Box ref={ref} data-testid="box" aria-label="Panel">
        Content
      </Box>,
    );
    const box = screen.getByTestId("box");
    expect(box.tagName).toBe("DIV");
    expect(box.getAttribute("aria-label")).toBe("Panel");
    expect(ref.current).toBe(box);
  });

  it("uses a semantic host and emits responsive style variables without leaking props", () => {
    render(
      <Box
        as="section"
        padding={{ base: 8, md: 24 }}
        marginInline={{ base: 0, lg: "2rem" }}
        background="var(--ec-colors-surface)"
        color="var(--ec-colors-text)"
        display={{ base: "block", sm: "grid" }}
        gap={12}
        className="custom"
        data-testid="box"
      >
        Content
      </Box>,
    );
    const box = screen.getByTestId("box");
    expect(box.tagName).toBe("SECTION");
    expect(box.style.getPropertyValue("--ec-box-padding-base")).toBe("8px");
    expect(box.style.getPropertyValue("--ec-box-padding-md")).toBe("24px");
    expect(box.style.getPropertyValue("--ec-box-margin-inline-lg")).toBe(
      "2rem",
    );
    expect(box.style.getPropertyValue("--ec-box-display-sm")).toBe("grid");
    expect(box.style.getPropertyValue("--ec-box-gap-base")).toBe("12px");
    expect(box.hasAttribute("padding")).toBe(false);
    expect(box.className).toContain("custom");
  });

  it("lets a native style override a Box style prop", () => {
    render(<Box padding={8} style={{ padding: 20 }} data-testid="box" />);
    expect(screen.getByTestId("box").style.padding).toBe("20px");
  });
});
