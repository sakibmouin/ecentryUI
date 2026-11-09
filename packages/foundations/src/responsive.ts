import { resolveTokens } from "./tokens.js";
import type { Theme } from "./tokens.js";

export type ResponsiveValue = string | Readonly<Record<string, string>>;
export type ResponsiveStyles = Readonly<Record<string, ResponsiveValue>>;

const validSelector =
  /^(?:\.[a-z][a-z0-9-]*|#[a-z][a-z0-9-]*|\[data-[a-z][a-z0-9-]*(?:="[a-z0-9-]+")?\])$/;
const validProperty = /^(?:--[a-z][a-z0-9-]*|[a-z][a-z0-9-]*)$/;

function validateValue(property: string, value: string): void {
  if (!value.trim() || /[;{}<>\n\r]/.test(value) || /\/\*|\*\//.test(value)) {
    throw new Error(`Invalid CSS value for ${property}`);
  }
}

function widthInPixels(value: string, name: string): number {
  const match = /^(\d+(?:\.\d+)?)(px|rem)$/.exec(value);
  if (!match) throw new Error(`Invalid breakpoint ${name}: ${value}`);
  return Number(match[1]) * (match[2] === "rem" ? 16 : 1);
}

export function renderResponsiveCss(
  theme: Theme,
  selector: string,
  styles: ResponsiveStyles,
): string {
  if (!validSelector.test(selector))
    throw new Error(`Invalid selector: ${selector}`);

  const tokens = resolveTokens(theme, "light");
  const breakpoints = Object.fromEntries(
    Object.entries(tokens)
      .filter(([path]) => path.startsWith("breakpoints."))
      .map(([path, value]) => [path.slice("breakpoints.".length), value]),
  );
  const declarations = new Map<string, string[]>();
  for (const [property, responsiveValue] of Object.entries(styles)) {
    if (!validProperty.test(property))
      throw new Error(`Invalid CSS property: ${property}`);
    const values =
      typeof responsiveValue === "string"
        ? { base: responsiveValue }
        : responsiveValue;
    for (const [breakpoint, value] of Object.entries(values)) {
      if (breakpoint !== "base" && !Object.hasOwn(breakpoints, breakpoint)) {
        throw new Error(`Unknown breakpoint: ${breakpoint}`);
      }
      validateValue(property, value);
      const group = declarations.get(breakpoint) ?? [];
      group.push(`    ${property}: ${value};`);
      declarations.set(breakpoint, group);
    }
  }

  const output = ["@layer ec.components {"];
  const base = declarations.get("base");
  if (base) output.push(`  ${selector} {`, ...base, "  }");
  const ordered = [...declarations.keys()]
    .filter((name) => name !== "base")
    .sort(
      (a, b) =>
        widthInPixels(breakpoints[a]!, a) - widthInPixels(breakpoints[b]!, b),
    );
  for (const name of ordered) {
    output.push(
      `  @media (min-width: ${breakpoints[name]}) {`,
      `    ${selector} {`,
    );
    output.push(...declarations.get(name)!.map((line) => `  ${line}`));
    output.push("    }", "  }");
  }
  output.push("}", "");
  return output.join("\n");
}
