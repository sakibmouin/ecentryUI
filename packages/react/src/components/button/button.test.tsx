// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Button } from "./button.js";

afterEach(cleanup);

describe("Button", () => {
  it("renders a native button with stable defaults and a forwarded ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("type")).toBe("button");
    expect(button.getAttribute("data-ec-variant")).toBe("solid");
    expect(button.getAttribute("data-ec-size")).toBe("md");
    expect(button.getAttribute("data-ec-color")).toBe("brand");
    expect(ref.current).toBe(button);
  });

  it("uses native submit behavior and forwards design and DOM props", () => {
    render(
      <Button
        type="submit"
        variant="outline"
        size="sm"
        color="danger"
        className="custom"
        aria-label="Submit form"
      />,
    );
    const button = screen.getByRole("button", { name: "Submit form" });
    expect(button.getAttribute("type")).toBe("submit");
    expect(button.className).toContain("custom");
    expect(button.getAttribute("data-ec-variant")).toBe("outline");
    expect(button.getAttribute("data-ec-size")).toBe("sm");
    expect(button.getAttribute("data-ec-color")).toBe("danger");
  });

  it("locks activation and announces loading without losing its label", () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole("button", { name: /Save/ });
    expect(button.hasAttribute("disabled")).toBe(true);
    expect(button.getAttribute("aria-busy")).toBe("true");
    expect(screen.getByText("Loading")).toBeTruthy();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("respects disabled and custom loading text", () => {
    const onClick = vi.fn();
    render(
      <Button disabled loading loadingText="Saving" onClick={onClick}>
        Save
      </Button>,
    );
    expect(
      screen.getByRole("button", { name: /Saving/ }).hasAttribute("disabled"),
    ).toBe(true);
    expect(onClick).not.toHaveBeenCalled();
  });
});
