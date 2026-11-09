# Spec: React interaction contracts

This companion to `SPEC-react-components.md` defines the minimum behavior to test for each interactive family. Component contracts supply their own variants, states, and examples. Follow applicable [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/) and [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/); native controls remain the preferred baseline.

| Components | Required interaction and state contract |
| --- | --- |
| Button, Close Button, Icon Button, Download Trigger | Native button or link semantics, correct disabled handling, Enter/Space activation, loading lockout and accessible label for icon-only controls. |
| Accordion, Collapsible | Trigger exposes expanded state and controlled panel; Enter/Space toggles, disabled triggers do not act, single/multiple expansion modes preserve focus. |
| Checkbox, Checkbox Card, Radio, Radio Card, Switch, Segmented Control | Label activation, group name and value, checked/unchecked/indeterminate where relevant, disabled/read-only and form reset, arrow navigation for composite radio/segments. |
| Input, Textarea, Password Input, Number Input, Pin Input, Date Input, Date Picker, Calendar, Field, Fieldset | Programmatic label/help/error, native form submission/reset, controlled/uncontrolled value, validation, locale, keyboard entry, disabled/read-only, and selected/unavailable date rules where relevant. |
| Select Native, Select, Combobox, Listbox, Command, Tags Input, Color Picker | Open/close, list selection, typeahead/filtering, active option announcement, empty and invalid states, clear action, multiple selection where documented, Escape handling, and keyboard editing without stealing native text keys. |
| Dialog, Drawer, Popover, Hover Card, Menu, Toggle Tip, Tooltip, Floating Panel, Action Bar | Trigger and content association, focus placement/restoration, Escape and outside interaction, correct modal or nonmodal focus rules, portal layering, anchored placement, nested overlay behavior. Tooltip also appears on focus and dismisses reliably. |
| Tabs, Steps, Pagination, Carousel | Selection or page state, active/current announcements, orientation and RTL-aware arrows, Home/End where applicable, disabled items, controlled state, and no focus loss during content changes. Carousel autoplay must pause on hover/focus and respect reduced motion. |
| Slider, Splitter, Scroll Area | Pointer and keyboard manipulation, value limits/step, orientation/RTL rules, live value announcement, drag cancellation, and robust resizing/scrolling at touch widths. |
| Tree View | Branch expand/collapse, hierarchical labels, single/multiple selection as documented, Home/End, arrow navigation, typeahead, and focus persistence after dynamic changes. |
| Editable, Rich Text Editor, File Upload | Entry/edit/commit/cancel state, validation, keyboard escape path, disabled/read-only, file size/type errors, drag/drop and picker equivalence. Rich text content requires sanitization and a keyboard-accessible toolbar. |
| Toast, Alert, Progress, Progress Circle, Skeleton, Spinner, Empty State | Appropriate live regions and role usage, no duplicate announcements, determinate/indeterminate values, dismiss and action focus behavior, reduced motion, and non-blocking status updates. |
| Clipboard, QR Code, Code Block | Copy/download behavior, success/error feedback, permission failure, accessible labels, and safe rendering of untrusted content. |

Every component contract must explicitly mark which table rows apply and add examples for its distinct capabilities. A component is complete only when those capabilities have runnable examples and tests. For composite widgets, test mouse, touch, keyboard, screen reader, light/dark, RTL, and SSR hydration. Document the ecentryUI API for each supported behavior.
