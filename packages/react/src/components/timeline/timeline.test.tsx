// @vitest-environment jsdom
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Timeline } from "./timeline.js";

afterEach(cleanup);

it("renders entries in order with machine-readable time and a current entry", () => {
  render(
    <Timeline
      aria-label="Shipment"
      currentId="transit"
      items={[
        {
          id: "packed",
          title: "Packed",
          time: { dateTime: "2026-03-14", label: "March 14" },
        },
        {
          id: "transit",
          title: "In transit",
          description: <a href="/track">Track shipment</a>,
        },
      ]}
    />,
  );
  const list = screen.getByRole("list", { name: "Shipment" });
  const [packed, transit] = within(list).getAllByRole("listitem");
  expect(list.tagName).toBe("OL");
  expect(packed?.querySelector("time")?.dateTime).toBe("2026-03-14");
  expect(transit?.getAttribute("aria-current")).toBe("true");
  expect(screen.getByRole("link", { name: "Track shipment" })).toBeTruthy();
});
