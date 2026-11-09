# Spec: design-foundations

## Objective and scope

Provide one coherent visual system for all MVP React components. A consumer can adopt polished defaults immediately, replace tokens and component styles without forking behavior, and switch light/dark/system appearance without a flash or broken contrast.

## Public contract

- Export a versioned token schema with primitives for color, spacing, radii, type, shadows, borders, motion, and breakpoints; semantic role tokens must resolve per appearance. Validate missing references, cycles, and invalid CSS values with actionable errors.
- Provide a default theme and consumer theme configuration. Support extending and replacing token groups, component defaults, named variants, sizes, and slot styles. Define a predictable merge and cascade order: library defaults, consumer theme, component variant, instance overrides. Document every override point.
- Expose CSS custom properties with stable names and a configurable prefix. Define responsive values and state selectors once in the foundation contract; avoid requiring per-component custom style engines. A consumer can apply tokens from ordinary CSS, including outside React.
- Support light, dark, and system appearance, persistence when requested, nested forced appearance, SSR hydration, portals, and high-contrast preferences. The default provider must work without a framework-specific router or `next-themes` setup. Honor reduced motion.
- Publish visible focus styles and minimum touch targets as defaults. Text, icons, surfaces, disabled states, and focus indicators must be tested in both appearances against WCAG 2.2 AA criteria where applicable. Color pair validation should be available to maintainers and theme authors.
- Support LTR and RTL layouts through logical CSS properties and directional interaction contracts. Define z-index layers for overlays and composable motion tokens.

## Proposed structure and commands

Proposed workspace: `packages/foundations/` for schema, defaults, compiler, and CSS output; `packages/react/` consumes the contract. No application or package scripts exist yet. The implementation must add root scripts `npm run build`, `npm run lint`, `npm run typecheck`, and `npm test` with documented behavior, plus a theme fixture used by CI. The exact toolchain versions belong in the implementation plan after spec approval.

Use TypeScript, strict types, two-space indentation, and formatter-enforced style. Token names use semantic dot paths such as `colors.surface.raised`; CSS variables use a documented `--ec-` prefix. Public naming is stable within a major version.

## Acceptance and testing

1. Every component in `react-components` renders from the same default token set in light and dark mode; a consumer override changes the intended component/slot without specificity hacks.
2. The theme fixture proves token resolution, responsive output, variant precedence, invalid-reference errors, and deterministic CSS generation in unit tests.
3. Browser tests cover system preference changes, nested themes, portal appearance, SSR hydration, reduced motion, RTL, keyboard focus visibility, and color contrast. Screenshot baselines cover representative surfaces at desktop and mobile widths.
4. Theme configuration and token output are documented with copyable examples, a CSS-variable map, and migration notes for changes.

## Boundaries and open decisions

Always: use semantic HTML and standards-based CSS; preserve accessible defaults; test both appearances. Ask before changing the public token schema or adding runtime styling dependencies after approval. Never silently mutate consumer themes or require a hosted service. Open for approval: whether the MVP should expose a precompiled CSS-only consumption path in addition to the React provider; this spec proposes yes because future HTML/CSS support benefits from it.
