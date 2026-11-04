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

export type WhyCategory = 'sky' | 'weather' | 'body' | 'animals' | 'plants' | 'everyday';

export const whyCategories: Record<WhyCategory, { color: string; text: string; title: Localized }> = {
  sky: { color: 'var(--c-blue)', text: 'var(--t-blue)', title: { en: 'Sky & space', vi: 'Bầu trời & vũ trụ', es: 'Cielo y espacio' } },
  weather: { color: 'var(--c-teal)', text: 'var(--t-teal)', title: { en: 'Earth & weather', vi: 'Trái Đất & thời tiết', es: 'La Tierra y el tiempo' } },
  body: { color: 'var(--c-red)', text: 'var(--t-red)', title: { en: 'My body', vi: 'Cơ thể bạn', es: 'Mi cuerpo' } },
  animals: { color: 'var(--c-green)', text: 'var(--t-green)', title: { en: 'Animals', vi: 'Động vật', es: 'Animales' } },
  plants: { color: 'var(--c-amber)', text: 'var(--t-amber)', title: { en: 'Plants', vi: 'Thực vật', es: 'Plantas' } },
  everyday: { color: 'var(--c-purple)', text: 'var(--t-purple)', title: { en: 'Everyday things', vi: 'Đồ vật quanh ta', es: 'Cosas de cada día' } },
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
  { slug: 'why-do-we-have-seasons', n: 9, category: 'sky', minutes: 4 },
  { slug: 'why-do-stars-twinkle', n: 10, category: 'sky', minutes: 3 },
  { slug: 'why-is-the-sea-salty', n: 11, category: 'weather', minutes: 3 },
  { slug: 'why-do-leaves-change-color-in-autumn', n: 12, category: 'plants', minutes: 3 },
  { slug: 'why-do-onions-make-you-cry', n: 13, category: 'everyday', minutes: 3 },
  { slug: 'why-does-ice-float', n: 14, category: 'everyday', minutes: 3 },
  { slug: 'why-do-we-yawn', n: 15, category: 'body', minutes: 3 },
  { slug: 'how-do-cats-land-on-their-feet', n: 16, category: 'animals', minutes: 3 },
  { slug: 'why-does-the-moon-follow-our-car', n: 17, category: 'sky', minutes: 3 },
  { slug: 'why-is-the-sun-so-hot', n: 18, category: 'sky', minutes: 3 },
  { slug: 'why-do-volcanoes-erupt', n: 19, category: 'weather', minutes: 3 },
  { slug: 'why-do-sunflowers-face-the-sun', n: 20, category: 'plants', minutes: 3 },
  { slug: 'how-do-fireflies-glow', n: 21, category: 'animals', minutes: 3 },
  { slug: 'why-does-a-rubbed-balloon-stick', n: 22, category: 'everyday', minutes: 3 },
  { slug: 'why-does-popcorn-pop', n: 23, category: 'everyday', minutes: 3 },
  { slug: 'why-do-we-get-hiccups', n: 24, category: 'body', minutes: 3 },
];

export const getWhy = (slug: string) => whys.find((w) => w.slug === slug);
export const whyNumber = (n: number) => String(n).padStart(3, '0');
