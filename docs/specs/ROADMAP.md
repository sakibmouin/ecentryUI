# ecentryUI phased product scope

## MVP release gate

The MVP is React-only. Release requires the four MVP module specs and the complete [React component catalog](SPEC-react-components.md) to pass their acceptance criteria. A partial component set may be published as previews, but it must not be called the complete React MVP. Changes to the catalog require a reviewed scope update.

## Phase 2: framework implementations

Add Angular, Vue, Svelte, Spring Boot/Thymeleaf, and vanilla HTML/CSS using shared token semantics and framework-specific, idiomatic component APIs. Each framework needs its own coverage matrix, distribution strategy, docs examples, and accessibility verification. Do not promise source-level React compatibility across frameworks. Start each framework only after its own spec and release criteria are approved.

Add chart capabilities as a separately scoped React release after the MVP. Specify chart types, data semantics, accessibility, and distribution before work begins.

## Phase 3: AI and application platform

Add agent skills, intelligent UI generation, templates, full application-building capabilities, and an AI-powered visual builder. The builder must produce inspectable source and token changes with structured human review, approval, version history, and reversible edits. AI output must be checked against the component registry and accessibility rules. Specify provider, data handling, cost controls, prompt/version provenance, and evaluation benchmarks before implementation. No AI feature is a dependency of the MVP React library or docs.

## Specification status

These approved specifications define the product scope. The repository currently has no application code, build scripts, or test framework. The [implementation plan](../../tasks/plan.md) orders the work and release gates. Do not treat proposed commands in the specs as runnable today.
