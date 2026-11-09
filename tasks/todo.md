# ecentryUI React MVP task list

Tasks are ordered by dependency. Each component task includes focused tests and a docs preview. `npm` commands become runnable after the workspace tasks. Checkboxes track implementation, not specification approval.

## Foundation

- [x] **T01 Capture visual and interaction baseline** (depends on None).
  - Acceptance: Record representative desktop/mobile, light/dark, focus, disabled, overlay and form states in ignored `.local/`; verify notes and screenshots exist.
  - Verify: Review `.local/reference/` screenshots and notes locally.
- [ ] **T02 Create npm workspace and baseline scripts** (depends on T01).
  - Acceptance: Add workspace packages, strict TS config, formatter/linter, Vitest and Playwright; a smoke test, typecheck, lint and build pass.
  - Verify: `npm ci && npm run build && npm run typecheck && npm run lint && npm test -- --run`.
- [ ] **T03 Implement token schema and resolver** (depends on T02).
  - Acceptance: Tokens, semantic aliases and validation reject missing references and cycles; output is deterministic.
  - Verify: `npm test -- --run packages/foundations`.

### Checkpoint after T03
- [ ] Unit tests, typecheck and workspace build pass.

- [ ] **T04 Implement CSS variables and style layers** (depends on T03).
  - Acceptance: Generate scoped variables, variant precedence and reset CSS; token override fixture passes.
  - Verify: `npm test -- --run packages/foundations`.
- [ ] **T05 Implement appearance provider** (depends on T04).
  - Acceptance: Light/dark/system, persistence, nested appearance, portal inheritance and SSR hydration pass.
  - Verify: `npm test -- --run packages/foundations && npm run test:e2e -- appearance`.
- [ ] **T06 Implement responsive, RTL and motion rules** (depends on T04).
  - Acceptance: Breakpoints, logical properties, focus ring, high contrast and reduced motion have fixture tests.
  - Verify: `npm test -- --run packages/foundations && npm run test:e2e -- foundations`.

### Checkpoint after T06
- [ ] Foundations tests, appearance browser flow and accessibility checks pass.

- [ ] **T07 Define React component contract and primitive gate** (depends on T05,T06).
  - Acceptance: Public prop conventions, slot contract and primitive evaluation for Button, Input and Dialog are reviewed; type tests pass.
  - Verify: `npm run typecheck && npm test -- --run packages/react`.
- [ ] **T08 Build registry schema and generator** (depends on T07).
  - Acceptance: Validate item IDs, hashes and dependency closure; generated payload equals canonical source.
  - Verify: `npm run registry:validate && npm test -- --run packages/registry-schema`.
- [ ] **T09 Build CLI init and add** (depends on T08).
  - Acceptance: Dry run and install write only declared files; a minimal fixture item can be installed.
  - Verify: `npm test -- --run packages/cli && npm run registry:validate`.

### Checkpoint after T09
- [ ] Registry validation and CLI fixture install pass.

- [ ] **T10 Build documentation shell and example harness** (depends on T02,T07).
  - Acceptance: Navigation, component routes, preview/code tabs and example compilation work.
  - Verify: `npm run build:docs && npm run test:e2e -- docs-shell`.
- [ ] **T11 Build Vite consumer fixture** (depends on T09).
  - Acceptance: Clean install, sample registry item import, theme override and production build pass.
  - Verify: `npm run test:consumer -- vite`.
- [ ] **T12 Build Next.js consumer fixture** (depends on T09).
  - Acceptance: Sample registry item SSR render, hydration and production build pass.
  - Verify: `npm run test:consumer -- next`.

### Checkpoint after T12
- [ ] Vite and Next.js consumer fixtures build cleanly.


## First complete slices

- [ ] **T013 Button component** (depends on T07,T08,T09,T10).
  - Files: `packages/react/src/components/button/button.tsx`, `button.css`, `button.test.tsx`, `index.ts`, `apps/docs/content/components/button.mdx`.
  - Acceptance: semantic behavior and theme states; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/button/button.test.tsx && npm run test:e2e -- button`.
- [ ] **T014 Input component** (depends on T07,T08,T09,T10).
  - Files: `packages/react/src/components/input/input.tsx`, `input.css`, `input.test.tsx`, `index.ts`, `apps/docs/content/components/input.mdx`.
  - Acceptance: semantic behavior and theme states; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/input/input.test.tsx && npm run test:e2e -- input`.
- [ ] **T015 Dialog behavior** (depends on T07,T08,T09,T10).
  - Files: `packages/react/src/components/dialog/dialog.tsx`, `dialog.test.tsx`.
  - Acceptance: modal focus trap, nesting, Escape and restoration; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/dialog/dialog.test.tsx`.
- [ ] **T016 Dialog presentation and docs** (depends on T015).
  - Files: `packages/react/src/components/dialog/dialog.css`, `index.ts`, `apps/docs/content/components/dialog.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- dialog`.

### Checkpoint: first slices
- [ ] Button, Input and Dialog install and render in Vite and Next.js; themes, keyboard flow, SSR and docs build pass.
- [ ] Run `npm run build && npm run typecheck && npm run lint && npm test -- --run && npm run registry:validate && npm run build:docs`.

## Remaining catalog waves


## Layout

- [ ] **T017 Absolute Center component** (depends on T016).
  - Files: `packages/react/src/components/absolute-center/absolute-center.tsx`, `absolute-center.css`, `absolute-center.test.tsx`, `index.ts`, `apps/docs/content/components/absolute-center.mdx`.
  - Acceptance: responsive layout, intrinsic sizing and RTL; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/absolute-center/absolute-center.test.tsx && npm run test:e2e -- absolute-center`.
- [ ] **T018 Aspect Ratio component** (depends on T016).
  - Files: `packages/react/src/components/aspect-ratio/aspect-ratio.tsx`, `aspect-ratio.css`, `aspect-ratio.test.tsx`, `index.ts`, `apps/docs/content/components/aspect-ratio.mdx`.
  - Acceptance: responsive layout, intrinsic sizing and RTL; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/aspect-ratio/aspect-ratio.test.tsx && npm run test:e2e -- aspect-ratio`.
- [ ] **T019 Bleed component** (depends on T016).
  - Files: `packages/react/src/components/bleed/bleed.tsx`, `bleed.css`, `bleed.test.tsx`, `index.ts`, `apps/docs/content/components/bleed.mdx`.
  - Acceptance: responsive layout, intrinsic sizing and RTL; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/bleed/bleed.test.tsx && npm run test:e2e -- bleed`.

