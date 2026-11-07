// Central place to customize the site. Most branding lives here and in src/styles/tokens.css.

export const site = {
  name: 'Whys',
  /** Text stamped in the corner of every picture and lab. */
  watermark: 'Whys?',
  /** Year shown in the footer. */
  since: 2026,
  repo: 'https://github.com/Silly-Sprout-Lab/whys',
};

/** Supported languages. The first one is the default and is served without a URL prefix. */
export const locales = ['en', 'vi', 'es'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'en';

export const languageNames: Record<Lang, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
  es: 'Español',
};

/**
 * Used when a visitor has no saved language and their browser language is not supported:
 * we guess from their time zone (a rough proxy for region). Keys are IANA zone prefixes.
 */
export const regionHints: Record<string, Lang> = {
  'Asia/Ho_Chi_Minh': 'vi',
  'Asia/Saigon': 'vi',
  'Europe/Madrid': 'es',
  'Atlantic/Canary': 'es',
  'America/Mexico_City': 'es',
  'America/Bogota': 'es',
  'America/Lima': 'es',
  'America/Santiago': 'es',
  'America/Argentina': 'es',
  'America/Caracas': 'es',
  'America/Guatemala': 'es',
  'America/Montevideo': 'es',
  'America/Asuncion': 'es',
  'America/La_Paz': 'es',
  'America/Guayaquil': 'es',
  'America/Costa_Rica': 'es',
  'America/Panama': 'es',
  'America/El_Salvador': 'es',
  'America/Tegucigalpa': 'es',
  'America/Managua': 'es',
  'America/Santo_Domingo': 'es',
  'America/Havana': 'es',
};
