// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { DownloadTrigger } from "./download-trigger.js";
afterEach(cleanup);
describe("DownloadTrigger", () => {
  it("uses a real download link with a filename", () => {
    render(
      <DownloadTrigger href="/report.txt" filename="report.txt">
        Download report
      </DownloadTrigger>,
    );
    const link = screen.getByRole("link", { name: "Download report" });
    expect(link.getAttribute("href")).toBe("/report.txt");
    expect(link.getAttribute("download")).toBe("report.txt");
  });
  it("locks navigation while disabled or loading", () => {
    const onClick = vi.fn();
    render(
      <>
        <DownloadTrigger href="/a" disabled onClick={onClick}>
          Disabled
        </DownloadTrigger>
        <DownloadTrigger href="/b" loading onClick={onClick}>
          Loading
        </DownloadTrigger>
      </>,
    );
    const disabled = screen.getByText("Disabled");
    const loading = screen.getByText("Loading");
    expect(disabled.getAttribute("href")).toBeNull();
    expect(loading.getAttribute("href")).toBeNull();
    expect(loading.getAttribute("aria-busy")).toBe("true");
    fireEvent.click(disabled);
    fireEvent.click(loading);
    expect(onClick).not.toHaveBeenCalled();
  });
});