### Checkpoint after T019
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T020 Box component** (depends on T016).
  - Files: `packages/react/src/components/box/box.tsx`, `box.css`, `box.test.tsx`, `index.ts`, `apps/docs/content/components/box.mdx`.
  - Acceptance: responsive layout, intrinsic sizing and RTL; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/box/box.test.tsx && npm run test:e2e -- box`.
- [ ] **T021 Center component** (depends on T016).
  - Files: `packages/react/src/components/center/center.tsx`, `center.css`, `center.test.tsx`, `index.ts`, `apps/docs/content/components/center.mdx`.
  - Acceptance: responsive layout, intrinsic sizing and RTL; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/center/center.test.tsx && npm run test:e2e -- center`.
- [ ] **T022 Container component** (depends on T016).
  - Files: `packages/react/src/components/container/container.tsx`, `container.css`, `container.test.tsx`, `index.ts`, `apps/docs/content/components/container.mdx`.
  - Acceptance: responsive layout, intrinsic sizing and RTL; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/container/container.test.tsx && npm run test:e2e -- container`.

### Checkpoint after T022
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T023 Flex component** (depends on T016).
  - Files: `packages/react/src/components/flex/flex.tsx`, `flex.css`, `flex.test.tsx`, `index.ts`, `apps/docs/content/components/flex.mdx`.
  - Acceptance: responsive layout, intrinsic sizing and RTL; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/flex/flex.test.tsx && npm run test:e2e -- flex`.
- [ ] **T024 Float component** (depends on T016).
  - Files: `packages/react/src/components/float/float.tsx`, `float.css`, `float.test.tsx`, `index.ts`, `apps/docs/content/components/float.mdx`.
  - Acceptance: responsive layout, intrinsic sizing and RTL; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/float/float.test.tsx && npm run test:e2e -- float`.
- [ ] **T025 Floating Panel behavior** (depends on T016).
  - Files: `packages/react/src/components/floating-panel/floating-panel.tsx`, `floating-panel.test.tsx`.
  - Acceptance: drag, resize, positioning and keyboard access; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/floating-panel/floating-panel.test.tsx`.

### Checkpoint after T025
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T026 Floating Panel presentation and docs** (depends on T025).
  - Files: `packages/react/src/components/floating-panel/floating-panel.css`, `index.ts`, `apps/docs/content/components/floating-panel.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- floating-panel`.
- [ ] **T027 Grid component** (depends on T016).
  - Files: `packages/react/src/components/grid/grid.tsx`, `grid.css`, `grid.test.tsx`, `index.ts`, `apps/docs/content/components/grid.mdx`.
  - Acceptance: responsive layout, intrinsic sizing and RTL; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/grid/grid.test.tsx && npm run test:e2e -- grid`.
- [ ] **T028 Group component** (depends on T016).
  - Files: `packages/react/src/components/group/group.tsx`, `group.css`, `group.test.tsx`, `index.ts`, `apps/docs/content/components/group.mdx`.
  - Acceptance: responsive layout, intrinsic sizing and RTL; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/group/group.test.tsx && npm run test:e2e -- group`.

### Checkpoint after T028
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T029 Scroll Area component** (depends on T016).
  - Files: `packages/react/src/components/scroll-area/scroll-area.tsx`, `scroll-area.css`, `scroll-area.test.tsx`, `index.ts`, `apps/docs/content/components/scroll-area.mdx`.
  - Acceptance: responsive layout, intrinsic sizing and RTL; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/scroll-area/scroll-area.test.tsx && npm run test:e2e -- scroll-area`.
- [ ] **T030 Separator component** (depends on T016).
  - Files: `packages/react/src/components/separator/separator.tsx`, `separator.css`, `separator.test.tsx`, `index.ts`, `apps/docs/content/components/separator.mdx`.
  - Acceptance: responsive layout, intrinsic sizing and RTL; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/separator/separator.test.tsx && npm run test:e2e -- separator`.
- [ ] **T031 Simple Grid component** (depends on T016).
  - Files: `packages/react/src/components/simple-grid/simple-grid.tsx`, `simple-grid.css`, `simple-grid.test.tsx`, `index.ts`, `apps/docs/content/components/simple-grid.mdx`.
  - Acceptance: responsive layout, intrinsic sizing and RTL; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/simple-grid/simple-grid.test.tsx && npm run test:e2e -- simple-grid`.

### Checkpoint after T031
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T032 Splitter behavior** (depends on T016).
  - Files: `packages/react/src/components/splitter/splitter.tsx`, `splitter.test.tsx`.
  - Acceptance: multi-panel resize, limits and keyboard; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/splitter/splitter.test.tsx`.
- [ ] **T033 Splitter presentation and docs** (depends on T032).
  - Files: `packages/react/src/components/splitter/splitter.css`, `index.ts`, `apps/docs/content/components/splitter.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- splitter`.
- [ ] **T034 Stack component** (depends on T016).
  - Files: `packages/react/src/components/stack/stack.tsx`, `stack.css`, `stack.test.tsx`, `index.ts`, `apps/docs/content/components/stack.mdx`.
  - Acceptance: responsive layout, intrinsic sizing and RTL; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/stack/stack.test.tsx && npm run test:e2e -- stack`.

### Checkpoint after T034
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T035 Wrap component** (depends on T016).
  - Files: `packages/react/src/components/wrap/wrap.tsx`, `wrap.css`, `wrap.test.tsx`, `index.ts`, `apps/docs/content/components/wrap.mdx`.
  - Acceptance: responsive layout, intrinsic sizing and RTL; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/wrap/wrap.test.tsx && npm run test:e2e -- wrap`.

## Typography and content

- [ ] **T036 Blockquote component** (depends on T016).
  - Files: `packages/react/src/components/blockquote/blockquote.tsx`, `blockquote.css`, `blockquote.test.tsx`, `index.ts`, `apps/docs/content/components/blockquote.mdx`.
  - Acceptance: semantic text, wrapping and typography; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/blockquote/blockquote.test.tsx && npm run test:e2e -- blockquote`.
- [ ] **T037 Code component** (depends on T016).
  - Files: `packages/react/src/components/code/code.tsx`, `code.css`, `code.test.tsx`, `index.ts`, `apps/docs/content/components/code.mdx`.
  - Acceptance: semantic text, wrapping and typography; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/code/code.test.tsx && npm run test:e2e -- code`.

