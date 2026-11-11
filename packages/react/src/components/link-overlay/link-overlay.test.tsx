// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { LinkBox, LinkOverlay } from "./link-overlay.js";
afterEach(cleanup);
describe("LinkOverlay", () => {
  it("provides a semantic card link and forwards the anchor ref", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <LinkBox>
        <h2>
          <LinkOverlay ref={ref} href="/project">
            Project
          </LinkOverlay>
        </h2>
      </LinkBox>,
    );
    const link = screen.getByRole("link", { name: "Project" });
    expect(link.getAttribute("href")).toBe("/project");
    expect(ref.current).toBe(link);
  });
  it("keeps secondary card actions separate", () => {
    render(
      <LinkBox>
        <LinkOverlay href="/project">Project</LinkOverlay>
        <button type="button">More</button>
      </LinkBox>,
    );
    expect(screen.getByRole("link", { name: "Project" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "More" })).toBeTruthy();
  });
});
