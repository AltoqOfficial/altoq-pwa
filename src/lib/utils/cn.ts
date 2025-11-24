import { type ClassValue, clsx } from "clsx";

/**
 * Utility function to merge class names
 * Combines clsx for conditional classes
 *
 * @example
 * cn('base-class', condition && 'conditional-class', { 'object-class': true })
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
