# React component contract

This contract applies to the first Button, Input and Dialog slices and guides later components. Public props are declared in `packages/react/src/contracts.ts`; each implementation must use these types and keep source, styles, metadata and tests in its component directory.

## Shared rules

- Use native element props and typed refs. Design props are `variant`, `size` and `color` when relevant; the default case requires no configuration.
- Keep `className` on the rendered root. Compound parts accept their own `className`. Expose stable `data-ec-*` state attributes for styling rather than requiring private DOM selectors.
- Keep callbacks after the native event and before internal state changes. Do not fire callbacks for disabled actions. Value controls expose `value`, `defaultValue` and `onValueChange`; disclosure controls use `open`, `defaultOpen` and `onOpenChange`.
- Use native DOM semantics, labels, focus and form participation. Avoid `asChild` unless the cloned element keeps the expected semantics, event sequence and ref.

## First component decisions

| Component | DOM and slots                                                                                    | Defaults and states                                                                                                  | Interaction boundary                                                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Button    | Native `button`; root only                                                                       | Solid, medium, brand; outline/ghost/text, three sizes, neutral/brand/danger; hover, active, focus, disabled, loading | Native Enter/Space and form behavior; loading disables activation, with an announced label. Icon-only use requires an accessible name.                                               |
| Input     | Native `input`; root only                                                                        | Outline, medium; filled/flushed, three sizes; hover, focus, disabled, read-only, invalid, required                   | Native input/change, form reset and autofill; `onValueChange` receives the new string and React change event after `onChange`. Pair with label/help/error IDs.                       |
| Dialog    | `Root`, `Trigger`, `Content`, `Title`, `Description`, `Close`; `Content` renders native `dialog` | Modal by default; controlled/uncontrolled; closed/open, focus, nested, light/dark, RTL, reduced motion               | Use `showModal()` for modal top layer and `show()` for nonmodal. Handle Escape through `cancel`, restore trigger focus, label with Title, and keep the topmost nested dialog active. |

## Primitive review

Button and Input use browser controls because they already provide keyboard activation, native form behavior and typed refs. Dialog uses the browser's `HTMLDialogElement` with a consumer-owned wrapper. Native `showModal()` provides modal top layer, inert background, and initial focus. Browser behavior does not cover our full contract: implementation must prove controlled state synchronization, initial focus choice, focus restoration, nested layers, outside interaction and SSR hydration in real-browser tests. A headless dialog package is a fallback if these tests expose an unsolved browser gap; adding one would add a consumer dependency and must preserve source ownership. This decision is specific to Dialog and does not preselect primitives for other widgets.

References: [HTML dialog behavior](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog), [WAI-ARIA modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), [WCAG dialog technique](https://www.w3.org/WAI/WCAG22/Techniques/html/H102).
