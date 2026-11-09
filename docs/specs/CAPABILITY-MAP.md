# ecentryUI capability map

## Product objective

Build an open-source design platform whose first release is a complete, source-owned React UI system with a polished documentation site. Later releases add other frameworks and AI tooling.

| Module ID | Responsibility | Depends on | Phase |
| --- | --- | --- | --- |
| `design-foundations` | Tokens, semantic colors, themes, responsive rules, appearance, accessibility defaults | None | MVP |
| `react-components` | Complete React catalog, interaction contracts, and public APIs | `design-foundations` | MVP |
| `distribution` | Consumer-owned source registry, install/update CLI, version metadata, compatibility checks | `design-foundations`, `react-components` | MVP |
| `documentation` | Searchable guides, API references, previews, playgrounds, and examples | All other MVP modules | MVP |
| `framework-adapters` | Angular, Vue, Svelte, Spring Boot/Thymeleaf, HTML/CSS implementations | Stabilized foundation contracts | Later |
| `ai-platform` | Agent skills, UI generation, templates, full applications, visual builder with human review | Stable registry and framework contracts | Later |

Build order after approval: foundations, component families, distribution, then documentation, with docs and verification developed alongside each component family. The module boundaries are product boundaries, not a mandate for six npm packages.

The shared [architecture and API contract](SPEC-architecture-and-api.md) describes the proposed monorepo, source ownership boundary, React naming, and verification toolchain.

## MVP catalog boundary

The MVP includes every entry in the [React component catalog](SPEC-react-components.md), with its applicable variants, states, interactions, and accessibility behavior verified in real browsers. The catalog is the scope contract for the first complete release. APIs should favor clear defaults and consistent composition.

## Exclusions

The MVP does not ship the other framework adapters, AI agents, generation, templates, full-app builder, visual builder, or an advanced theme editor. Their future interfaces must not force MVP consumers to install those systems.
