# Design foundations

`@ecentry/foundations` defines the token schema and resolves values for light and dark appearances. The package currently exposes token resolution; CSS generation and appearance management follow in later tasks.

```ts
import { createTheme, resolveTokens } from "@ecentry/foundations";

const theme = createTheme({
  tokens: { "colors.ink": "#19211c" },
  semanticTokens: {
    "colors.text": { light: "{colors.ink}", dark: "#ffffff" },
  },
});

resolveTokens(theme, "light")["colors.text"]; // "#19211c"
```

Token paths use lowercase dot-separated names such as `colors.surface.raised`. `{path}` references may appear inside values and can point to primitive or semantic tokens. `createTheme` checks both appearances for missing references and cycles and never changes the supplied object. `resolveTokens` returns a sorted, read-only path-to-value map. The default theme is exported as `defaultTheme`.
