import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const components = path.join(root, "packages/react/src/components");
const sharedContracts = path.join(root, "packages/react/src/contracts.ts");
const registry = path.join(root, "registry/react");
const pages = path.join(root, "apps/docs/content/components");

const aliases = {
  "client-only": ["clientonly", "hydration"],
  "format-byte": ["file size", "bytes"],
  "native-select": ["select native", "dropdown"],
  "progress-circle": ["circular progress"],
  "qr-code": ["qrcode", "qr"],
  "segmented-control": ["segments"],
  "skip-nav": ["skip link"],
  steps: ["stepper", "wizard"],
  "visually-hidden": ["sr-only", "screen reader only"],
};

function publicApi(program, checker, directory) {
  const file = program.getSourceFile(path.join(directory, "index.ts"));
  const module = file && checker.getSymbolAtLocation(file);
  if (!module) return [];

  return checker
    .getExportsOfModule(module)
    .filter((symbol) => symbol.name.endsWith("Props"))
    .flatMap((symbol) => {
      const target =
        symbol.flags & ts.SymbolFlags.Alias
          ? checker.getAliasedSymbol(symbol)
          : symbol;
      const type = checker.getDeclaredTypeOfSymbol(target);
      const props = checker.getPropertiesOfType(type).flatMap((field) => {
        const declaration = field.declarations?.find((entry) => {
          const source = entry.getSourceFile().fileName;
          return (
            source === sharedContracts ||
            source.startsWith(directory + path.sep)
          );
        });
        if (
          !declaration ||
          field.getJsDocTags().some(({ name }) => name === "internal")
        )
          return [];
        const fieldType = checker.getTypeOfSymbolAtLocation(field, declaration);
        return [
          {
            name: field.name,
            required: !(field.flags & ts.SymbolFlags.Optional),
            description: ts.displayPartsToString(
              field.getDocumentationComment(checker),
            ),
            type: checker.typeToString(
              fieldType,
              declaration,
              ts.TypeFormatFlags.NoTruncation,
            ),
          },
        ];
      });
      return props.length ? [{ name: symbol.name, props }] : [];
    });
}

export async function generateCatalog() {
  const ids = (await readdir(registry, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const configPath = path.join(root, "packages/react/tsconfig.json");
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  const { options } = ts.parseJsonConfigFileContent(
    config.config,
    ts.sys,
    path.dirname(configPath),
  );
  const program = ts.createProgram(
    ids.map((id) => path.join(components, id, "index.ts")),
    options,
  );
  const checker = program.getTypeChecker();

  return Promise.all(
    ids.map(async (id) => {
      const [source, manifest] = await Promise.all([
        readFile(path.join(pages, `${id}.mdx`), "utf8"),
        readFile(path.join(registry, id, "manifest.json"), "utf8").then(
          JSON.parse,
        ),
      ]);
      const title = source.match(/^# (.+)$/m)?.[1];
      if (!title) throw new Error(`Missing heading for ${id}`);
      return {
        id,
        title,
        href: `/components/${id}/`,
        version: manifest.version,
        aliases: aliases[id] ?? [],
        keywords: [
          ...new Set([
            ...Array.from(
              source.matchAll(/^#{2,4} (.+)$/gm),
              (match) => match[1],
            ),
            ...Array.from(source.matchAll(/`([^\n`]+)`/g), (match) => match[1]),
            ...Array.from(
              source.matchAll(
                /\b(loading|disabled|required|invalid|selected|checked|read-only|indeterminate|empty|open|closed|hover|focus|dark|light|controlled|uncontrolled)\b/gi,
              ),
              (match) => match[0].toLowerCase(),
            ),
          ]),
        ],
        api: publicApi(program, checker, path.join(components, id)),
      };
    }),
  );
}
