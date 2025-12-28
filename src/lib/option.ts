// lib/option.ts
import type { ApiError } from "@/types";

export type Option<T> = T | null | undefined;

export function mapOption<T, R>(value: Option<T>, fn: (v: T) => R): Option<R> {
  return value != null ? fn(value) : null;
}

export function getOrElse<T>(value: Option<T>, fallback: T): T {
  return value != null ? value : fallback;
}

export function filterOption<T>(
  value: Option<T>,
  predicate: (v: T) => boolean
): Option<T> {
  return value != null && predicate(value) ? value : null;
}

export function orElseThrow<T>(
  value: Option<T>,
  errorFactory: () => ApiError
): T {
  if (value == null) {
    throw errorFactory();
  }
  return value;
}

/**
 * Ejecuta una acción si el valor está presente.
 */
export function ifPresent<T>(value: Option<T>, action: (v: T) => void): void {
  if (value != null) {
    action(value);
  }
}
