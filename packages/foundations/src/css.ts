import { resolveTokens } from "./tokens.js";
import type { Theme } from "./tokens.js";

export interface ThemeCssOptions {
  scope?: string;
}

const layerOrder =
  "@layer ec.reset, ec.tokens, ec.components, ec.variants, ec.utilities;";
const validScope =
  /^(?:\.[a-z][a-z0-9-]*|#[a-z][a-z0-9-]*|\[data-[a-z][a-z0-9-]*(?:="[a-z0-9-]+")?\])$/;

export function renderThemeCss(
  theme: Theme,
  options: ThemeCssOptions = {},
): string {
  const scope = options.scope ?? ":root";
  if (scope !== ":root" && !validScope.test(scope)) {
    throw new Error(`Invalid theme scope: ${scope}`);
  }

  const light = resolveTokens(theme, "light");
  const dark = resolveTokens(theme, "dark");
  const names = new Map<string, string>();
  const variableName = (path: string): string => {
    const name = `--${theme.prefix}-${path.replaceAll(".", "-")}`;
    const previous = names.get(name);
    if (previous && previous !== path) {
      throw new Error(`Token variable collision: ${previous} and ${path}`);
    }
    names.set(name, path);
    return name;
  };

  const lightDeclarations = Object.entries(light).map(
    ([path, value]) => `    ${variableName(path)}: ${value};`,
  );
  const darkDeclarations = Object.entries(dark)
    .filter(([path, value]) => value !== light[path])
    .map(([path, value]) => `    ${variableName(path)}: ${value};`);

  const selectors = {
    light: `:where(${scope}, ${scope} [data-ec-theme="light"])`,
    dark: `:where(${scope}[data-ec-theme="dark"], ${scope} [data-ec-theme="dark"])`,
    reset: `:where(${scope}, ${scope} *, ${scope} *::before, ${scope} *::after)`,
  };

  return [
    layerOrder,
    "@layer ec.reset {",
    `  ${selectors.reset} { box-sizing: border-box; }`,
    "}",
    "@layer ec.tokens {",
    `  ${selectors.light} {`,
    ...lightDeclarations,
    "  }",
    ...(darkDeclarations.length
      ? [`  ${selectors.dark} {`, ...darkDeclarations, "  }"]
      : []),
    "}",
    "",
  ].join("\n");
}
