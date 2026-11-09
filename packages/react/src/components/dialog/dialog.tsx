// SPDX-License-Identifier: MIT
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type {
  ComponentPropsWithRef,
  MouseEvent,
  KeyboardEvent,
  ReactNode,
  Ref,
  SyntheticEvent,
} from "react";

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
  size?: "sm" | "md" | "lg";
  closeOnBackdrop?: boolean;
}
export type DialogTitleProps = ComponentPropsWithRef<"h2">;
export type DialogDescriptionProps = ComponentPropsWithRef<"p">;

interface DialogContextValue {
  open: boolean;
  modal: boolean;
  contentId: string;
  titleId: string;
  descriptionId: string;
  descriptionPresent: boolean;
  setDescriptionPresent: (present: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  change: (open: boolean, detail: DialogChangeDetail) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) throw new Error("Dialog parts must be inside DialogRoot");
  return context;
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value);
  else if (ref) ref.current = value;
}

export function DialogRoot({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  modal = true,
}: DialogRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [descriptionPresent, setDescriptionPresent] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  function change(nextOpen: boolean, detail: DialogChangeDetail) {
    if (nextOpen === open) return;
    if (controlledOpen === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen, detail);
  }

  return (
    <DialogContext.Provider
      value={{
        open,
        modal,
        contentId: `${id}-content`,
        titleId: `${id}-title`,
        descriptionId: `${id}-description`,
        descriptionPresent,
        setDescriptionPresent,
        triggerRef,
        change,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  function DialogTrigger(
    { onClick, type = "button", className, ...rest },
    forwardedRef,
  ) {
    const dialog = useDialog();
    return (
      <button
        {...rest}
        ref={(element) => {
          dialog.triggerRef.current = element;
          assignRef(forwardedRef, element);
        }}
        type={type}
        className={
          className ? `ec-dialog-trigger ${className}` : "ec-dialog-trigger"
        }
        aria-haspopup="dialog"
        aria-expanded={dialog.open}
        aria-controls={dialog.contentId}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented)
            dialog.change(true, {
              reason: "trigger",
              event: event.nativeEvent,
            });
        }}
      />
    );
  },
);

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  function DialogClose(
    { onClick, type = "button", className, ...rest },
    forwardedRef,
  ) {
    const dialog = useDialog();
    return (
      <button
        {...rest}
        ref={forwardedRef}
        type={type}
        className={
          className ? `ec-dialog-close ${className}` : "ec-dialog-close"
        }
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented)
            dialog.change(false, { reason: "close", event: event.nativeEvent });
        }}
      />
    );
  },
);

export const DialogContent = forwardRef<HTMLDialogElement, DialogContentProps>(
  function DialogContent(
    {
      size = "md",
      closeOnBackdrop = true,
      onCancel,
      onClick,
      onKeyDown,
      children,
      className,
      ...rest
    },
    forwardedRef,
  ) {
    const dialog = useDialog();
    const elementRef = useRef<HTMLDialogElement>(null);
    const wasOpen = useRef(false);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;
      if (dialog.open && !element.open) {
        if (dialog.modal) element.showModal();
        else element.show();
      } else if (!dialog.open && element.open) {
        element.close();
      }
      if (!dialog.open && wasOpen.current) {
        dialog.triggerRef.current?.focus();
      }
      wasOpen.current = dialog.open;
    }, [dialog.open, dialog.modal, dialog.triggerRef]);

    function handleCancel(event: SyntheticEvent<HTMLDialogElement, Event>) {
      event.stopPropagation();
      onCancel?.(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      dialog.change(false, { reason: "escape", event: event.nativeEvent });
    }

    function handleClick(event: MouseEvent<HTMLDialogElement>) {
      onClick?.(event);
      if (
        event.defaultPrevented ||
        !closeOnBackdrop ||
        event.target !== event.currentTarget
      )
        return;
      const rect = event.currentTarget.getBoundingClientRect();
      const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;
      if (outside)
        dialog.change(false, { reason: "backdrop", event: event.nativeEvent });
    }

    function handleClose(event: SyntheticEvent<HTMLDialogElement, Event>) {
      event.stopPropagation();
      if (dialog.open)
        dialog.change(false, {
          reason: "programmatic",
          event: event.nativeEvent,
        });
    }

    function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
      onKeyDown?.(event);
      if (
        event.defaultPrevented ||
        event.key !== "Tab" ||
        !dialog.modal ||
        (event.target instanceof Element &&
          event.target.closest("dialog") !== event.currentTarget)
      )
        return;
      const focusable = Array.from(
        event.currentTarget.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) {
        event.preventDefault();
        event.currentTarget.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    return (
      <dialog
        {...rest}
        id={dialog.contentId}
        ref={(element) => {
          elementRef.current = element;
          assignRef(forwardedRef, element);
        }}
        aria-labelledby={rest["aria-labelledby"] ?? dialog.titleId}
        aria-describedby={
          rest["aria-describedby"] ??
          (dialog.descriptionPresent ? dialog.descriptionId : undefined)
        }
        data-ec-size={size}
        className={className ? `ec-dialog ${className}` : "ec-dialog"}
        onCancel={handleCancel}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onClose={handleClose}
      >
        {children}
      </dialog>
    );
  },
);

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  function DialogTitle({ className, ...rest }, ref) {
    const dialog = useDialog();
    return (
      <h2
        {...rest}
        id={dialog.titleId}
        ref={ref}
        className={
          className ? `ec-dialog-title ${className}` : "ec-dialog-title"
        }
      />
    );
  },
);

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(function DialogDescription({ className, ...rest }, ref) {
  const dialog = useDialog();
  useEffect(() => {
    dialog.setDescriptionPresent(true);
    return () => dialog.setDescriptionPresent(false);
  }, [dialog.setDescriptionPresent]);
  return (
    <p
      {...rest}
      id={dialog.descriptionId}
      ref={ref}
      className={
        className
          ? `ec-dialog-description ${className}`
          : "ec-dialog-description"
      }
    />
  );
});