### Checkpoint after T037
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T038 Code Block behavior** (depends on T016).
  - Files: `packages/react/src/components/code-block/code-block.tsx`, `code-block.test.tsx`.
  - Acceptance: highlighting, copy, collapse and safe content; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/code-block/code-block.test.tsx`.
- [ ] **T039 Code Block presentation and docs** (depends on T038).
  - Files: `packages/react/src/components/code-block/code-block.css`, `index.ts`, `apps/docs/content/components/code-block.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- code-block`.
- [ ] **T040 Em component** (depends on T016).
  - Files: `packages/react/src/components/em/em.tsx`, `em.css`, `em.test.tsx`, `index.ts`, `apps/docs/content/components/em.mdx`.
  - Acceptance: semantic text, wrapping and typography; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/em/em.test.tsx && npm run test:e2e -- em`.

### Checkpoint after T040
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T041 Heading component** (depends on T016).
  - Files: `packages/react/src/components/heading/heading.tsx`, `heading.css`, `heading.test.tsx`, `index.ts`, `apps/docs/content/components/heading.mdx`.
  - Acceptance: semantic text, wrapping and typography; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/heading/heading.test.tsx && npm run test:e2e -- heading`.
- [ ] **T042 Highlight component** (depends on T016).
  - Files: `packages/react/src/components/highlight/highlight.tsx`, `highlight.css`, `highlight.test.tsx`, `index.ts`, `apps/docs/content/components/highlight.mdx`.
  - Acceptance: semantic text, wrapping and typography; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/highlight/highlight.test.tsx && npm run test:e2e -- highlight`.
- [ ] **T043 Kbd component** (depends on T016).
  - Files: `packages/react/src/components/kbd/kbd.tsx`, `kbd.css`, `kbd.test.tsx`, `index.ts`, `apps/docs/content/components/kbd.mdx`.
  - Acceptance: semantic text, wrapping and typography; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/kbd/kbd.test.tsx && npm run test:e2e -- kbd`.

### Checkpoint after T043
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T044 Link component** (depends on T016).
  - Files: `packages/react/src/components/link/link.tsx`, `link.css`, `link.test.tsx`, `index.ts`, `apps/docs/content/components/link.mdx`.
  - Acceptance: semantic text, wrapping and typography; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/link/link.test.tsx && npm run test:e2e -- link`.
- [ ] **T045 Link Overlay component** (depends on T016).
  - Files: `packages/react/src/components/link-overlay/link-overlay.tsx`, `link-overlay.css`, `link-overlay.test.tsx`, `index.ts`, `apps/docs/content/components/link-overlay.mdx`.
  - Acceptance: semantic text, wrapping and typography; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/link-overlay/link-overlay.test.tsx && npm run test:e2e -- link-overlay`.
- [ ] **T046 List component** (depends on T016).
  - Files: `packages/react/src/components/list/list.tsx`, `list.css`, `list.test.tsx`, `index.ts`, `apps/docs/content/components/list.mdx`.
  - Acceptance: semantic text, wrapping and typography; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/list/list.test.tsx && npm run test:e2e -- list`.

### Checkpoint after T046
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T047 Mark component** (depends on T016).
  - Files: `packages/react/src/components/mark/mark.tsx`, `mark.css`, `mark.test.tsx`, `index.ts`, `apps/docs/content/components/mark.mdx`.
  - Acceptance: semantic text, wrapping and typography; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/mark/mark.test.tsx && npm run test:e2e -- mark`.
- [ ] **T048 Prose component** (depends on T016).
  - Files: `packages/react/src/components/prose/prose.tsx`, `prose.css`, `prose.test.tsx`, `index.ts`, `apps/docs/content/components/prose.mdx`.
  - Acceptance: semantic text, wrapping and typography; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/prose/prose.test.tsx && npm run test:e2e -- prose`.
- [ ] **T049 Rich Text Editor behavior** (depends on T016).
  - Files: `packages/react/src/components/rich-text-editor/rich-text-editor.tsx`, `rich-text-editor.test.tsx`.
  - Acceptance: toolbar, content safety, formatting and autosave; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/rich-text-editor/rich-text-editor.test.tsx`.

### Checkpoint after T049
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T050 Rich Text Editor presentation and docs** (depends on T049).
  - Files: `packages/react/src/components/rich-text-editor/rich-text-editor.css`, `index.ts`, `apps/docs/content/components/rich-text-editor.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- rich-text-editor`.
- [ ] **T051 Text component** (depends on T016).
  - Files: `packages/react/src/components/text/text.tsx`, `text.css`, `text.test.tsx`, `index.ts`, `apps/docs/content/components/text.mdx`.
  - Acceptance: semantic text, wrapping and typography; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/text/text.test.tsx && npm run test:e2e -- text`.

## Actions and dates

- [ ] **T052 Close Button component** (depends on T016).
  - Files: `packages/react/src/components/close-button/close-button.tsx`, `close-button.css`, `close-button.test.tsx`, `index.ts`, `apps/docs/content/components/close-button.mdx`.
  - Acceptance: activation, disabled/loading and date semantics; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/close-button/close-button.test.tsx && npm run test:e2e -- close-button`.

### Checkpoint after T052
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T053 Icon Button component** (depends on T016).
  - Files: `packages/react/src/components/icon-button/icon-button.tsx`, `icon-button.css`, `icon-button.test.tsx`, `index.ts`, `apps/docs/content/components/icon-button.mdx`.
  - Acceptance: activation, disabled/loading and date semantics; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/icon-button/icon-button.test.tsx && npm run test:e2e -- icon-button`.
- [ ] **T054 Download Trigger component** (depends on T016).
  - Files: `packages/react/src/components/download-trigger/download-trigger.tsx`, `download-trigger.css`, `download-trigger.test.tsx`, `index.ts`, `apps/docs/content/components/download-trigger.mdx`.
  - Acceptance: activation, disabled/loading and date semantics; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/download-trigger/download-trigger.test.tsx && npm run test:e2e -- download-trigger`.
- [ ] **T055 Calendar behavior** (depends on T016).
  - Files: `packages/react/src/components/calendar/calendar.tsx`, `calendar.test.tsx`.
  - Acceptance: date, range and multiple selection; locale and unavailable dates; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/calendar/calendar.test.tsx`.

### Checkpoint after T055
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T056 Calendar presentation and docs** (depends on T055).
  - Files: `packages/react/src/components/calendar/calendar.css`, `index.ts`, `apps/docs/content/components/calendar.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- calendar`.
- [ ] **T057 Date Input component** (depends on T016).
  - Files: `packages/react/src/components/date-input/date-input.tsx`, `date-input.css`, `date-input.test.tsx`, `index.ts`, `apps/docs/content/components/date-input.mdx`.
  - Acceptance: activation, disabled/loading and date semantics; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/date-input/date-input.test.tsx && npm run test:e2e -- date-input`.
- [ ] **T058 Date Picker behavior** (depends on T016).
  - Files: `packages/react/src/components/date-picker/date-picker.tsx`, `date-picker.test.tsx`.
  - Acceptance: calendar popup, range, locale and validation; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/date-picker/date-picker.test.tsx`.

