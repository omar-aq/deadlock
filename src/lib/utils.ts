import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumberCompact(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (abs >= 1_000_000) {
    const n = abs / 1_000_000;
    return `${sign}${Number.isInteger(n) ? n.toFixed(0) : n.toFixed(1)}M`;
  }
  if (abs >= 1_000) {
    const n = abs / 1_000;
    return `${sign}${Number.isInteger(n) ? n.toFixed(0) : n.toFixed(1)}k`;
  }
  return `${value}`;
}
