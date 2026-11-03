// Pairs each why in src/data/whys.ts with its text in `lang` (falling back to English).
import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from '@/config/site';
import { whys, whyCategories, type Why } from '@/data/whys';

export interface LoadedWhy {
  why: Why;
  entry: CollectionEntry<'whys'>;
  fallback: boolean;
}

export async function loadWhys(lang: Lang): Promise<LoadedWhy[]> {
  const entries = await getCollection('whys');
  return whys.map((why) => {
    const entry = entries.find((e) => e.id === `${lang}/${why.slug}`) ?? entries.find((e) => e.id === `${defaultLang}/${why.slug}`);
    if (!entry) throw new Error(`Missing why file: src/content/whys/${defaultLang}/${why.slug}.mdx`);
    return { why, entry, fallback: !entry.id.startsWith(`${lang}/`) };
  });
}

/** CSS variables that color a card or page by its category. */
export function catStyle(why: Why) {
  const c = whyCategories[why.category];
  return `--cat:${c.color};--cat-text:${c.text};--cat-soft:color-mix(in srgb, ${c.color} 16%, var(--surface))`;
}
