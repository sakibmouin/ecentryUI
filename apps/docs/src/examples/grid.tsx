import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import {
  Grid,
  GridItem,
} from "../../../../packages/react/src/components/grid/grid.js";
import "../../../../packages/react/src/components/grid/grid.css";

export function GridExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="grid-demo" role="region" aria-label="Grid examples">
        <span className="grid-demo-label">RESPONSIVE TRACKS AND SPANS</span>
        <Grid
          as="section"
          aria-label="Dashboard layout"
          templateColumns={{
            base: "minmax(0, 1fr)",
            sm: "repeat(3, minmax(0, 1fr))",
          }}
          gap={{ base: 12, sm: 16 }}
          className="grid-demo-layout"
          data-testid="responsive-grid"
        >
          <GridItem
            as="article"
            colSpan={{ base: 1, sm: 2 }}
            className="grid-demo-card grid-demo-feature"
            data-testid="featured-grid-item"
          >
            <strong>Overview</strong>
            <span>Two tracks on wider screens</span>
          </GridItem>
          <GridItem as="article" className="grid-demo-card">
            <strong>Activity</strong>
            <span>One track</span>
          </GridItem>
          <GridItem as="article" className="grid-demo-card">
            <strong>Projects</strong>
            <span>One track</span>
          </GridItem>
          <GridItem
            as="article"
            colSpan={{ base: 1, sm: 2 }}
            className="grid-demo-card"
          >
            <strong>Latest updates</strong>
            <span>Space for more detail</span>
          </GridItem>
        </Grid>
        <span className="grid-demo-label">RTL PLACEMENT</span>
        <Grid
          dir="rtl"
          templateColumns="repeat(3, minmax(0, 1fr))"
          gap={8}
          className="grid-demo-rtl"
          data-testid="rtl-grid"
        >
          <GridItem className="grid-demo-chip">الأول</GridItem>
          <GridItem className="grid-demo-chip">الثاني</GridItem>
          <GridItem className="grid-demo-chip">الثالث</GridItem>
        </Grid>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
