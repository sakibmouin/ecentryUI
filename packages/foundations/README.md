# Design foundations

`@ecentry/foundations` defines the token schema, resolves values for light and dark appearances, and generates scoped CSS. Its optional React subpath manages appearance without adding React to CSS-only consumers.

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

Use `renderResponsiveCss(theme, ".layout", { "padding-inline-start": { base: "8px", md: "24px" } })` for breakpoint rules in the component layer. Breakpoints come from `breakpoints.*` tokens and are ordered by width. Use logical CSS properties for RTL layouts. Add `ec-focus-ring` to interactive elements for a visible keyboard focus outline. Generated CSS adjusts that outline in high contrast mode and sets motion duration tokens to `0ms` when reduced motion is requested.

## React appearance

```tsx
import {
  AppearanceProvider,
  AppearancePortal,
  useAppearance,
} from "@ecentry/foundations/react";

<AppearanceProvider defaultAppearance="system" storageKey="app-appearance">
  <App />
</AppearanceProvider>;
```

`useAppearance()` returns the selected mode, resolved light/dark value, and `setAppearance`. Pass `appearance` and `onAppearanceChange` for controlled use. A nested provider can force an appearance; render overlays through `AppearancePortal` so they keep that scope after moving to `document.body`. The provider emits its scoped CSS and a small pre-hydration script before children, so system or stored appearance can apply before first paint. Pass `nonce` when your content security policy requires one. Storage is used only when `storageKey` is supplied and appearance is uncontrolled.

Pass `direction="rtl"` on a provider for right-to-left layout. Nested providers inherit direction unless they specify their own, and portals keep the nearest provider's direction.

The React subpath is a client component entry point, so a Next.js Server Component can render `AppearanceProvider` directly while passing serializable theme tokens and client component children.
