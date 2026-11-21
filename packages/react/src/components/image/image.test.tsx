// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Image } from "./image.js";

afterEach(cleanup);
describe("Image", () => {
  it("renders a named image and forwards its ref", () => {
    const ref = createRef<HTMLImageElement>();
    render(<Image ref={ref} src="/photo.png" alt="Landscape" fit="contain" />);
    const image = screen.getByRole("img", { name: "Landscape" });
    expect(ref.current).toBe(image);
    expect(image.getAttribute("data-fit")).toBe("contain");
  });
  it("shows a named fallback and recovers on source change", () => {
    const { rerender } = render(
      <Image src="/missing.png" alt="Portrait" fallback="Unavailable" />,
    );
    fireEvent.error(screen.getByRole("img", { name: "Portrait" }));
    expect(screen.getByRole("img", { name: "Portrait" }).textContent).toBe(
      "Unavailable",
    );
    rerender(<Image src="/other.png" alt="Portrait" fallback="Unavailable" />);
    expect(screen.getByRole("img", { name: "Portrait" }).tagName).toBe("IMG");
  });
});
