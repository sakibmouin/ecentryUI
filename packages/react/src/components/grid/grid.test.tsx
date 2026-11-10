// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Grid, GridItem } from "./grid.js";

afterEach(cleanup);

describe("Grid", () => {
  it("renders semantic hosts and forwards refs and native attributes", () => {
    const gridRef = createRef<HTMLElement>();
    const itemRef = createRef<HTMLElement>();
    render(
      <Grid
        as="section"
        ref={gridRef}
        aria-label="Dashboard"
        data-testid="grid"
      >
        <GridItem as="article" ref={itemRef} data-testid="item">
          Summary
        </GridItem>
      </Grid>,
    );
    expect(screen.getByTestId("grid").tagName).toBe("SECTION");
    expect(gridRef.current).toBe(screen.getByTestId("grid"));
    expect(screen.getByTestId("item").tagName).toBe("ARTICLE");
    expect(itemRef.current).toBe(screen.getByTestId("item"));
  });

  it("emits responsive tracks and placement without leaking custom props", () => {
    render(
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, minmax(0, 1fr))" }}
        autoRows="minmax(4rem, auto)"
        gap={{ base: 8, sm: "1rem" }}
        inline
        data-testid="grid"
      >
        <GridItem
          colSpan={{ base: 1, md: 2 }}
          rowSpan={2}
          colStart={2}
          data-testid="item"
        />
      </Grid>,
    );
    const grid = screen.getByTestId("grid");
    const item = screen.getByTestId("item");
    expect(grid.style.getPropertyValue("--ec-grid-template-columns-md")).toBe(
      "repeat(3, minmax(0, 1fr))",
    );
    expect(grid.style.getPropertyValue("--ec-grid-gap-base")).toBe("8px");
    expect(grid.style.getPropertyValue("--ec-grid-gap-sm")).toBe("1rem");
    expect(grid.className).toContain("ec-grid--inline");
    expect(grid.hasAttribute("templateColumns")).toBe(false);
    expect(item.style.getPropertyValue("--ec-grid-item-column-md")).toBe(
      "span 2 / span 2",
    );
    expect(item.style.getPropertyValue("--ec-grid-item-row-base")).toBe(
      "span 2 / span 2",
    );
    expect(
      item.style.getPropertyValue("--ec-grid-item-column-start-base"),
    ).toBe("2");
    expect(item.hasAttribute("colSpan")).toBe(false);
  });

  it("uses native style overrides and rejects invalid span values", () => {
    render(
      <Grid gap={8} style={{ gap: 20 }} data-testid="grid">
        <GridItem
          column="2 / 4"
          style={{ gridColumn: "1 / 2" }}
          data-testid="item"
        />
      </Grid>,
    );
    expect(screen.getByTestId("grid").style.gap).toBe("20px");
    expect(screen.getByTestId("item").style.gridColumn).toBe("1 / 2");
    expect(() => render(<GridItem colSpan={0} />)).toThrow(RangeError);
    expect(() => render(<Grid gap={Infinity} />)).toThrow(RangeError);
  });
});
