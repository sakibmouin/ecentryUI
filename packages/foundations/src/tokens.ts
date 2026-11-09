export type Appearance = "light" | "dark";
export type TokenMap = Readonly<Record<string, string>>;
export type SemanticValue = Readonly<Record<Appearance, string>>;

export interface ThemeConfig {
  prefix?: string;
  tokens: Record<string, string>;
  semanticTokens?: Record<string, SemanticValue>;
}

export interface Theme {
  readonly version: 1;
  readonly prefix: string;
  readonly tokens: TokenMap;
  readonly semanticTokens: Readonly<Record<string, SemanticValue>>;
}

const tokenPath = /^[a-z][a-z0-9-]*(?:\.[a-z0-9][a-z0-9-]*)+$/;
const reference = /\{([a-z][a-z0-9-]*(?:\.[a-z0-9][a-z0-9-]*)+)\}/g;

function validatePath(path: string): void {
  if (!tokenPath.test(path)) {
    throw new Error(`Invalid token path: ${path}`);
  }
}

function validateValue(path: string, value: unknown): asserts value is string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Token ${path} needs a non-empty CSS value`);
  }
  const withoutReferences = value.replace(reference, "");
  const hasControlCharacter = Array.from(withoutReferences).some(
    (character) => character.charCodeAt(0) < 32,
  );
  if (
    /[;{}<>]/.test(withoutReferences) ||
    /\/\*|\*\//.test(withoutReferences) ||
    hasControlCharacter
  ) {
    throw new Error(`Token ${path} contains an invalid CSS value`);
  }
}

export function createTheme(config: ThemeConfig): Theme {
  const prefix = config.prefix ?? "ec";
  if (!/^[a-z][a-z0-9-]*$/.test(prefix)) {
    throw new Error(`Invalid token prefix: ${prefix}`);
  }

  const tokens: Record<string, string> = {};
  for (const [path, value] of Object.entries(config.tokens)) {
    validatePath(path);
    validateValue(path, value);
    tokens[path] = value;
  }

  const semanticTokens: Record<string, SemanticValue> = {};
  for (const [path, value] of Object.entries(config.semanticTokens ?? {})) {
    validatePath(path);
    if (Object.hasOwn(tokens, path)) {
      throw new Error(`Token ${path} is both primitive and semantic`);
    }
    validateValue(path, value.light);
    validateValue(path, value.dark);
    semanticTokens[path] = Object.freeze({
      light: value.light,
      dark: value.dark,
    });
  }

  const theme = Object.freeze({
    version: 1 as const,
    prefix,
    tokens: Object.freeze(tokens),
    semanticTokens: Object.freeze(semanticTokens),
  });
  resolveTokens(theme, "light");
  resolveTokens(theme, "dark");
  return theme;
}

export function resolveTokens(theme: Theme, appearance: Appearance): TokenMap {
  if (appearance !== "light" && appearance !== "dark") {
    throw new Error(`Invalid appearance: ${appearance}`);
  }
  const paths = [
    ...Object.keys(theme.tokens),
    ...Object.keys(theme.semanticTokens),
  ].sort();
  const resolved: Record<string, string> = {};

  function resolve(path: string, trail: string[]): string {
    if (Object.hasOwn(resolved, path)) return resolved[path]!;
    if (trail.includes(path)) {
      throw new Error(
        `Token reference cycle: ${[...trail, path].join(" -> ")}`,
      );
    }
    const value =
      theme.tokens[path] ?? theme.semanticTokens[path]?.[appearance];
    if (value === undefined) {
      throw new Error(
        `Token ${trail.at(-1) ?? path} references missing token ${path}`,
      );
    }
    const nextTrail = [...trail, path];
    const result = value.replace(reference, (_match, target: string) =>
      resolve(target, nextTrail),
    );
    resolved[path] = result;
    return result;
  }

  for (const path of paths) resolve(path, []);
  return Object.freeze(
    Object.fromEntries(paths.map((path) => [path, resolved[path]!])),
  );
}

export const defaultTheme = createTheme({
  tokens: {
    "colors.neutral.0": "#ffffff",
    "colors.neutral.50": "#f8f9f8",
    "colors.neutral.100": "#eef0ee",
    "colors.neutral.200": "#dce0dc",
    "colors.neutral.500": "#717b75",
    "colors.neutral.700": "#414a45",
    "colors.neutral.900": "#19211c",
    "colors.neutral.950": "#101713",
    "colors.brand.100": "#d7f3eb",
    "colors.brand.500": "#168873",
    "colors.brand.600": "#116e5e",
    "colors.brand.700": "#0d584b",
    "colors.danger.500": "#c43843",
    "spacing.0": "0px",
    "spacing.1": "4px",
    "spacing.2": "8px",
    "spacing.3": "12px",
    "spacing.4": "16px",
    "spacing.6": "24px",
    "spacing.8": "32px",
    "spacing.12": "48px",
    "radii.none": "0px",
    "radii.sm": "4px",
    "radii.md": "8px",
    "radii.lg": "12px",
    "radii.full": "9999px",
    "font.sizes.sm": "14px",
    "font.sizes.md": "16px",
    "font.sizes.lg": "18px",
    "font.weights.normal": "400",
    "font.weights.medium": "500",
    "font.weights.semibold": "600",
    "font.line-heights.normal": "1.5",
    "borders.width.thin": "1px",
    "shadows.sm": "0 1px 3px rgb(0 0 0 / 0.1)",
    "shadows.md": "0 8px 24px rgb(0 0 0 / 0.14)",
    "motion.duration.fast": "120ms",
    "motion.duration.normal": "200ms",
    "motion.duration.slow": "320ms",
    "motion.easing.standard": "cubic-bezier(0.2, 0, 0, 1)",
    "breakpoints.sm": "40rem",
    "breakpoints.md": "48rem",
    "breakpoints.lg": "64rem",
  },
  semanticTokens: {
    "colors.background": {
      light: "{colors.neutral.0}",
      dark: "{colors.neutral.950}",
    },
    "colors.surface": {
      light: "{colors.neutral.50}",
      dark: "{colors.neutral.900}",
    },
    "colors.text": {
      light: "{colors.neutral.950}",
      dark: "{colors.neutral.0}",
    },
    "colors.text.muted": {
      light: "{colors.neutral.700}",
      dark: "{colors.neutral.200}",
    },
    "colors.border": {
      light: "{colors.neutral.200}",
      dark: "{colors.neutral.700}",
    },
    "colors.accent": {
      light: "{colors.brand.600}",
      dark: "{colors.brand.100}",
    },
    "colors.accent.hover": {
      light: "{colors.brand.700}",
      dark: "{colors.neutral.0}",
    },
    "colors.focus": { light: "{colors.brand.500}", dark: "{colors.brand.100}" },
    "colors.danger": {
      light: "{colors.danger.500}",
      dark: "{colors.danger.500}",
    },
  },
});
