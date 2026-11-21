// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Marquee } from "./marquee.js";
afterEach(cleanup);
describe("Marquee", () => {
  it("duplicates content without duplicate accessibility text", () => {
    render(
      <Marquee duration={12}>
        <span>New releases</span>
      </Marquee>,
    );
    expect(screen.getAllByText("New releases")).toHaveLength(2);
    expect(
      screen
        .getAllByText("New releases")[1]
        ?.parentElement?.getAttribute("aria-hidden"),
    ).toBe("true");
    expect(
      screen
        .getAllByText("New releases")[1]
        ?.parentElement?.hasAttribute("inert"),
    ).toBe(true);
    expect(
      document.querySelector(".ec-marquee__track")?.getAttribute("style"),
    ).toContain("12s");
  });
  it("pauses and resumes by button", () => {
    render(<Marquee>Updates</Marquee>);
    fireEvent.click(screen.getByRole("button", { name: "Pause animation" }));
    expect(
      document.querySelector(".ec-marquee")?.getAttribute("data-paused"),
    ).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: "Resume animation" }));
    expect(
      document.querySelector(".ec-marquee")?.getAttribute("data-paused"),
    ).toBe("false");
  });
});
