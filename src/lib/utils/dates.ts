/**
 * Date Utility Functions
 * Helper functions for date manipulation and formatting
 */

/**
 * Calculates days remaining until a target date
 */
export function getDaysRemaining(targetDate: Date): number {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();
  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

/**
 * Formats a date to a localized string
 */
export function formatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  return new Intl.DateTimeFormat("es-PE", options).format(date);
}

/**
 * Formats a date to a relative time string (e.g., "hace 2 días")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const difference = now.getTime() - date.getTime();
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `hace ${days} ${days === 1 ? "día" : "días"}`;
  if (hours > 0) return `hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
  if (minutes > 0)
    return `hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  return "hace unos segundos";
}

/**
 * Checks if a date is in the past
 */
export function isPast(date: Date): boolean {
  return date.getTime() < new Date().getTime();
}

/**
 * Checks if a date is in the future
 */
export function isFuture(date: Date): boolean {
  return date.getTime() > new Date().getTime();
}

/**
 * Creates a countdown object with days, hours, minutes, seconds
 */
export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export function getCountdown(targetDate: Date): Countdown {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const total = target - now;

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, total };
}
