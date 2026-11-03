# Adding a why

Whys are short, curious questions ("Why is the sky blue?") answered with real science in about 3 minutes.
Every page follows the same steps a scientist would:

1. **Your guess**: pick a hypothesis first (`<Guess>`); each choice gets a reply saying what it gets right or wrong.
2. **Investigate**: a small hands-on lab (Svelte) or a labeled diagram (Astro) that shows the evidence.
3. **The answer**: the first paragraph is the one-sentence answer (shown big); then the explanation.
4. **Extras**, as they fit: `<Myth>` (a common wrong idea), `<TryIt>` (a home experiment), `<Whoa>` (one surprising fact),
   `<Mystery>` (what science hasn't settled yet).

## Steps

1. **Catalog:** add an entry to `src/data/whys.ts`: the next free number (`n`, never reused), a category
   and the reading time. The page appears at `/<slug>/`.
2. **Text:** write `src/content/whys/en/<slug>.mdx`. The frontmatter needs `question`, `teaser` (one or two sentences for cards)
   and `art` (what the big picture shows, for screen readers). Copy an existing why for the layout.
   Translations go in `vi/` and `es/`; missing ones fall back to English with a notice.
3. **Big picture:** draw the scene in `src/components/whys/scenes/<Name>.astro` on a 640 × 400 canvas and register it in
   `scenes/index.ts`. Reuse `Kid.astro` for people. Use only `--art-*` colors from `src/styles/tokens.css`: they are the
   picture's own colors and stay the same in dark mode. Animate with CSS only (the site's reduce-motion rule stops it).
   Scenes also appear as card thumbnails, where animation is paused. If you need an `id` (clip path, gradient), make it
   unique per render, because the same scene can appear twice on one page.
4. **Investigate:** either a lab in `src/interactives/<topic>/` wrapped in `components/whys/Lab.svelte` (keep it to one
   or two controls, and make it work on phones), or a diagram in `components/whys/diagrams/` whose labels are passed in
   from the MDX so each language can translate them.
5. **Check the science.** Any formula goes in `src/lib/whys-science.ts` with a test in `tests/whys.test.ts`.
   Prefer "scientists think" over certainty where the evidence is mixed, and say what is still unknown.
   Home experiments must be safe for kids, with a `safety` note when needed.
