import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../../../packages/react/src/components/dialog/dialog.js";
import "../../../../packages/react/src/components/dialog/dialog.css";

export function DialogExample() {
  const [dark, setDark] = useState(false);
  const [controlledOpen, setControlledOpen] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="dialog-showcase"
        role="region"
        aria-label="Dialog examples"
      >
        <p>Open a dialog to review focus, nesting, and dismissal behavior.</p>
        <div className="dialog-showcase-actions">
          <DialogRoot>
            <DialogTrigger>Open dialog</DialogTrigger>
            <DialogContent>
              <DialogTitle>Project settings</DialogTitle>
              <DialogDescription>
                Review the details before you continue.
              </DialogDescription>
              <label className="dialog-field">
                Project name
                <input defaultValue="ecentryUI" />
              </label>
              <DialogRoot>
                <DialogTrigger>Advanced settings</DialogTrigger>
                <DialogContent size="sm">
                  <DialogTitle>Advanced settings</DialogTitle>
                  <DialogDescription>
                    This dialog opens above the first one.
                  </DialogDescription>
                  <DialogClose>Back to project</DialogClose>
                </DialogContent>
              </DialogRoot>
              <div className="dialog-footer">
                <DialogClose>Done</DialogClose>
              </div>
            </DialogContent>
          </DialogRoot>
          <DialogRoot open={controlledOpen} onOpenChange={setControlledOpen}>
            <DialogTrigger>Controlled dialog</DialogTrigger>
            <DialogContent size="lg">
              <DialogTitle>Controlled dialog</DialogTitle>
              <DialogDescription>
                The open state is stored in the example and updated by the
                dialog.
              </DialogDescription>
              <DialogClose>Close</DialogClose>
            </DialogContent>
          </DialogRoot>
          <button
            className="dialog-theme-toggle"
            onClick={() => setDark(!dark)}
          >
            {dark ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </div>
    </AppearanceProvider>
  );
}
