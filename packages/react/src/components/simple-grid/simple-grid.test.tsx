// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { SimpleGrid } from "./simple-grid.js";

afterEach(cleanup);

describe("SimpleGrid", () => {
  it("renders a semantic host, forwards its ref, and exposes responsive columns", () => {
    const ref = createRef<HTMLElement>();
    render(
      <SimpleGrid
        as="section"
        ref={ref}
        columns={{ base: 1, md: 3 }}
        aria-label="Cards"
        data-testid="grid"
      >
        <article>Card</article>
      </SimpleGrid>,
    );
    const grid = screen.getByTestId("grid");
    expect(grid.tagName).toBe("SECTION");
    expect(ref.current).toBe(grid);
    expect(grid.style.getPropertyValue("--ec-simple-grid-columns-base")).toBe(
      "1",
    );
    expect(grid.style.getPropertyValue("--ec-simple-grid-columns-md")).toBe(
      "3",
    );
    expect(grid.hasAttribute("columns")).toBe(false);
  });

  it("supports auto-fit minimum widths and independent responsive gaps", () => {
    render(
      <SimpleGrid
        minChildWidth={{ base: 160, lg: "14rem" }}
        gap={{ base: 8, md: 16 }}
        rowGap={24}
        columnGap="2rem"
        data-testid="grid"
      />,
    );
    const grid = screen.getByTestId("grid");
    expect(grid.dataset.ecSimpleGridMode).toBe("auto-fit");
    expect(grid.style.getPropertyValue("--ec-simple-grid-min-width-base")).toBe(
      "160px",
    );
    expect(grid.style.getPropertyValue("--ec-simple-grid-min-width-lg")).toBe(
      "14rem",
    );
    expect(grid.style.getPropertyValue("--ec-simple-grid-gap-md")).toBe("16px");
    expect(grid.style.getPropertyValue("--ec-simple-grid-row-gap-base")).toBe(
      "24px",
    );
    expect(
      grid.style.getPropertyValue("--ec-simple-grid-column-gap-base"),
    ).toBe("2rem");
  });

  it("rejects incompatible and invalid track settings", () => {
    expect(() =>
      render(<SimpleGrid columns={2} minChildWidth={160} />),
    ).toThrow();
    expect(() => render(<SimpleGrid columns={0} />)).toThrow(RangeError);
    expect(() => render(<SimpleGrid columns={1.5} />)).toThrow(RangeError);
    expect(() => render(<SimpleGrid minChildWidth={0} />)).toThrow(RangeError);
    expect(() => render(<SimpleGrid gap={Infinity} />)).toThrow(RangeError);
  });
});
