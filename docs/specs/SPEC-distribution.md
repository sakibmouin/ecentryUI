# Spec: distribution

## Objective

Give application teams ownership of the component source they install. An official registry and CLI must make a single component install, inspectable update, and local customization reliable without requiring a hosted account. This module serves the React MVP only; its manifest format must allow future framework identities without shipping other frameworks now.

## Consumer workflow

1. `npx ecentry init` detects the project, selects TypeScript or JavaScript, the source target, import alias, CSS entry, and package manager; it previews changes and writes a local `ecentry.json` only after the user accepts the normal CLI prompt.
2. `npx ecentry add button dialog` resolves registry dependencies, installs only required packages, writes readable source into the consumer's configured `components/ui/` directory, and imports the default theme tokens. Generated files are owned by the consumer and may be edited.
3. `npx ecentry add button --dry-run` shows files and dependencies; `--diff` compares local and registry versions without writing. `npx ecentry update button` presents a three-way diff using the recorded base version and preserves local edits unless the user explicitly resolves a conflict. No silent overwrite.
4. `npx ecentry doctor` checks configuration, peer compatibility, missing files, registry integrity, and token schema. Offline operation uses a pinned local registry cache when available and says clearly when it cannot verify freshness.

## Registry and architecture contract

- Registry items use a versioned, schema-validated manifest containing stable ID, framework `react`, source files and hashes, dependencies, peer ranges, required tokens/styles, related docs URL, license, and compatibility notes. Dependencies form an acyclic graph; resolution is deterministic.
- Registry payloads are original ecentryUI source with an open-source license preserved in distributed files. The consumer can inspect the exact payload and a content checksum before install. Remote sources must use HTTPS; path traversal, arbitrary postinstall scripts, and untrusted manifest commands are rejected.
- Keep shared behavior packages small and explicitly declared. The installed top-layer component markup, styling, and composition remain editable in the consumer repository. The spec does not require a monolithic `@ecentry/react` runtime import.
- Define semver for registry schema, component versions, and any shared runtime independently. A compatibility table maps CLI versions to schema and component ranges. Deprecations include a documented migration path.
- Package manager detection supports npm for MVP; pnpm, yarn, and bun are supported if installed and covered by consumer fixtures. Do not silently rewrite unrelated project config.

## Proposed structure and commands

Proposed paths: `packages/cli/`, `packages/registry-schema/`, `registry/react/`, and `fixtures/consumers/`. Use strict TypeScript, two-space formatting, kebab-case registry IDs, and explicit version fields. Proposed repository commands are `npm run registry:validate`, `npm run build`, `npm run lint`, `npm run typecheck`, and `npm test`. These commands must be implemented and documented after approval; none currently exist.

## Acceptance and testing

Fresh Vite and Next.js fixtures can init, add, import, render, customize, and build every component. Update tests cover clean files, locally edited files, dependency changes, merge conflicts, interrupted operations, and rollback on failure. Snapshot tests verify registry output is deterministic; security tests reject malicious paths and commands. A component install must not alter files outside the declared target and required configuration. CI validates every registry item against the corresponding component contract and docs example.

## Boundaries and open decisions

Always show destructive file changes before writing and preserve local edits. Ask before changing registry schema or requiring a new shared runtime. Never execute registry-supplied scripts or overwrite modified consumer files without explicit CLI interaction. Open decision for approval: whether a packaged import mode is also needed in MVP; this spec proposes source ownership as the primary and only required mode.
