# Splitter component contract

## API and layout

`SplitterRoot` accepts ordered `panels` with unique IDs and optional percentage `minSize`/`maxSize`. `size` with `onResize` is controlled; `defaultSize` is uncontrolled. Sizes must total 100. `SplitterPanel` references one panel ID. `SplitterHandle` names two adjacent panel IDs through `between`. Horizontal panels are the default; `orientation="vertical"` stacks them. Panel and handle class names and native styles provide customization.

## Interaction and accessibility

Each handle is a focusable ARIA separator. It exposes the primary panel through `aria-controls`, the current percentage through `aria-valuenow` and `aria-valuetext`, and the legal range through `aria-valuemin`/`aria-valuemax`. Arrow keys move by `keyboardStep` (default 5 percentage points), Shift doubles the step, and Home/End select bounds. Horizontal arrows reverse in RTL. Pointer dragging preserves adjacent totals and clamps to both panels' limits. Pointer cancellation or Escape restores the size at drag start. Disabled roots or handles do not resize. `onResizeStart`, `onResize`, and `onResizeEnd` report a completed interaction; cancellation omits `onResizeEnd`.

## Verification

Unit tests cover three panels, limits, controlled and uncontrolled sizing, keyboard, RTL, pointer commit/cancellation, and disabled behavior. The docs browser flow covers dragging, keyboard, vertical layout, appearance, and accessibility. Vite and Next fixtures verify source installation and hydration.
