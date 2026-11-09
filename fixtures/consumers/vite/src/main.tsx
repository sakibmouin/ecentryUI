import { createRoot } from "react-dom/client";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { createTheme } from "@ecentry/foundations";
import { Sample } from "./components/ui/sample/index.js";
import { Button } from "./components/ui/button/index.js";
import { Input } from "./components/ui/input/index.js";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog/index.js";

const theme = createTheme({
  tokens: { "colors.ink": "#142d24" },
  semanticTokens: {
    "colors.text": { light: "{colors.ink}", dark: "#f7fff9" },
  },
});

createRoot(document.getElementById("root")!).render(
  <AppearanceProvider theme={theme} defaultAppearance="light">
    <Sample />
    <Button>Installed button</Button>
    <label>
      Installed input
      <Input name="installed" defaultValue="Ready" />
    </label>
    <DialogRoot>
      <DialogTrigger>Installed dialog</DialogTrigger>
      <DialogContent>
        <DialogTitle>Installed dialog title</DialogTitle>
        <DialogDescription>Source-owned interaction.</DialogDescription>
        <DialogClose>Close dialog</DialogClose>
      </DialogContent>
    </DialogRoot>
  </AppearanceProvider>,
);
