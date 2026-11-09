import { AppearanceProvider } from "@ecentry/foundations/react";
import { createTheme } from "@ecentry/foundations";
import { Sample } from "../components/ui/sample/index";

const theme = createTheme({
  tokens: { "colors.ink": "#142d24" },
  semanticTokens: {
    "colors.text": { light: "{colors.ink}", dark: "#f7fff9" },
  },
});

export default function Page() {
  return (
    <main>
      <h1>Next consumer fixture</h1>
      <AppearanceProvider theme={theme} defaultAppearance="light">
        <Sample />
      </AppearanceProvider>
    </main>
  );
}
