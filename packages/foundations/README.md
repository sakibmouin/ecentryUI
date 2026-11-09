# Design foundations

`@ecentry/foundations` defines the token schema, resolves values for light and dark appearances, and generates scoped CSS. Appearance management follows in a later task.

```ts
import {
  createTheme,
  renderThemeCss,
  resolveTokens,
} from "@ecentry/foundations";

const theme = createTheme({
  tokens: { "colors.ink": "#19211c" },
  semanticTokens: {
    "colors.text": { light: "{colors.ink}", dark: "#ffffff" },
  },
});

resolveTokens(theme, "light")["colors.text"]; // "#19211c"
renderThemeCss(theme, { scope: ".app" }); // CSS variables scoped to .app
```

Token paths use lowercase dot-separated names such as `colors.surface.raised`. `{path}` references may appear inside values and can point to primitive or semantic tokens. `createTheme` checks both appearances for missing references and cycles and never changes the supplied object. `resolveTokens` returns a sorted, read-only path-to-value map. The default theme is exported as `defaultTheme`.

`renderThemeCss` emits `--ec-` variables by default. Put `data-ec-theme="dark"` on the scope or a descendant to activate dark semantic values; a nested `data-ec-theme="light"` restores light values. Its layer order is `ec.reset`, `ec.tokens`, `ec.components`, `ec.variants`, then `ec.utilities`. Consumer rules outside a layer take precedence over normal layered rules.
