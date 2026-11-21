// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Stat } from "./stat.js";
afterEach(cleanup);
describe("Stat", () => {
  it("associates a metric with its label and context", () => {
    const ref = createRef<HTMLDListElement>();
    render(
      <Stat
        ref={ref}
        label="Revenue"
        value="$12,480"
        trend="Up 12%"
        trendTone="positive"
        helpText="vs last month"
      />,
    );
    expect(ref.current?.tagName).toBe("DL");
    expect(screen.getByText("Revenue").tagName).toBe("DT");
    expect(screen.getByText("$12,480").tagName).toBe("DD");
    expect(screen.getByText("Up 12%").getAttribute("data-tone")).toBe(
      "positive",
    );
    expect(screen.getByText("vs last month")).toBeTruthy();
  });
  it("marks loading without hiding the current value", () => {
    render(<Stat label="Visitors" value="1,200" loading />);
    expect(
      screen.getByText("Visitors").closest("dl")?.getAttribute("aria-busy"),
    ).toBe("true");
    expect(screen.getByText("1,200")).toBeTruthy();
  });
});
