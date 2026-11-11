// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { CodeBlock } from "./code-block.js";

afterEach(cleanup);

describe("CodeBlock", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it("renders code as text and copies the exact safe content", async () => {
    const onCopy = vi.fn();
    const source = "<script>alert('no')</script>\nconst ready = true;";
    render(
      <CodeBlock onCopy={onCopy} data-testid="code-block">
        {source}
      </CodeBlock>,
    );
    expect(screen.getByRole("code").textContent).toBe(source);
    expect(screen.queryByRole("alert")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await vi.waitFor(() =>
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(source),
    );
    expect(onCopy).toHaveBeenCalledWith(source);
    await vi.waitFor(() =>
      expect(screen.getByRole("button", { name: "Copied" })).toBeTruthy(),
    );
  });

  it("supports uncontrolled collapse and keyboard activation", () => {
    render(
      <CodeBlock collapsible defaultOpen={false}>
        const value = 1;
      </CodeBlock>,
    );
    const toggle = screen.getByRole("button", { name: "Expand code" });
    const pre = screen.getByText("const value = 1;").closest("pre");
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(pre?.hidden).toBe(true);
    fireEvent.click(toggle);
    expect(
      screen
        .getByRole("button", { name: "Collapse code" })
        .getAttribute("aria-expanded"),
    ).toBe("true");
    expect(pre?.hidden).toBe(false);
  });

  it("respects controlled open state and reports requested changes", () => {
    const onOpenChange = vi.fn();
    render(
      <CodeBlock open={false} collapsible onOpenChange={onOpenChange}>
        controlled
      </CodeBlock>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Expand code" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(
      screen
        .getByRole("button", { name: "Expand code" })
        .getAttribute("aria-expanded"),
    ).toBe("false");
  });

  it("does not claim copy success when clipboard access is unavailable", () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });
    const onCopy = vi.fn();
    render(<CodeBlock onCopy={onCopy}>source</CodeBlock>);
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    expect(onCopy).not.toHaveBeenCalled();
    expect(screen.queryByRole("button", { name: "Copied" })).toBeNull();
  });

  it("does not report success when clipboard access is rejected", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("Permission denied"));
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    const onCopy = vi.fn();
    render(<CodeBlock onCopy={onCopy}>source</CodeBlock>);
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await vi.waitFor(() => expect(writeText).toHaveBeenCalledWith("source"));
    expect(onCopy).not.toHaveBeenCalled();
    expect(screen.queryByRole("button", { name: "Copied" })).toBeNull();
  });

  it("highlights JavaScript tokens while preserving the exact source text", () => {
    const source = 'const answer = "<script>"; // note';
    render(<CodeBlock language="javascript">{source}</CodeBlock>);
    const code = screen.getByRole("code");
    expect(code.textContent).toBe(source);
    expect(code.querySelector('[data-token="keyword"]')?.textContent).toBe(
      "const",
    );
    expect(code.querySelector('[data-token="string"]')?.textContent).toBe(
      '"<script>"',
    );
    expect(code.querySelector('[data-token="comment"]')?.textContent).toBe(
      "// note",
    );
    expect(code.querySelector("script")).toBeNull();
  });
});
