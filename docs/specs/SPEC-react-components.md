# Spec: react-components

## Objective and catalog rule

Release an accessible React component set covering every entry in the catalog below. Each component needs a clear default, appropriate variants and sizes, complete applicable states, keyboard and pointer interactions, customization points, and documentation. The catalog is normative for the MVP; additions or removals require a reviewed scope change.

The [interaction contract](SPEC-react-interactions.md) sets the behavior and accessibility baseline. The [API contract](SPEC-architecture-and-api.md) defines shared React conventions. Charts are outside the MVP by user decision.

## Component families

| Family | Required entries |
| --- | --- |
| Layout | Absolute Center, Aspect Ratio, Bleed, Box, Center, Container, Flex, Float, Floating Panel, Grid, Group, Scroll Area, Separator, Simple Grid, Splitter, Stack, Wrap |
| Typography and content | Blockquote, Code, Code Block, Em, Heading, Highlight, Kbd, Link, Link Overlay, List, Mark, Prose, Rich Text Editor, Text |
| Actions and dates | Button, Close Button, Icon Button, Download Trigger, Calendar, Date Input, Date Picker |
| Forms | Checkbox, Checkbox Card, Color Picker, Color Swatch, Editable, Field, Fieldset, File Upload, Input, Number Input, Password Input, Pin Input, Radio, Radio Card, Rating, Segmented Control, Select Native, Slider, Switch, Textarea, Tags Input |
| Collections and overlays | Combobox, Command, Listbox, Select, Tree View, Action Bar, Dialog, Drawer, Hover Card, Menu, Overlay Manager, Popover, Toast, Toggle Tip, Tooltip |
| Feedback, data, media | Accordion, Alert, Avatar, Badge, Breadcrumb, Card, Carousel, Clipboard, Collapsible, Data List, Empty State, Icon, Image, Marquee, Pagination, Progress, Progress Circle, QR Code, Skeleton, Spinner, Stat, Status, Steps, Table, Tabs, Tag, Timeline |
| Utilities and internationalization | Checkmark, Client Only, Environment Provider, For, Format Byte, Format Number, Locale Provider, Portal, Presence, Radiomark, Show, Skip Nav, Theme, Visually Hidden |

The family table is the authoritative scope list. Before implementation, record each component's ecentryUI API, variants, states, and interaction matrix in its component contract.

## API and behavior contract

- Use TypeScript and React 18+ with typed refs, native element props where appropriate, and predictable controlled/uncontrolled modes. Offer composable slots for complex widgets and a concise default composition for common usage. Avoid a required configuration prop for the default case.
- Define for each component: semantic DOM, parts/slots, default variants and sizes, allowed states, event sequence, keyboard and pointer behavior, focus movement/restoration, accessible name/description, form participation, animation, RTL behavior, and SSR/hydration behavior. Document async and error states where relevant. Use `SPEC-react-interactions.md` as the baseline.
- Cover the full state space: default, hover, focus-visible, active, disabled, read-only, invalid, required, loading, selected/checked, open/closed, empty, and indeterminate where applicable. Include touch and high-contrast presentation. For each complex widget, test relevant ARIA Authoring Practices interactions, including typeahead, roving focus, Escape, Home/End, and arrow navigation as appropriate.
- Allow style customization at root and named slots through classes and tokens, without leaking internal DOM assumptions. Prefer native semantics; use headless primitives only where they materially improve accessibility and behavior. Each component must be consumer-owned source with stable dependency declarations from `distribution`.
- Heavy optional capabilities such as Rich Text Editor, Code Block highlighting, QR generation, and advanced dates must load only their declared dependencies. Do not make every consumer install them or ship them in the default bundle.

## Proposed structure and commands

Proposed structure: `packages/react/src/components/<component>/` for canonical source and contract tests; `registry/react/<component>/` for installable source and metadata; `apps/docs/` for demonstrations. The registry build must derive from canonical source so copies cannot drift. Use strict TypeScript, two-space indentation, kebab-case component folders, PascalCase exports, and explicit public subpaths. Proposed root commands: `npm run build`, `npm run typecheck`, `npm run lint`, `npm test`, and `npm run test:e2e`; these do not exist yet.

## Acceptance and verification

1. A tracked catalog matrix has one row per component with its ecentryUI API, variants/defaults, example sections, interaction tests, accessibility tests, docs URL, and completion evidence. No row may be waived silently.
2. Every component passes contract tests for applicable states and keyboard behavior, axe-based checks, at least one real-browser interaction flow, and light/dark visual baselines. Complex widgets need screen-reader manual review on a documented browser/AT matrix before release.
3. Consumer fixtures prove ESM and type imports, tree-shaking, SSR/hydration, form integration, React strict mode, RTL, and customization. Interactive previews must use the same registry source as installed consumers.
4. The release gate is every catalog entry with a reviewed completion row, passing CI, no critical or serious accessibility violations, and no unexplained visual regressions. A public gap list must state any incomplete behavior.

## Boundaries

Always deliver the documented user-visible functionality and write original implementation code. Ask before removing a catalog entry or narrowing its behavior. The exact headless primitive choice per widget is a planning decision within the architecture contract; native controls are preferred when sufficient.