### Checkpoint after T058
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T059 Date Picker presentation and docs** (depends on T058).
  - Files: `packages/react/src/components/date-picker/date-picker.css`, `index.ts`, `apps/docs/content/components/date-picker.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- date-picker`.

## Forms

- [ ] **T060 Checkbox component** (depends on T016).
  - Files: `packages/react/src/components/checkbox/checkbox.tsx`, `checkbox.css`, `checkbox.test.tsx`, `index.ts`, `apps/docs/content/components/checkbox.mdx`.
  - Acceptance: label, validation, form reset and states; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/checkbox/checkbox.test.tsx && npm run test:e2e -- checkbox`.
- [ ] **T061 Checkbox Card component** (depends on T016).
  - Files: `packages/react/src/components/checkbox-card/checkbox-card.tsx`, `checkbox-card.css`, `checkbox-card.test.tsx`, `index.ts`, `apps/docs/content/components/checkbox-card.mdx`.
  - Acceptance: label, validation, form reset and states; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/checkbox-card/checkbox-card.test.tsx && npm run test:e2e -- checkbox-card`.

### Checkpoint after T061
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T062 Color Picker behavior** (depends on T016).
  - Files: `packages/react/src/components/color-picker/color-picker.tsx`, `color-picker.test.tsx`.
  - Acceptance: color channels, swatches, keyboard and alpha; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/color-picker/color-picker.test.tsx`.
- [ ] **T063 Color Picker presentation and docs** (depends on T062).
  - Files: `packages/react/src/components/color-picker/color-picker.css`, `index.ts`, `apps/docs/content/components/color-picker.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- color-picker`.
- [ ] **T064 Color Swatch component** (depends on T016).
  - Files: `packages/react/src/components/color-swatch/color-swatch.tsx`, `color-swatch.css`, `color-swatch.test.tsx`, `index.ts`, `apps/docs/content/components/color-swatch.mdx`.
  - Acceptance: label, validation, form reset and states; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/color-swatch/color-swatch.test.tsx && npm run test:e2e -- color-swatch`.

### Checkpoint after T064
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T065 Editable behavior** (depends on T016).
  - Files: `packages/react/src/components/editable/editable.tsx`, `editable.test.tsx`.
  - Acceptance: edit, submit, cancel and validation; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/editable/editable.test.tsx`.
- [ ] **T066 Editable presentation and docs** (depends on T065).
  - Files: `packages/react/src/components/editable/editable.css`, `index.ts`, `apps/docs/content/components/editable.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- editable`.
- [ ] **T067 Field component** (depends on T016).
  - Files: `packages/react/src/components/field/field.tsx`, `field.css`, `field.test.tsx`, `index.ts`, `apps/docs/content/components/field.mdx`.
  - Acceptance: label, validation, form reset and states; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/field/field.test.tsx && npm run test:e2e -- field`.

### Checkpoint after T067
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T068 Fieldset component** (depends on T016).
  - Files: `packages/react/src/components/fieldset/fieldset.tsx`, `fieldset.css`, `fieldset.test.tsx`, `index.ts`, `apps/docs/content/components/fieldset.mdx`.
  - Acceptance: label, validation, form reset and states; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/fieldset/fieldset.test.tsx && npm run test:e2e -- fieldset`.
- [ ] **T069 File Upload behavior** (depends on T016).
  - Files: `packages/react/src/components/file-upload/file-upload.tsx`, `file-upload.test.tsx`.
  - Acceptance: picker, dropzone, validation and removal; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/file-upload/file-upload.test.tsx`.
- [ ] **T070 File Upload presentation and docs** (depends on T069).
  - Files: `packages/react/src/components/file-upload/file-upload.css`, `index.ts`, `apps/docs/content/components/file-upload.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- file-upload`.

### Checkpoint after T070
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T071 Number Input behavior** (depends on T016).
  - Files: `packages/react/src/components/number-input/number-input.tsx`, `number-input.test.tsx`.
  - Acceptance: step, bounds, scrubber and form state; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/number-input/number-input.test.tsx`.
- [ ] **T072 Number Input presentation and docs** (depends on T071).
  - Files: `packages/react/src/components/number-input/number-input.css`, `index.ts`, `apps/docs/content/components/number-input.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- number-input`.
- [ ] **T073 Password Input component** (depends on T016).
  - Files: `packages/react/src/components/password-input/password-input.tsx`, `password-input.css`, `password-input.test.tsx`, `index.ts`, `apps/docs/content/components/password-input.mdx`.
  - Acceptance: label, validation, form reset and states; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/password-input/password-input.test.tsx && npm run test:e2e -- password-input`.

### Checkpoint after T073
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T074 Pin Input behavior** (depends on T016).
  - Files: `packages/react/src/components/pin-input/pin-input.tsx`, `pin-input.test.tsx`.
  - Acceptance: per-cell focus, paste, masking and form value; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/pin-input/pin-input.test.tsx`.
- [ ] **T075 Pin Input presentation and docs** (depends on T074).
  - Files: `packages/react/src/components/pin-input/pin-input.css`, `index.ts`, `apps/docs/content/components/pin-input.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- pin-input`.
- [ ] **T076 Radio component** (depends on T016).
  - Files: `packages/react/src/components/radio/radio.tsx`, `radio.css`, `radio.test.tsx`, `index.ts`, `apps/docs/content/components/radio.mdx`.
  - Acceptance: label, validation, form reset and states; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/radio/radio.test.tsx && npm run test:e2e -- radio`.

### Checkpoint after T076
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T077 Radio Card component** (depends on T016).
  - Files: `packages/react/src/components/radio-card/radio-card.tsx`, `radio-card.css`, `radio-card.test.tsx`, `index.ts`, `apps/docs/content/components/radio-card.mdx`.
  - Acceptance: label, validation, form reset and states; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/radio-card/radio-card.test.tsx && npm run test:e2e -- radio-card`.
- [ ] **T078 Rating behavior** (depends on T016).
  - Files: `packages/react/src/components/rating/rating.tsx`, `rating.test.tsx`.
  - Acceptance: fractional/readonly selection and keyboard value; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/rating/rating.test.tsx`.
- [ ] **T079 Rating presentation and docs** (depends on T078).
  - Files: `packages/react/src/components/rating/rating.css`, `index.ts`, `apps/docs/content/components/rating.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- rating`.

