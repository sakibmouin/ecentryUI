import type { ComponentPropsWithRef, ReactNode } from "react";
export type { ButtonProps } from "./components/button/button.js";
export type { InputProps } from "./components/input/input.js";

export type ComponentSize = "sm" | "md" | "lg";
export type ComponentColor = "neutral" | "brand" | "danger";

export type DialogChangeReason =
  "trigger" | "close" | "escape" | "backdrop" | "programmatic";

export interface DialogChangeDetail {
  reason: DialogChangeReason;
  event?: Event;
}

export interface DialogRootProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, detail: DialogChangeDetail) => void;
  modal?: boolean;
}

export type DialogTriggerProps = ComponentPropsWithRef<"button">;
export type DialogCloseProps = ComponentPropsWithRef<"button">;

export interface DialogContentProps extends Omit<
  ComponentPropsWithRef<"dialog">,
  "open" | "onClose"
> {
  size?: ComponentSize;
  closeOnBackdrop?: boolean;
}

export type DialogTitleProps = ComponentPropsWithRef<"h2">;
export type DialogDescriptionProps = ComponentPropsWithRef<"p">;
