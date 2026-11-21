// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Skeleton } from "./skeleton.js";
afterEach(cleanup);
describe("Skeleton", () => {
  it("hides decorative loading shape", () => {
    render(<Skeleton data-testid="placeholder" width={200} height={20} />);
    const placeholder = screen.getByTestId("placeholder");
    expect(placeholder.getAttribute("aria-hidden")).toBe("true");
    expect(placeholder.getAttribute("style")).toContain("width: 200px");
  });
  it("announces named loading and reveals content", () => {
    const { rerender } = render(
      <Skeleton label="Loading profile">Profile</Skeleton>,
    );
    expect(
      screen.getByRole("status", { name: "Loading profile" }),
    ).toBeTruthy();
    rerender(
      <Skeleton loading={false} label="Loading profile">
        Profile
      </Skeleton>,
    );
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.getByText("Profile")).toBeTruthy();
  });
});