### Checkpoint after T079
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T080 Segmented Control component** (depends on T016).
  - Files: `packages/react/src/components/segmented-control/segmented-control.tsx`, `segmented-control.css`, `segmented-control.test.tsx`, `index.ts`, `apps/docs/content/components/segmented-control.mdx`.
  - Acceptance: label, validation, form reset and states; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/segmented-control/segmented-control.test.tsx && npm run test:e2e -- segmented-control`.
- [ ] **T081 Select Native component** (depends on T016).
  - Files: `packages/react/src/components/native-select/native-select.tsx`, `native-select.css`, `native-select.test.tsx`, `index.ts`, `apps/docs/content/components/native-select.mdx`.
  - Acceptance: label, validation, form reset and states; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/native-select/native-select.test.tsx && npm run test:e2e -- native-select`.
- [ ] **T082 Slider behavior** (depends on T016).
  - Files: `packages/react/src/components/slider/slider.tsx`, `slider.test.tsx`.
  - Acceptance: step, range, orientation and RTL keys; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/slider/slider.test.tsx`.

### Checkpoint after T082
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T083 Slider presentation and docs** (depends on T082).
  - Files: `packages/react/src/components/slider/slider.css`, `index.ts`, `apps/docs/content/components/slider.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- slider`.
- [ ] **T084 Switch component** (depends on T016).
  - Files: `packages/react/src/components/switch/switch.tsx`, `switch.css`, `switch.test.tsx`, `index.ts`, `apps/docs/content/components/switch.mdx`.
  - Acceptance: label, validation, form reset and states; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/switch/switch.test.tsx && npm run test:e2e -- switch`.
- [ ] **T085 Textarea component** (depends on T016).
  - Files: `packages/react/src/components/textarea/textarea.tsx`, `textarea.css`, `textarea.test.tsx`, `index.ts`, `apps/docs/content/components/textarea.mdx`.
  - Acceptance: label, validation, form reset and states; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/textarea/textarea.test.tsx && npm run test:e2e -- textarea`.

### Checkpoint after T085
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T086 Tags Input behavior** (depends on T016).
  - Files: `packages/react/src/components/tags-input/tags-input.tsx`, `tags-input.test.tsx`.
  - Acceptance: add, remove, edit, paste and limits; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/tags-input/tags-input.test.tsx`.
- [ ] **T087 Tags Input presentation and docs** (depends on T086).
  - Files: `packages/react/src/components/tags-input/tags-input.css`, `index.ts`, `apps/docs/content/components/tags-input.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- tags-input`.

## Collections and overlays

- [ ] **T088 Combobox behavior** (depends on T016).
  - Files: `packages/react/src/components/combobox/combobox.tsx`, `combobox.test.tsx`.
  - Acceptance: filtering, active option, selection and empty state; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/combobox/combobox.test.tsx`.

### Checkpoint after T088
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T089 Combobox presentation and docs** (depends on T088).
  - Files: `packages/react/src/components/combobox/combobox.css`, `index.ts`, `apps/docs/content/components/combobox.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- combobox`.
- [ ] **T090 Command behavior** (depends on T016).
  - Files: `packages/react/src/components/command/command.tsx`, `command.test.tsx`.
  - Acceptance: search, groups, shortcuts and keyboard selection; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/command/command.test.tsx`.
- [ ] **T091 Command presentation and docs** (depends on T090).
  - Files: `packages/react/src/components/command/command.css`, `index.ts`, `apps/docs/content/components/command.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- command`.

### Checkpoint after T091
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T092 Listbox behavior** (depends on T016).
  - Files: `packages/react/src/components/listbox/listbox.tsx`, `listbox.test.tsx`.
  - Acceptance: single/multiple selection, typeahead and groups; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/listbox/listbox.test.tsx`.
- [ ] **T093 Listbox presentation and docs** (depends on T092).
  - Files: `packages/react/src/components/listbox/listbox.css`, `index.ts`, `apps/docs/content/components/listbox.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- listbox`.
- [ ] **T094 Select behavior** (depends on T016).
  - Files: `packages/react/src/components/select/select.tsx`, `select.test.tsx`.
  - Acceptance: single/multiple selection, groups and form state; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/select/select.test.tsx`.

### Checkpoint after T094
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T095 Select presentation and docs** (depends on T094).
  - Files: `packages/react/src/components/select/select.css`, `index.ts`, `apps/docs/content/components/select.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- select`.
- [ ] **T096 Tree View behavior** (depends on T016).
  - Files: `packages/react/src/components/tree-view/tree-view.tsx`, `tree-view.test.tsx`.
  - Acceptance: hierarchy, expansion, selection and typeahead; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/tree-view/tree-view.test.tsx`.
- [ ] **T097 Tree View presentation and docs** (depends on T096).
  - Files: `packages/react/src/components/tree-view/tree-view.css`, `index.ts`, `apps/docs/content/components/tree-view.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- tree-view`.

### Checkpoint after T097
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T098 Action Bar component** (depends on T016).
  - Files: `packages/react/src/components/action-bar/action-bar.tsx`, `action-bar.css`, `action-bar.test.tsx`, `index.ts`, `apps/docs/content/components/action-bar.mdx`.
  - Acceptance: keyboard navigation, focus and overlay lifecycle; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/action-bar/action-bar.test.tsx && npm run test:e2e -- action-bar`.
- [ ] **T099 Drawer behavior** (depends on T016).
  - Files: `packages/react/src/components/drawer/drawer.tsx`, `drawer.test.tsx`.
  - Acceptance: placement, scroll locking and focus restoration; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/drawer/drawer.test.tsx`.
- [ ] **T100 Drawer presentation and docs** (depends on T099).
  - Files: `packages/react/src/components/drawer/drawer.css`, `index.ts`, `apps/docs/content/components/drawer.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- drawer`.

### Checkpoint after T100
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T101 Hover Card component** (depends on T016).
  - Files: `packages/react/src/components/hover-card/hover-card.tsx`, `hover-card.css`, `hover-card.test.tsx`, `index.ts`, `apps/docs/content/components/hover-card.mdx`.
  - Acceptance: keyboard navigation, focus and overlay lifecycle; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/hover-card/hover-card.test.tsx && npm run test:e2e -- hover-card`.
