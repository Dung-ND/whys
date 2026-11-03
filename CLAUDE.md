# Whys: notes for contributors and AI assistants

- Static Astro 7 site, Svelte 5 (runes) islands, MDX content. Node ≥ 22.23.4 (`.nvmrc` = 24).
- `npm test` runs `node --test` on `tests/*.test.ts` (Node strips TS types; no test framework).
- Catalog in `src/data/whys.ts`; text in `src/content/whys/<lang>/<slug>.mdx`; pages live at `/<slug>/` (and `/vi/<slug>/`, `/es/<slug>/`).
- Labs receive `lang` and keep their own labels in `strings.ts` (en required, others fall back).
- Labs render inside `<Stage>` and cartoons/diagrams inside `components/whys/Figure.astro`: both add the watermark.
- Colors only via CSS variables in `src/styles/tokens.css` (must work in light and dark). Cartoons and diagrams use the `--art-*` colors, which stay the same in dark mode.
- In SVG, CSS `fill` beats the `fill` attribute: style default text colors with `:not([fill])`.
- Every page must work on phones (390px wide) with no sideways scrolling.
- Science must be right: put formulas in `src/lib/whys-science.ts` with tests, and say "scientists think" where evidence is mixed.
- See docs/ADDING_A_WHY.md.
