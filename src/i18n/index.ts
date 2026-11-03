import { defaultLang, locales, type Lang } from '@/config/site';
import en from './locales/en.json';
import vi from './locales/vi.json';
import es from './locales/es.json';

export type Key = keyof typeof en;
const dictionaries: Record<Lang, Partial<Record<Key, string>>> = { en, vi, es };

/** Returns a translator for `lang`. Missing keys fall back to English. */
export function useT(lang: Lang) {
  return (key: Key, vars: Record<string, string | number> = {}) => {
    const s = dictionaries[lang][key] ?? en[key] ?? key;
    return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
  };
}

export const isLang = (x: unknown): x is Lang => locales.includes(x as Lang);

/** Use as `getStaticPaths` for pages under src/pages/[...lang]/. */
export const langPaths = () =>
  locales.map((lang) => ({ params: { lang: lang === defaultLang ? undefined : lang }, props: { lang } }));

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

/** Builds a site URL for `lang`, e.g. href('vi', 'why-is-the-sky-blue/') → /vi/why-is-the-sky-blue/ */
export function href(lang: Lang, path = ''): string {
  const prefix = lang === defaultLang ? '' : `${lang}/`;
  return `${base}${prefix}${path.replace(/^\//, '')}`;
}

/** Strips base path and language prefix: '/vi/why-is-the-sky-blue/' → 'why-is-the-sky-blue/' */
export function pathWithoutLang(pathname: string): string {
  let p = pathname.startsWith(base) ? pathname.slice(base.length) : pathname.replace(/^\//, '');
  const first = p.split('/')[0];
  if (isLang(first) && first !== defaultLang) p = p.slice(first.length + 1);
  return p;
}

export function langFromUrl(url: URL): Lang {
  const first = url.pathname.slice(base.length).split('/')[0];
  return isLang(first) ? first : defaultLang;
}
