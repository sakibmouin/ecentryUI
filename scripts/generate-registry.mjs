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
import { floatingPanelRegistryItem } from "../packages/react/dist/components/floating-panel/metadata.js";
import { gridRegistryItem } from "../packages/react/dist/components/grid/metadata.js";
import { groupRegistryItem } from "../packages/react/dist/components/group/metadata.js";
import { scrollAreaRegistryItem } from "../packages/react/dist/components/scroll-area/metadata.js";
import { separatorRegistryItem } from "../packages/react/dist/components/separator/metadata.js";
import { simpleGridRegistryItem } from "../packages/react/dist/components/simple-grid/metadata.js";
import { splitterRegistryItem } from "../packages/react/dist/components/splitter/metadata.js";
import { stackRegistryItem } from "../packages/react/dist/components/stack/metadata.js";
import { wrapRegistryItem } from "../packages/react/dist/components/wrap/metadata.js";
import { blockquoteRegistryItem } from "../packages/react/dist/components/blockquote/metadata.js";
import { codeRegistryItem } from "../packages/react/dist/components/code/metadata.js";
import { codeBlockRegistryItem } from "../packages/react/dist/components/code-block/metadata.js";
import { emRegistryItem } from "../packages/react/dist/components/em/metadata.js";
import { headingRegistryItem } from "../packages/react/dist/components/heading/metadata.js";
import { highlightRegistryItem } from "../packages/react/dist/components/highlight/metadata.js";
import { kbdRegistryItem } from "../packages/react/dist/components/kbd/metadata.js";
import { linkRegistryItem } from "../packages/react/dist/components/link/metadata.js";
import { linkOverlayRegistryItem } from "../packages/react/dist/components/link-overlay/metadata.js";
import { listRegistryItem } from "../packages/react/dist/components/list/metadata.js";
import { markRegistryItem } from "../packages/react/dist/components/mark/metadata.js";
import { proseRegistryItem } from "../packages/react/dist/components/prose/metadata.js";
import { richTextEditorRegistryItem } from "../packages/react/dist/components/rich-text-editor/metadata.js";
import { textRegistryItem } from "../packages/react/dist/components/text/metadata.js";
import { closeButtonRegistryItem } from "../packages/react/dist/components/close-button/metadata.js";
import { iconButtonRegistryItem } from "../packages/react/dist/components/icon-button/metadata.js";
import { downloadTriggerRegistryItem } from "../packages/react/dist/components/download-trigger/metadata.js";
import { calendarRegistryItem } from "../packages/react/dist/components/calendar/metadata.js";
import { dateInputRegistryItem } from "../packages/react/dist/components/date-input/metadata.js";
import { datePickerRegistryItem } from "../packages/react/dist/components/date-picker/metadata.js";
import { checkboxRegistryItem } from "../packages/react/dist/components/checkbox/metadata.js";

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
  floatingPanelRegistryItem,
  gridRegistryItem,
  groupRegistryItem,
  scrollAreaRegistryItem,
  separatorRegistryItem,
  simpleGridRegistryItem,
  splitterRegistryItem,
  stackRegistryItem,
  wrapRegistryItem,
  blockquoteRegistryItem,
  codeRegistryItem,
  codeBlockRegistryItem,
  emRegistryItem,
  headingRegistryItem,
  highlightRegistryItem,
  kbdRegistryItem,
  linkRegistryItem,
  linkOverlayRegistryItem,
  listRegistryItem,
  markRegistryItem,
  proseRegistryItem,
  richTextEditorRegistryItem,
  textRegistryItem,
  closeButtonRegistryItem,
  iconButtonRegistryItem,
  downloadTriggerRegistryItem,
  calendarRegistryItem,
  dateInputRegistryItem,
  datePickerRegistryItem,
  checkboxRegistryItem,
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
