// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Avatar } from "./avatar.js";

afterEach(cleanup);
describe("Avatar", () => {
  it("shows an accessible image and falls back when loading fails", () => {
    const ref = createRef<HTMLSpanElement>();
    const { rerender } = render(
      <Avatar ref={ref} name="Ada Lovelace" src="/ada.png" />,
    );
    const avatar = screen.getByRole("img", { name: "Ada Lovelace" });
    expect(ref.current).toBe(avatar);
    fireEvent.error(avatar.querySelector("img")!);
    expect(avatar.textContent).toBe("AL");
    rerender(<Avatar name="Ada Lovelace" src="/grace.png" />);
    expect(avatar.querySelector("img")?.getAttribute("src")).toBe("/grace.png");
  });
  it("shows a busy placeholder and accepts custom fallback", () => {
    const { rerender } = render(<Avatar name="Sam Lee" loading />);
    expect(
      screen.getByRole("img", { name: "Sam Lee" }).getAttribute("aria-busy"),
    ).toBe("true");
    rerender(<Avatar name="Sam Lee" fallback="S" size="lg" />);
    expect(screen.getByRole("img", { name: "Sam Lee" }).textContent).toBe("S");
  });
});