- [ ] **T102 Menu behavior** (depends on T016).
  - Files: `packages/react/src/components/menu/menu.tsx`, `menu.test.tsx`.
  - Acceptance: nested items, typeahead, keyboard and context trigger; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/menu/menu.test.tsx`.
- [ ] **T103 Menu presentation and docs** (depends on T102).
  - Files: `packages/react/src/components/menu/menu.css`, `index.ts`, `apps/docs/content/components/menu.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- menu`.

### Checkpoint after T103
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T104 Overlay Manager component** (depends on T016).
  - Files: `packages/react/src/components/overlay-manager/overlay-manager.tsx`, `overlay-manager.css`, `overlay-manager.test.tsx`, `index.ts`, `apps/docs/content/components/overlay-manager.mdx`.
  - Acceptance: keyboard navigation, focus and overlay lifecycle; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/overlay-manager/overlay-manager.test.tsx && npm run test:e2e -- overlay-manager`.
- [ ] **T105 Popover behavior** (depends on T016).
  - Files: `packages/react/src/components/popover/popover.tsx`, `popover.test.tsx`.
  - Acceptance: anchor positioning, outside close and focus; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/popover/popover.test.tsx`.
- [ ] **T106 Popover presentation and docs** (depends on T105).
  - Files: `packages/react/src/components/popover/popover.css`, `index.ts`, `apps/docs/content/components/popover.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- popover`.

### Checkpoint after T106
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T107 Toast behavior** (depends on T016).
  - Files: `packages/react/src/components/toast/toast.tsx`, `toast.test.tsx`.
  - Acceptance: queue, timers, actions and announcements; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/toast/toast.test.tsx`.
- [ ] **T108 Toast presentation and docs** (depends on T107).
  - Files: `packages/react/src/components/toast/toast.css`, `index.ts`, `apps/docs/content/components/toast.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- toast`.
- [ ] **T109 Toggle Tip component** (depends on T016).
  - Files: `packages/react/src/components/toggle-tip/toggle-tip.tsx`, `toggle-tip.css`, `toggle-tip.test.tsx`, `index.ts`, `apps/docs/content/components/toggle-tip.mdx`.
  - Acceptance: keyboard navigation, focus and overlay lifecycle; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/toggle-tip/toggle-tip.test.tsx && npm run test:e2e -- toggle-tip`.

### Checkpoint after T109
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T110 Tooltip component** (depends on T016).
  - Files: `packages/react/src/components/tooltip/tooltip.tsx`, `tooltip.css`, `tooltip.test.tsx`, `index.ts`, `apps/docs/content/components/tooltip.mdx`.
  - Acceptance: keyboard navigation, focus and overlay lifecycle; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/tooltip/tooltip.test.tsx && npm run test:e2e -- tooltip`.

## Feedback, data, media

- [ ] **T111 Accordion behavior** (depends on T016).
  - Files: `packages/react/src/components/accordion/accordion.tsx`, `accordion.test.tsx`.
  - Acceptance: single/multiple expansion, disabled items and focus; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/accordion/accordion.test.tsx`.
- [ ] **T112 Accordion presentation and docs** (depends on T111).
  - Files: `packages/react/src/components/accordion/accordion.css`, `index.ts`, `apps/docs/content/components/accordion.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- accordion`.

### Checkpoint after T112
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T113 Alert component** (depends on T016).
  - Files: `packages/react/src/components/alert/alert.tsx`, `alert.css`, `alert.test.tsx`, `index.ts`, `apps/docs/content/components/alert.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/alert/alert.test.tsx && npm run test:e2e -- alert`.
- [ ] **T114 Avatar component** (depends on T016).
  - Files: `packages/react/src/components/avatar/avatar.tsx`, `avatar.css`, `avatar.test.tsx`, `index.ts`, `apps/docs/content/components/avatar.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/avatar/avatar.test.tsx && npm run test:e2e -- avatar`.
- [ ] **T115 Badge component** (depends on T016).
  - Files: `packages/react/src/components/badge/badge.tsx`, `badge.css`, `badge.test.tsx`, `index.ts`, `apps/docs/content/components/badge.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/badge/badge.test.tsx && npm run test:e2e -- badge`.

### Checkpoint after T115
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T116 Breadcrumb component** (depends on T016).
  - Files: `packages/react/src/components/breadcrumb/breadcrumb.tsx`, `breadcrumb.css`, `breadcrumb.test.tsx`, `index.ts`, `apps/docs/content/components/breadcrumb.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/breadcrumb/breadcrumb.test.tsx && npm run test:e2e -- breadcrumb`.
- [ ] **T117 Card component** (depends on T016).
  - Files: `packages/react/src/components/card/card.tsx`, `card.css`, `card.test.tsx`, `index.ts`, `apps/docs/content/components/card.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/card/card.test.tsx && npm run test:e2e -- card`.
- [ ] **T118 Carousel behavior** (depends on T016).
  - Files: `packages/react/src/components/carousel/carousel.tsx`, `carousel.test.tsx`.
  - Acceptance: navigation, indicators, autoplay and reduced motion; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/carousel/carousel.test.tsx`.

### Checkpoint after T118
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T119 Carousel presentation and docs** (depends on T118).
  - Files: `packages/react/src/components/carousel/carousel.css`, `index.ts`, `apps/docs/content/components/carousel.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- carousel`.
- [ ] **T120 Clipboard component** (depends on T016).
  - Files: `packages/react/src/components/clipboard/clipboard.tsx`, `clipboard.css`, `clipboard.test.tsx`, `index.ts`, `apps/docs/content/components/clipboard.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/clipboard/clipboard.test.tsx && npm run test:e2e -- clipboard`.
- [ ] **T121 Collapsible component** (depends on T016).
  - Files: `packages/react/src/components/collapsible/collapsible.tsx`, `collapsible.css`, `collapsible.test.tsx`, `index.ts`, `apps/docs/content/components/collapsible.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/collapsible/collapsible.test.tsx && npm run test:e2e -- collapsible`.

### Checkpoint after T121
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T122 Data List component** (depends on T016).
  - Files: `packages/react/src/components/data-list/data-list.tsx`, `data-list.css`, `data-list.test.tsx`, `index.ts`, `apps/docs/content/components/data-list.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/data-list/data-list.test.tsx && npm run test:e2e -- data-list`.
- [ ] **T123 Empty State component** (depends on T016).
  - Files: `packages/react/src/components/empty-state/empty-state.tsx`, `empty-state.css`, `empty-state.test.tsx`, `index.ts`, `apps/docs/content/components/empty-state.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/empty-state/empty-state.test.tsx && npm run test:e2e -- empty-state`.
- [ ] **T124 Icon component** (depends on T016).
  - Files: `packages/react/src/components/icon/icon.tsx`, `icon.css`, `icon.test.tsx`, `index.ts`, `apps/docs/content/components/icon.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/icon/icon.test.tsx && npm run test:e2e -- icon`.

