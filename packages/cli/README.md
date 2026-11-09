# ecentry CLI

Build the workspaces with `npm run build`, then run `node packages/cli/dist/bin.js init --dry-run` from a consumer project to preview `ecentry.json`. Run `init --yes` to write it without an interactive prompt. The default config places source in `src/components/ui/`; edit `ecentry.json` to choose another safe relative directory before adding components.

Run `node packages/cli/dist/bin.js add button --dry-run --registry /path/to/registry/react` to inspect files and package dependencies. Remove `--dry-run` to apply the plan, or add `--yes` for noninteractive use. Without `--registry`, the CLI reads this repository's local registry. `add` checks every hash and dependency, installs declared npm packages with scripts disabled, and writes component files. Existing files are never overwritten. Peer dependencies are listed in the plan so the consumer can check compatibility.

The current CLI supports local registry items and npm projects. Update, diff, doctor, remote registry fetching, and other package managers are later tasks in the implementation plan.
