// The catalog of whys: short, curious questions answered with real science.
// Every card and page is generated from this list.
//
// To add a why:
//   1. Add an entry here (next free number, a category, reading time).
//   2. Write src/content/whys/en/<slug>.mdx (and optionally vi/, es/ translations).
//   3. Draw its scene in src/components/whys/scenes/ and register it in scenes/index.ts.
// See docs/ADDING_A_WHY.md.

import type { Lang } from '@/config/site';

/** English is required; other languages fall back to English. */
export type Localized = { en: string } & Partial<Record<Lang, string>>;
export const localized = (value: Localized, lang: Lang) => value[lang] ?? value.en;

export type WhyCategory = 'sky' | 'weather' | 'body' | 'animals';

export const whyCategories: Record<WhyCategory, { color: string; text: string; title: Localized }> = {
  sky: { color: 'var(--c-blue)', text: 'var(--t-blue)', title: { en: 'Sky & space', vi: 'Bầu trời & vũ trụ', es: 'Cielo y espacio' } },
  weather: { color: 'var(--c-teal)', text: 'var(--t-teal)', title: { en: 'Weather', vi: 'Thời tiết', es: 'El tiempo' } },
  body: { color: 'var(--c-red)', text: 'var(--t-red)', title: { en: 'My body', vi: 'Cơ thể em', es: 'Mi cuerpo' } },
  animals: { color: 'var(--c-green)', text: 'var(--t-green)', title: { en: 'Animals', vi: 'Động vật', es: 'Animales' } },
};

export interface Why {
  slug: string;
  /** Shown as "Why #001". Never reuse a number. */
  n: number;
  category: WhyCategory;
  minutes: number;
}

export const whys: Why[] = [
  { slug: 'why-is-the-sky-blue', n: 1, category: 'sky', minutes: 3 },
  { slug: 'why-does-the-moon-change-shape', n: 2, category: 'sky', minutes: 3 },
  { slug: 'why-do-we-hear-thunder-after-lightning', n: 3, category: 'weather', minutes: 3 },
  { slug: 'why-do-rainbows-appear', n: 4, category: 'weather', minutes: 3 },
  { slug: 'why-do-we-get-goosebumps', n: 5, category: 'body', minutes: 2 },
  { slug: 'why-do-fingers-wrinkle-in-water', n: 6, category: 'body', minutes: 3 },
  { slug: 'why-do-zebras-have-stripes', n: 7, category: 'animals', minutes: 3 },
  { slug: 'why-dont-birds-get-shocked-on-power-lines', n: 8, category: 'animals', minutes: 3 },
];

export const getWhy = (slug: string) => whys.find((w) => w.slug === slug);
export const whyNumber = (n: number) => String(n).padStart(3, '0');