### Checkpoint after T124
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T125 Image component** (depends on T016).
  - Files: `packages/react/src/components/image/image.tsx`, `image.css`, `image.test.tsx`, `index.ts`, `apps/docs/content/components/image.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/image/image.test.tsx && npm run test:e2e -- image`.
- [ ] **T126 Marquee component** (depends on T016).
  - Files: `packages/react/src/components/marquee/marquee.tsx`, `marquee.css`, `marquee.test.tsx`, `index.ts`, `apps/docs/content/components/marquee.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/marquee/marquee.test.tsx && npm run test:e2e -- marquee`.
- [ ] **T127 Pagination behavior** (depends on T016).
  - Files: `packages/react/src/components/pagination/pagination.tsx`, `pagination.test.tsx`.
  - Acceptance: current page, bounds and navigation; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/pagination/pagination.test.tsx`.

### Checkpoint after T127
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T128 Pagination presentation and docs** (depends on T127).
  - Files: `packages/react/src/components/pagination/pagination.css`, `index.ts`, `apps/docs/content/components/pagination.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- pagination`.
- [ ] **T129 Progress component** (depends on T016).
  - Files: `packages/react/src/components/progress/progress.tsx`, `progress.css`, `progress.test.tsx`, `index.ts`, `apps/docs/content/components/progress.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/progress/progress.test.tsx && npm run test:e2e -- progress`.
- [ ] **T130 Progress Circle component** (depends on T016).
  - Files: `packages/react/src/components/progress-circle/progress-circle.tsx`, `progress-circle.css`, `progress-circle.test.tsx`, `index.ts`, `apps/docs/content/components/progress-circle.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/progress-circle/progress-circle.test.tsx && npm run test:e2e -- progress-circle`.

### Checkpoint after T130
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T131 QR Code component** (depends on T016).
  - Files: `packages/react/src/components/qr-code/qr-code.tsx`, `qr-code.css`, `qr-code.test.tsx`, `index.ts`, `apps/docs/content/components/qr-code.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/qr-code/qr-code.test.tsx && npm run test:e2e -- qr-code`.
- [ ] **T132 Skeleton component** (depends on T016).
  - Files: `packages/react/src/components/skeleton/skeleton.tsx`, `skeleton.css`, `skeleton.test.tsx`, `index.ts`, `apps/docs/content/components/skeleton.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/skeleton/skeleton.test.tsx && npm run test:e2e -- skeleton`.
- [ ] **T133 Spinner component** (depends on T016).
  - Files: `packages/react/src/components/spinner/spinner.tsx`, `spinner.css`, `spinner.test.tsx`, `index.ts`, `apps/docs/content/components/spinner.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/spinner/spinner.test.tsx && npm run test:e2e -- spinner`.

### Checkpoint after T133
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T134 Stat component** (depends on T016).
  - Files: `packages/react/src/components/stat/stat.tsx`, `stat.css`, `stat.test.tsx`, `index.ts`, `apps/docs/content/components/stat.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/stat/stat.test.tsx && npm run test:e2e -- stat`.
- [ ] **T135 Status component** (depends on T016).
  - Files: `packages/react/src/components/status/status.tsx`, `status.css`, `status.test.tsx`, `index.ts`, `apps/docs/content/components/status.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/status/status.test.tsx && npm run test:e2e -- status`.
- [ ] **T136 Steps behavior** (depends on T016).
  - Files: `packages/react/src/components/steps/steps.tsx`, `steps.test.tsx`.
  - Acceptance: linear/nonlinear navigation and progress; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/steps/steps.test.tsx`.

### Checkpoint after T136
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T137 Steps presentation and docs** (depends on T136).
  - Files: `packages/react/src/components/steps/steps.css`, `index.ts`, `apps/docs/content/components/steps.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- steps`.
- [ ] **T138 Table component** (depends on T016).
  - Files: `packages/react/src/components/table/table.tsx`, `table.css`, `table.test.tsx`, `index.ts`, `apps/docs/content/components/table.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/table/table.test.tsx && npm run test:e2e -- table`.
- [ ] **T139 Tabs behavior** (depends on T016).
  - Files: `packages/react/src/components/tabs/tabs.tsx`, `tabs.test.tsx`.
  - Acceptance: manual/automatic activation, orientation and focus; controlled/uncontrolled and keyboard contract tests pass.
  - Verify: `npm test -- --run packages/react/src/components/tabs/tabs.test.tsx`.

### Checkpoint after T139
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T140 Tabs presentation and docs** (depends on T139).
  - Files: `packages/react/src/components/tabs/tabs.css`, `index.ts`, `apps/docs/content/components/tabs.mdx`.
  - Acceptance: default and applicable variants/states render in both appearances; docs preview and installable source work.
  - Verify: `npm run registry:validate && npm run test:e2e -- tabs`.
- [ ] **T141 Tag component** (depends on T016).
  - Files: `packages/react/src/components/tag/tag.tsx`, `tag.css`, `tag.test.tsx`, `index.ts`, `apps/docs/content/components/tag.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/tag/tag.test.tsx && npm run test:e2e -- tag`.
- [ ] **T142 Timeline component** (depends on T016).
  - Files: `packages/react/src/components/timeline/timeline.tsx`, `timeline.css`, `timeline.test.tsx`, `index.ts`, `apps/docs/content/components/timeline.mdx`.
  - Acceptance: semantic status, loading and content display; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/timeline/timeline.test.tsx && npm run test:e2e -- timeline`.

### Checkpoint after T142
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.


## Utilities and internationalization

- [ ] **T143 Checkmark component** (depends on T016).
  - Files: `packages/react/src/components/checkmark/checkmark.tsx`, `checkmark.css`, `checkmark.test.tsx`, `index.ts`, `apps/docs/content/components/checkmark.mdx`.
  - Acceptance: locale, portals, visibility and SSR; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/checkmark/checkmark.test.tsx && npm run test:e2e -- checkmark`.
- [ ] **T144 Client Only component** (depends on T016).
  - Files: `packages/react/src/components/client-only/client-only.tsx`, `client-only.css`, `client-only.test.tsx`, `index.ts`, `apps/docs/content/components/client-only.mdx`.
  - Acceptance: locale, portals, visibility and SSR; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/client-only/client-only.test.tsx && npm run test:e2e -- client-only`.
- [ ] **T145 Environment Provider component** (depends on T016).
  - Files: `packages/react/src/components/environment-provider/environment-provider.tsx`, `environment-provider.css`, `environment-provider.test.tsx`, `index.ts`, `apps/docs/content/components/environment-provider.mdx`.
  - Acceptance: locale, portals, visibility and SSR; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/environment-provider/environment-provider.test.tsx && npm run test:e2e -- environment-provider`.

