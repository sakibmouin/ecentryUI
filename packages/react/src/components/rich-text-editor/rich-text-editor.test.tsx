// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { RichTextEditor } from "./rich-text-editor.js";

afterEach(cleanup);

describe("RichTextEditor", () => {
  const state = (text: string) =>
    JSON.stringify({
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text,
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    });

  it("starts with escaped text and a keyboard accessible formatting toolbar", async () => {
    render(
      <RichTextEditor
        label="Article body"
        initialText="<script>alert(1)</script>"
      />,
    );
    const editor = await screen.findByRole("textbox", { name: "Article body" });
    expect(editor.textContent).toBe("<script>alert(1)</script>");
    expect(editor.querySelector("script")).toBeNull();
    expect(screen.getByRole("toolbar", { name: "Formatting" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Bold" })).toBeTruthy();
  });

  it("locks the editor and toolbar when disabled", async () => {
    render(<RichTextEditor label="Article body" disabled />);
    const editor = await screen.findByRole("textbox", { name: "Article body" });
    expect(editor.getAttribute("contenteditable")).toBe("false");
    expect(
      (screen.getByRole("button", { name: "Bold" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    fireEvent.keyDown(editor, { key: "Escape" });
  });

  it("renders read-only content without formatting controls", async () => {
    render(
      <RichTextEditor label="Article body" initialText="Saved" readOnly />,
    );
    const editor = await screen.findByRole("textbox", { name: "Article body" });
    expect(editor.textContent).toBe("Saved");
    expect(editor.getAttribute("contenteditable")).toBe("false");
    expect(
      (screen.getByRole("button", { name: "Italic" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  });

  it("accepts serialized initial and controlled values", async () => {
    const view = render(
      <RichTextEditor label="Article body" defaultValue={state("Draft")} />,
    );
    expect((await screen.findByRole("textbox")).textContent).toBe("Draft");
    view.rerender(
      <RichTextEditor label="Article body" value={state("Updated")} />,
    );
    expect((await screen.findByRole("textbox")).textContent).toBe("Updated");
  });

  it("lets Escape leave the editor", async () => {
    render(<RichTextEditor label="Article body" />);
    const editor = await screen.findByRole("textbox");
    (editor as HTMLElement).focus();
    expect(document.activeElement).toBe(editor);
    fireEvent.keyDown(editor, { key: "Escape" });
    expect(document.activeElement).not.toBe(editor);
  });
});
