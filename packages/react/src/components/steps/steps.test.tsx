// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Steps } from "./steps.js";

afterEach(cleanup);

const items = [
  { id: "details", label: "Details", content: <p>Enter details</p> },
  { id: "shipping", label: "Shipping", disabled: true },
  { id: "review", label: "Review", content: <p>Check details</p> },
  { id: "finish", label: "Finish" },
];

it("advances in linear order, skipping disabled steps without losing focus", () => {
  render(<Steps label="Checkout" items={items} />);
  expect(
    screen
      .getByRole("button", { name: "Details" })
      .getAttribute("aria-current"),
  ).toBe("step");
  expect(
    (screen.getByRole("button", { name: "Finish" }) as HTMLButtonElement)
      .disabled,
  ).toBe(true);
  const next = screen.getByRole("button", { name: "Next" });
  next.focus();
  fireEvent.click(next);
  expect(document.activeElement).toBe(next);
  expect(screen.getByText("Check details")).toBeTruthy();
  expect(
    screen.getByRole("button", { name: "Review" }).getAttribute("aria-current"),
  ).toBe("step");
  const progress = screen.getByRole<HTMLProgressElement>("progressbar");
  expect(progress.value).toBe(2);
  expect(progress.max).toBe(3);
});

it("requests controlled changes and moves focus with RTL arrows and Home/End", () => {
  const onValueChange = vi.fn();
  render(
    <Steps
      label="Checkout"
      dir="rtl"
      items={items}
      value="details"
      onValueChange={onValueChange}
      linear={false}
    />,
  );
  const details = screen.getByRole("button", { name: "Details" });
  const review = screen.getByRole("button", { name: "Review" });
  const finish = screen.getByRole("button", { name: "Finish" });
  details.focus();
  fireEvent.keyDown(details, { key: "ArrowLeft" });
  expect(document.activeElement).toBe(review);
  fireEvent.keyDown(review, { key: "End" });
  expect(document.activeElement).toBe(finish);
  fireEvent.click(finish);
  expect(onValueChange).toHaveBeenCalledWith("finish");
  expect(details.getAttribute("aria-current")).toBe("step");
  fireEvent.keyDown(finish, { key: "Home" });
  expect(document.activeElement).toBe(details);
});