### Checkpoint after T145
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T146 For component** (depends on T016).
  - Files: `packages/react/src/components/for/for.tsx`, `for.css`, `for.test.tsx`, `index.ts`, `apps/docs/content/components/for.mdx`.
  - Acceptance: locale, portals, visibility and SSR; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/for/for.test.tsx && npm run test:e2e -- for`.
- [ ] **T147 Format Byte component** (depends on T016).
  - Files: `packages/react/src/components/format-byte/format-byte.tsx`, `format-byte.css`, `format-byte.test.tsx`, `index.ts`, `apps/docs/content/components/format-byte.mdx`.
  - Acceptance: locale, portals, visibility and SSR; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/format-byte/format-byte.test.tsx && npm run test:e2e -- format-byte`.
- [ ] **T148 Format Number component** (depends on T016).
  - Files: `packages/react/src/components/format-number/format-number.tsx`, `format-number.css`, `format-number.test.tsx`, `index.ts`, `apps/docs/content/components/format-number.mdx`.
  - Acceptance: locale, portals, visibility and SSR; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/format-number/format-number.test.tsx && npm run test:e2e -- format-number`.

### Checkpoint after T148
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T149 Locale Provider component** (depends on T016).
  - Files: `packages/react/src/components/locale-provider/locale-provider.tsx`, `locale-provider.css`, `locale-provider.test.tsx`, `index.ts`, `apps/docs/content/components/locale-provider.mdx`.
  - Acceptance: locale, portals, visibility and SSR; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/locale-provider/locale-provider.test.tsx && npm run test:e2e -- locale-provider`.
- [ ] **T150 Portal component** (depends on T016).
  - Files: `packages/react/src/components/portal/portal.tsx`, `portal.css`, `portal.test.tsx`, `index.ts`, `apps/docs/content/components/portal.mdx`.
  - Acceptance: locale, portals, visibility and SSR; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/portal/portal.test.tsx && npm run test:e2e -- portal`.
- [ ] **T151 Presence component** (depends on T016).
  - Files: `packages/react/src/components/presence/presence.tsx`, `presence.css`, `presence.test.tsx`, `index.ts`, `apps/docs/content/components/presence.mdx`.
  - Acceptance: locale, portals, visibility and SSR; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/presence/presence.test.tsx && npm run test:e2e -- presence`.

### Checkpoint after T151
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T152 Radiomark component** (depends on T016).
  - Files: `packages/react/src/components/radiomark/radiomark.tsx`, `radiomark.css`, `radiomark.test.tsx`, `index.ts`, `apps/docs/content/components/radiomark.mdx`.
  - Acceptance: locale, portals, visibility and SSR; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/radiomark/radiomark.test.tsx && npm run test:e2e -- radiomark`.
- [ ] **T153 Show component** (depends on T016).
  - Files: `packages/react/src/components/show/show.tsx`, `show.css`, `show.test.tsx`, `index.ts`, `apps/docs/content/components/show.mdx`.
  - Acceptance: locale, portals, visibility and SSR; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/show/show.test.tsx && npm run test:e2e -- show`.
- [ ] **T154 Skip Nav component** (depends on T016).
  - Files: `packages/react/src/components/skip-nav/skip-nav.tsx`, `skip-nav.css`, `skip-nav.test.tsx`, `index.ts`, `apps/docs/content/components/skip-nav.mdx`.
  - Acceptance: locale, portals, visibility and SSR; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/skip-nav/skip-nav.test.tsx && npm run test:e2e -- skip-nav`.

### Checkpoint after T154
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T155 Theme component** (depends on T016).
  - Files: `packages/react/src/components/theme/theme.tsx`, `theme.css`, `theme.test.tsx`, `index.ts`, `apps/docs/content/components/theme.mdx`.
  - Acceptance: locale, portals, visibility and SSR; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/theme/theme.test.tsx && npm run test:e2e -- theme`.
- [ ] **T156 Visually Hidden component** (depends on T016).
  - Files: `packages/react/src/components/visually-hidden/visually-hidden.tsx`, `visually-hidden.css`, `visually-hidden.test.tsx`, `index.ts`, `apps/docs/content/components/visually-hidden.mdx`.
  - Acceptance: locale, portals, visibility and SSR; default, applicable variants/states, accessible behavior, docs preview and source install work.
  - Verify: `npm test -- --run packages/react/src/components/visually-hidden/visually-hidden.test.tsx && npm run test:e2e -- visually-hidden`.

## Distribution and documentation completion

- [ ] **T157 CLI diff and update** (depends on catalog tasks as applicable).
  - Acceptance: Dry run is read-only; local edits survive or produce an explicit three-way conflict.
  - Verify: `npm test -- --run packages/cli`.

### Checkpoint after T157
- [ ] Run focused tests for the previous three tasks, registry validation, docs build and relevant browser flows.

- [ ] **T158 CLI doctor and compatibility** (depends on catalog tasks as applicable).
  - Acceptance: Detect missing files, bad registry data, incompatible peers and offline freshness limits.
  - Verify: `npm test -- --run packages/cli`.
- [ ] **T159 Documentation search and API tables** (depends on catalog tasks as applicable).
  - Acceptance: Search covers names, aliases, props and states; API tables derive from public types.
  - Verify: `npm run test:docs && npm run build:docs`.
- [ ] **T160 Playground and example safety** (depends on catalog tasks as applicable).
  - Acceptance: Controls, preview and copyable code stay synchronized; untrusted code is isolated.
  - Verify: `npm run test:e2e -- playground`.
- [ ] **T161 Catalog completion audit** (depends on catalog tasks as applicable).
  - Acceptance: Every catalog entry has a page, contract, tests, source install and completion evidence.
  - Verify: `npm run registry:validate && npm run test:docs`.
- [ ] **T162 Release quality gate** (depends on catalog tasks as applicable).
  - Acceptance: All builds, tests, accessibility, visual and consumer fixture gates pass with no open critical gaps.
  - Verify: `npm run build && npm run typecheck && npm run lint && npm test -- --run && npm run test:e2e && npm run registry:validate && npm run build:docs`.

## Wave checkpoints
- [ ] After each family: run all focused component tests, docs build, registry validation and both consumer fixture builds.
- [ ] Review responsive light/dark screenshots and keyboard flows before starting the next family.
- [ ] Before release: every catalog task and all checks above are complete.
