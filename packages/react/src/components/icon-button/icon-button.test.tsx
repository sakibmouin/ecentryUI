// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { IconButton } from "./icon-button.js";
afterEach(cleanup);
describe("IconButton", () => {
  it("uses an accessible name and native button activation", () => {
    const ref = createRef<HTMLButtonElement>();
    const onClick = vi.fn();
    render(
      <IconButton
        ref={ref}
        aria-label="Favorite"
        icon={
          <svg>
            <path />
          </svg>
        }
        onClick={onClick}
      />,
    );
    const button = screen.getByRole("button", { name: "Favorite" });
    expect(ref.current).toBe(button);
    expect(button.getAttribute("type")).toBe("button");
    expect(
      button.querySelector("svg")?.parentElement?.getAttribute("aria-hidden"),
    ).toBe("true");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
  it("blocks disabled and loading activation", () => {
    const onClick = vi.fn();
    render(
      <>
        <IconButton aria-label="Disabled" icon="+" disabled onClick={onClick} />
        <IconButton aria-label="Saving" icon="+" loading onClick={onClick} />
      </>,
    );
    const disabled = screen.getByRole("button", {
      name: "Disabled",
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
