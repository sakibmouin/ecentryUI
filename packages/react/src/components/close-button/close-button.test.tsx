// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { CloseButton } from "./close-button.js";
afterEach(cleanup);
describe("CloseButton", () => {
  it("activates as a labeled native button and forwards a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const onClick = vi.fn();
    render(<CloseButton ref={ref} onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Close" });
    expect(ref.current).toBe(button);
    expect(button.getAttribute("type")).toBe("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
  it("blocks disabled and loading activation", () => {
    const onClick = vi.fn();
    render(
      <>
        <CloseButton aria-label="Dismiss" disabled onClick={onClick} />
        <CloseButton aria-label="Saving" loading onClick={onClick} />
      </>,
    );
    const disabled = screen.getByRole("button", {
      name: "Dismiss",
    }) as HTMLButtonElement;
    const loading = screen.getByRole("button", {
      name: "Saving",
    }) as HTMLButtonElement;
    expect(disabled.disabled).toBe(true);
    expect(loading.disabled).toBe(true);
    expect(loading.getAttribute("aria-busy")).toBe("true");
    fireEvent.click(disabled);
    fireEvent.click(loading);
    expect(onClick).not.toHaveBeenCalled();
  });
});
