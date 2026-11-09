import { describe, expectTypeOf, it } from "vitest";
import type {
  ButtonProps,
  DialogContentProps,
  DialogRootProps,
  InputProps,
} from "./index.js";

describe("React public prop contracts", () => {
  it("keeps native refs and bounded design variants", () => {
    expectTypeOf<ButtonProps["ref"]>().toEqualTypeOf<
      React.Ref<HTMLButtonElement> | undefined
    >();
    expectTypeOf<InputProps["ref"]>().toEqualTypeOf<
      React.Ref<HTMLInputElement> | undefined
    >();
    expectTypeOf<ButtonProps["variant"]>().toEqualTypeOf<
      "solid" | "outline" | "ghost" | "text" | undefined
    >();
    expectTypeOf<DialogContentProps["ref"]>().toEqualTypeOf<
      React.Ref<HTMLDialogElement> | undefined
    >();
  });

  it("uses value and open conventions with detail events", () => {
    expectTypeOf<InputProps["value"]>().toEqualTypeOf<
      string | number | readonly string[] | undefined
    >();
    expectTypeOf<DialogRootProps["open"]>().toEqualTypeOf<
      boolean | undefined
    >();
    expectTypeOf<DialogRootProps["defaultOpen"]>().toEqualTypeOf<
      boolean | undefined
    >();
    expectTypeOf<
      NonNullable<DialogRootProps["onOpenChange"]>
    >().parameters.toEqualTypeOf<
      [
        open: boolean,
        detail: {
          reason: "trigger" | "close" | "escape" | "backdrop" | "programmatic";
          event?: Event;
        },
      ]
    >();
  });
});
