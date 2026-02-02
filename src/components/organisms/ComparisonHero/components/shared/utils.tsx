"use client";

import { Typography } from "@/components/atoms";
import type { RenderableValue } from "./types";
import {
  SourceTooltip,
  extractValue,
  extractSource,
  extractDescription,
  extractSynthesis,
} from "./SourceTooltip";
import type { SourceableString, SourceableArray } from "@/data/types";

/**
 * Type for values that can have sources
 */
export type SourceableValue =
  | string
  | string[]
  | number
  | SourceableString
  | SourceableArray
  | undefined
  | null;

/**
 * Renders a value that can be a string, array of strings, or number
 */
export function renderValue(value: RenderableValue): React.ReactNode {
  if (value === undefined || value === null) return "-";

  if (typeof value === "number") return value.toString();

  if (typeof value === "string") return value || "-";

  if (Array.isArray(value)) {
    if (value.length === 0) return "-";
    return value.map((item, index) => (
      <span key={index}>
        {item}
        {index < value.length - 1 && <br />}
      </span>
    ));
  }

  return "-";
}

/**
 * Renders a value with tooltip support for sources
 */
export function renderValueWithSource(value: SourceableValue): React.ReactNode {
  if (value === undefined || value === null) return "-";

  if (typeof value === "number") return value.toString();

  if (typeof value === "string") return value || "-";

  if (Array.isArray(value)) {
    if (value.length === 0) return "-";
    return value.map((item, index) => (
      <span key={index}>
        {item}
        {index < value.length - 1 && <br />}
      </span>
    ));
  }

  // Handle object with value/values and source
  if (typeof value === "object") {
    let displayValue = extractValue(value);
    const source = extractSource(value);
    const description = extractDescription(value);
    const synthesis = extractSynthesis(value);

    // If no display value but we have synthesis, we can use empty string or just rely on Tooltip displaying synthesis title.
    // However, usually there is a 'value' field which is the short text.
    // The user requirement says: "Leer los campos sintesis, descripcion y source".
    // "Mostrar la síntesis en negrita como título secundario".
    // In the JSON provided: "value" is sometimes NOT present or null if it's relying on "sintesis".
    // Wait, the JSONs provided show:
    // "ideologiaPolitica": { "economia": { "sintesis": "...", "descripcion": "...", "source": [...] } }
    // Note: NO "value" field in the new structure example!
    // So 'extractValue' might return undefined.
    // In that case, we should probably render the 'sintesis' as the main text if 'value' is missing,
    // OR just render the icon/empty and let the tooltip show everything?
    // Looking at the designs usually: The grid shows a short text.
    // If 'value' is missing, we should probably use 'sintesis' as the visible text in the grid too?
    // Let's check `IdeologiaPoliticaSection`. It calls `renderValueWithSource`.
    // The previous implementation of `ideologiaPolitica` had "value".
    // The new structure has `sintesis` instead of `value` in some cases?
    // User request: "Nueva Estructura Requerida: ... "sintesis": "...", "descripcion": "..." ..."
    // It does NOT show "value".
    // Checks `marioVizcarra.json`:
    // "ideologiaPolitica": { "posicion": { "value": "Centro", ... } }
    // But for "economia": { "sintesis": "...", ... }
    // So we should fallback to use `sintesis` as the display value if `value` is missing.

    if (displayValue === undefined || displayValue === null) {
      if (synthesis) {
        displayValue = synthesis;
      }
    }

    if (displayValue === undefined) return "-";

    const content =
      typeof displayValue === "string"
        ? displayValue || "-"
        : Array.isArray(displayValue)
          ? displayValue.length === 0
            ? "-"
            : displayValue.map((item, index) => (
                <span key={index}>
                  {item}
                  {index < displayValue.length - 1 && <br />}
                </span>
              ))
          : "-";

    return (
      <SourceTooltip source={source} description={description}>
        {content}
      </SourceTooltip>
    );
  }

  return "-";
}

/**
 * Renders a numbered list
 */
export function renderNumberedList(
  items: string[] | undefined
): React.ReactNode {
  if (!items || items.length === 0) return "-";
  return items.map((item, index) => (
    <span key={index}>
      {index + 1}. {item}
      {index < items.length - 1 && <br />}
    </span>
  ));
}

/**
 * Renders a numbered list with source tooltip
 */
export function renderNumberedListWithSource(
  value: SourceableArray | undefined
): React.ReactNode {
  if (!value) return "-";

  const items = extractValue(value) as string[] | undefined;
  const source = extractSource(value);

  if (!items || items.length === 0) return "-";

  const content = items.map((item, index) => (
    <span key={index}>
      {index + 1}. {item}
      {index < items.length - 1 && <br />}
    </span>
  ));

  return <SourceTooltip source={source}>{content}</SourceTooltip>;
}

/**
 * Renders a bulleted list
 */
export function renderBulletList(items: string[] | undefined): React.ReactNode {
  if (!items || items.length === 0) return "-";
  return items.map((item, index) => (
    <span key={index}>
      - {item}
      {index < items.length - 1 && <br />}
    </span>
  ));
}

/**
 * Renders a bulleted list with source tooltip
 */
export function renderBulletListWithSource(
  value: SourceableArray | undefined
): React.ReactNode {
  if (!value) return "-";

  const items = extractValue(value) as string[] | undefined;
  const source = extractSource(value);

  if (!items || items.length === 0) return "-";

  const content = items.map((item, index) => (
    <span key={index}>
      - {item}
      {index < items.length - 1 && <br />}
    </span>
  ));

  return <SourceTooltip source={source}>{content}</SourceTooltip>;
}

/**
 * Renders a list as Typography components
 */
export function renderTypographyList(
  items: string[] | undefined,
  align: "left" | "center" | "right" = "left"
): React.ReactNode {
  if (!items || items.length === 0) return "-";
  return items.map((item, index) => (
    <Typography
      key={index}
      color="white"
      variant="h6"
      align={align}
      weight="200"
      className="text-xs md:text-sm lg:text-base"
    >
      {item}
    </Typography>
  ));
}

/**
 * Renders a list as Typography components with source tooltip
 */
export function renderTypographyListWithSource(
  value:
    | string[]
    | { items: string[]; source?: string | string[] | null }
    | undefined,
  align: "left" | "center" | "right" = "left"
): React.ReactNode {
  if (!value) return "-";

  let items: string[];
  let source: string | string[] | null | undefined;

  if (Array.isArray(value)) {
    items = value;
    source = undefined;
  } else {
    items = value.items;
    source = value.source;
  }

  if (items.length === 0) return "-";

  const content = items.map((item, index) => (
    <Typography
      key={index}
      color="white"
      variant="h6"
      align={align}
      weight="200"
      className="text-xs md:text-sm lg:text-base"
    >
      <SourceTooltip source={source}>{item}</SourceTooltip>
    </Typography>
  ));

  return content;
}

/**
 * Get a nested value from an object using a dot-notation path
 */
export function getNestedValue<T>(
  obj: T | null | undefined,
  path: string
): RenderableValue {
  if (!obj) return undefined;

  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }

  return current as RenderableValue;
}
