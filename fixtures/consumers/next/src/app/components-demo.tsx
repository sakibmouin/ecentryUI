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
    </section>
  );
}
