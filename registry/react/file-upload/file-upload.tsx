// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { ComponentPropsWithoutRef, DragEvent } from "react";

export interface FileUploadProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "type" | "value" | "defaultValue" | "onChange"
> {
  label: string;
  files?: File[];
  defaultFiles?: File[];
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
}

export function FileUpload({
  label,
  files,
  defaultFiles = [],
  onFilesChange,
  maxFiles,
  maxSize,
  multiple = false,
  accept,
  disabled,
  required,
  className,
  id,
  ...rest
}: FileUploadProps) {
  const generated = useId();
  const inputId = id ?? generated;
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalFiles, setInternalFiles] = useState<File[]>(defaultFiles);
  const [error, setError] = useState<string>();
  const selected = files ?? internalFiles;

  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form) return;
    const reset = () => {
      setError(undefined);
      if (files === undefined) setInternalFiles(defaultFiles);
      onFilesChange?.(defaultFiles);
    };
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, [files, defaultFiles, onFilesChange]);

  function update(next: File[]) {
    if (inputRef.current) {
      if (typeof DataTransfer !== "undefined") {
        const transfer = new DataTransfer();
        next.forEach((file) => transfer.items.add(file));
        inputRef.current.files = transfer.files;
      } else if (next.length === 0) {
        inputRef.current.value = "";
      }
    }
    if (files === undefined) setInternalFiles(next);
    onFilesChange?.(next);
    setError(undefined);
  }
  function add(incoming: File[]) {
    if (disabled || incoming.length === 0) return;
    const next = multiple ? [...selected, ...incoming] : incoming.slice(0, 1);
    if (maxFiles !== undefined && next.length > maxFiles) {
      setError(`Choose at most ${maxFiles} files`);
      return;
    }
    if (maxSize !== undefined && incoming.some((file) => file.size > maxSize)) {
      setError(`Each file must be at most ${maxSize} bytes`);
      return;
    }
    if (
      accept &&
      incoming.some(
        (file) =>
          !accept.split(",").some((rule) => {
            const pattern = rule.trim().toLowerCase();
            return pattern.startsWith(".")
              ? file.name.toLowerCase().endsWith(pattern)
              : pattern.endsWith("/*")
                ? file.type.toLowerCase().startsWith(pattern.slice(0, -1))
                : file.type.toLowerCase() === pattern;
          }),
      )
    ) {
      setError("File type is not accepted");
      return;
    }
    update(next);
  }
  function drop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (disabled) return;
    add(Array.from(event.dataTransfer.files));
  }
  return (
    <div className={`ec-file-upload${className ? ` ${className}` : ""}`}>
      <div
        className="ec-file-upload__dropzone"
        onDragOver={(event) => event.preventDefault()}
        onDrop={drop}
      >
        <label htmlFor={inputId}>{label}</label>
        <input
          {...rest}
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          required={required && selected.length === 0}
          aria-invalid={error ? true : rest["aria-invalid"]}
          aria-describedby={
            error ? `${inputId}-error` : rest["aria-describedby"]
          }
          onChange={(event) => add(Array.from(event.currentTarget.files ?? []))}
        />
        <span>Choose {multiple ? "files" : "a file"} or drop here</span>
      </div>
      {error && (
        <p
          className="ec-file-upload__error"
          id={`${inputId}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
      {selected.length > 0 && (
        <ul className="ec-file-upload__list">
          {selected.map((file, index) => (
            <li key={`${file.name}-${index}`}>
              <span>{file.name}</span>
              <button
                type="button"
                disabled={disabled}
                aria-label={`Remove ${file.name}`}
                onClick={() => update(selected.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
