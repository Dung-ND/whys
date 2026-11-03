// Helpers for text inside interactive components (shipped to the browser).
// Each lab keeps its own labels next to it in strings.ts.
import type { Lang } from '@/config/site';

/** Translator factory: English is required, other languages fall back to it key by key. */
export function translator<T extends Record<string, string>>(table: { en: T } & Partial<Record<Lang, Partial<T>>>, lang: Lang = 'en') {
  return (key: keyof T, vars: Record<string, string | number> = {}) =>
    String(table[lang]?.[key] ?? table.en[key]).replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}

/** Locale-aware number formatting (1.5 vs 1,5). */
export const fmt = (lang: Lang, n: number, digits = 1) =>
  n.toLocaleString(lang, { maximumFractionDigits: digits, minimumFractionDigits: 0 });
