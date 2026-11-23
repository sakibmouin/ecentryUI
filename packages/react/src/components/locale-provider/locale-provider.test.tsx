// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { FormatByte } from "../format-byte/format-byte.js";
import { FormatNumber } from "../format-number/format-number.js";
import { LocaleProvider, useLocale } from "./locale-provider.js";

afterEach(cleanup);

it("applies locale and direction to descendants and lets them override locale", () => {
  function Probe() {
    return <p>{useLocale().direction}</p>;
  }
  render(
    <LocaleProvider locale="fr" direction="rtl" data-testid="locale">
      <FormatNumber value={1234.5} />
      <FormatByte value={1_500_000} />
      <LocaleProvider locale="en">
        <FormatNumber value={1234.5} locale="de" />
        <Probe />
      </LocaleProvider>
    </LocaleProvider>,
  );
  const root = screen.getByTestId("locale");
  expect(root.lang).toBe("fr");
  expect(root.dir).toBe("rtl");
  expect(root.textContent).toContain("1 234,5");
  expect(root.textContent).toContain("1,5 Mo");
  expect(root.textContent).toContain("1.234,5");
  expect(screen.getByText("rtl")).toBeTruthy();
});
