import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// The text of each why, one MDX file per language: src/content/whys/<lang>/<slug>.mdx
// Number, category and reading time live in src/data/whys.ts.
export const collections = {
  whys: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/whys' }),
    schema: z.object({
      question: z.string(),
      /** One or two sentences shown on cards and under the question. */
      teaser: z.string(),
      /** What the big picture at the top shows, for screen readers. */
      art: z.string(),
    }),
  }),
};
