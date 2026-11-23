// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, expect, it, vi } from "vitest";
import { ClientOnly } from "./client-only.js";

afterEach(cleanup);

it("renders the fallback server side and evaluates the child only on the client", () => {
  const content = vi.fn(() => "Client ready");
  const example = <ClientOnly fallback="Waiting">{content}</ClientOnly>;
  expect(renderToString(example)).toContain("Waiting");
  expect(content).not.toHaveBeenCalled();
  render(example);
  expect(screen.getByText("Client ready")).toBeTruthy();
  expect(screen.queryByText("Waiting")).toBeNull();
});
