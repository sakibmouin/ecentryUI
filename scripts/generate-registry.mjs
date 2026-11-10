import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { format } from "prettier";
import { generateRegistryItem } from "@ecentry/registry-schema";
import { buttonRegistryItem } from "../packages/react/dist/components/button/metadata.js";
import { inputRegistryItem } from "../packages/react/dist/components/input/metadata.js";
import { dialogRegistryItem } from "../packages/react/dist/components/dialog/metadata.js";
import { absoluteCenterRegistryItem } from "../packages/react/dist/components/absolute-center/metadata.js";
import { aspectRatioRegistryItem } from "../packages/react/dist/components/aspect-ratio/metadata.js";
import { bleedRegistryItem } from "../packages/react/dist/components/bleed/metadata.js";
import { boxRegistryItem } from "../packages/react/dist/components/box/metadata.js";
import { centerRegistryItem } from "../packages/react/dist/components/center/metadata.js";
import { containerRegistryItem } from "../packages/react/dist/components/container/metadata.js";
import { flexRegistryItem } from "../packages/react/dist/components/flex/metadata.js";
import { floatRegistryItem } from "../packages/react/dist/components/float/metadata.js";

for (const item of [
  buttonRegistryItem,
  inputRegistryItem,
  dialogRegistryItem,
  absoluteCenterRegistryItem,
  aspectRatioRegistryItem,
  bleedRegistryItem,
  boxRegistryItem,
  centerRegistryItem,
  containerRegistryItem,
  flexRegistryItem,
  floatRegistryItem,
]) {
  const sources = Object.fromEntries(
    await Promise.all(
      item.files.map(async (file) => [
        file.source,
        await readFile(file.source, "utf8"),
      ]),
    ),
  );
  const payload = generateRegistryItem(item, (source) => sources[source]);
  const directory = path.join("registry/react", item.id);
  await mkdir(directory, { recursive: true });
  await writeFile(
    path.join(directory, "manifest.json"),
    await format(JSON.stringify(payload.manifest), { parser: "json" }),
  );
  for (const [file, content] of Object.entries(payload.files)) {
    const destination = path.join(directory, file);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, content);
  }
}
