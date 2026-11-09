"use client";

import { Button } from "../components/ui/button/index";
import { Input } from "../components/ui/input/index";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog/index";
import { AbsoluteCenter } from "../components/ui/absolute-center/index";

export function ComponentsDemo() {
  return (
    <section aria-label="Installed components">
      <Button>Installed button</Button>
      <label>
        Installed input
        <Input defaultValue="Ready" />
      </label>
      <DialogRoot>
        <DialogTrigger>Installed dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Installed dialog title</DialogTitle>
          <DialogDescription>Rendered after hydration.</DialogDescription>
          <DialogClose>Close dialog</DialogClose>
        </DialogContent>
      </DialogRoot>
      <div
        style={{ position: "relative", width: 200, height: 100 }}
        data-testid="absolute-parent"
      >
        <AbsoluteCenter>Installed center</AbsoluteCenter>
      </div>
    </section>
  );
}
