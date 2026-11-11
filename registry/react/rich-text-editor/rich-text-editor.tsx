// SPDX-License-Identifier: MIT
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ClipboardDOMImportExtension } from "@lexical/clipboard";
import { HistoryExtension } from "@lexical/history";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalExtensionComposer } from "@lexical/react/LexicalExtensionComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { RichTextExtension } from "@lexical/rich-text";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  defineExtension,
  FORMAT_TEXT_COMMAND,
} from "lexical";

export interface RichTextEditorProps {
  value?: string | undefined;
  defaultValue?: string | undefined;
  initialText?: string | undefined;
  onChange?: ((value: string) => void) | undefined;
  onSave?: ((value: string) => void) | undefined;
  saveDelay?: number;
  disabled?: boolean;
  readOnly?: boolean;
  label: string;
  className?: string;
}

function EditorControls({
  value,
  onChange,
  onSave,
  saveDelay,
  disabled,
  readOnly,
  label,
}: Omit<RichTextEditorProps, "defaultValue" | "initialText" | "className">) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(!disabled && !readOnly);
  }, [editor, disabled, readOnly]);

  useEffect(() => {
    if (value === undefined) return;
    const current = JSON.stringify(editor.getEditorState().toJSON());
    if (current !== value)
      editor.setEditorState(editor.parseEditorState(value));
  }, [editor, value]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      const serialized = JSON.stringify(editorState.toJSON());
      if (serialized === value) return;
      onChange?.(serialized);
      if (onSave) {
        clearTimeout(timer);
        timer = setTimeout(() => onSave(serialized), saveDelay);
      }
    });
    return () => {
      unregister();
      clearTimeout(timer);
    };
  }, [editor, onChange, onSave, saveDelay, value]);

  const formatButton = (
    format: "bold" | "italic" | "underline",
    text: string,
  ): ReactNode => (
    <button
      type="button"
      disabled={disabled || readOnly}
      aria-label={text}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)}
    >
      {text}
    </button>
  );

  return (
    <>
      <div
        className="ec-rich-text-editor__toolbar"
        role="toolbar"
        aria-label="Formatting"
      >
        {formatButton("bold", "Bold")}
        {formatButton("italic", "Italic")}
        {formatButton("underline", "Underline")}
      </div>
      <ContentEditable
        className="ec-rich-text-editor__content"
        aria-label={label}
        aria-multiline="true"
        role="textbox"
        onKeyDown={(event) => {
          if (event.key === "Escape") event.currentTarget.blur();
        }}
      />
    </>
  );
}

export function RichTextEditor({
  value,
  defaultValue,
  initialText,
  onChange,
  onSave,
  saveDelay = 500,
  disabled = false,
  readOnly = false,
  label,
  className,
}: RichTextEditorProps) {
  const [extension] = useState(() =>
    defineExtension({
      name: "ec-rich-text-editor",
      namespace: "ec-rich-text-editor",
      dependencies: [
        RichTextExtension,
        HistoryExtension,
        ClipboardDOMImportExtension,
      ],
      ...(defaultValue
        ? { $initialEditorState: defaultValue }
        : initialText
          ? {
              $initialEditorState: () => {
                $getRoot().append(
                  $createParagraphNode().append($createTextNode(initialText)),
                );
              },
            }
          : {}),
    }),
  );

  return (
    <div className={`ec-rich-text-editor${className ? ` ${className}` : ""}`}>
      <LexicalExtensionComposer extension={extension} contentEditable={null}>
        <EditorControls
          value={value}
          onChange={onChange}
          onSave={onSave}
          saveDelay={saveDelay}
          disabled={disabled}
          readOnly={readOnly}
          label={label}
        />
      </LexicalExtensionComposer>
    </div>
  );
}
