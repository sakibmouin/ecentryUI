// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { FileUpload } from "./file-upload.js";

afterEach(cleanup);
describe("FileUpload", () => {
  it("selects, validates, removes, and resets files", () => {
    render(
      <form>
        <FileUpload label="Attachment" name="attachment" maxSize={4} />
        <button type="reset">Reset</button>
      </form>,
    );
    const input = screen.getByLabelText("Attachment") as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        files: [new File(["large"], "large.txt", { type: "text/plain" })],
      },
    });
    expect(screen.getByRole("alert").textContent).toContain("at most 4");
    fireEvent.change(input, {
      target: { files: [new File(["ok"], "ok.txt", { type: "text/plain" })] },
    });
    expect(screen.getByText("ok.txt")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Remove ok.txt" }));
    expect(screen.queryByText("ok.txt")).toBeNull();
    fireEvent.change(input, {
      target: { files: [new File(["ok"], "ok.txt")] },
    });
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.queryByText("ok.txt")).toBeNull();
  });
  it("accepts dropped files and reports controlled changes", () => {
    const onFilesChange = vi.fn();
    const file = new File(["ok"], "ok.txt", { type: "text/plain" });
    const { container } = render(
      <FileUpload
        label="Files"
        files={[]}
        multiple
        accept=".txt"
        onFilesChange={onFilesChange}
      />,
    );
    fireEvent.drop(container.querySelector(".ec-file-upload__dropzone")!, {
      dataTransfer: { files: [file] },
    });
    expect(onFilesChange).toHaveBeenCalledWith([file]);
    fireEvent.drop(container.querySelector(".ec-file-upload__dropzone")!, {
      dataTransfer: {
        files: [new File(["no"], "bad.png", { type: "image/png" })],
      },
    });
    expect(screen.getByRole("alert").textContent).toBe(
      "File type is not accepted",
    );
  });
});
