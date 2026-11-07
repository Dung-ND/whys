# Whys: notes for contributors and AI assistants

- Static Astro 7 site, Svelte 5 (runes) islands, MDX content. Node ≥ 22.23.4 (`.nvmrc` = 24).
- `npm test` runs `node --test` on `tests/*.test.ts` (Node strips TS types; no test framework).
- Questions not written yet live in `src/data/ideas.ts` (open/started, with hints); see CONTRIBUTING.md. Published whys move to the catalog.
- Catalog in `src/data/whys.ts`; text in `src/content/whys/<lang>/<slug>.mdx`; pages live at `/<slug>/` (and `/vi/<slug>/`, `/es/<slug>/`).
- Vietnamese text speaks to the reader as "bạn", never "em" (readers are all ages).
- Labs receive `lang` and keep their own labels in `strings.ts` (en required, others fall back).
- Labs render inside `<Stage>` and cartoons/diagrams inside `components/whys/Figure.astro`: both add the watermark.
- Colors only via CSS variables in `src/styles/tokens.css` (must work in light and dark). Cartoons and diagrams use the `--art-*` colors, which stay the same in dark mode.
- In SVG, CSS `fill` beats the `fill` attribute: style default text colors with `:not([fill])`.
- Every page must work on phones (390px wide) with no sideways scrolling.
- Reading first: pictures and labs play from the start once the reader scrolls to them (half in view), and can be paused (one site-wide switch in `src/lib/motion.ts`; reduce-motion starts paused). Labs play a film via `bind:running` on `<Lab>` until the reader touches a control.
- Science must be right: put formulas in `src/lib/whys-science.ts` with tests, and say "scientists think" where evidence is mixed.
- See docs/ADDING_A_WHY.md.

## How to work (so teammates never have to explain)

The person you're working with may be new to the project. Don't ask them to choose things this file already
decides; just do the work and tell them what you did. Ask only for things only they can decide (their name, if a
question must be claimed and you don't know it).

**When asked to "continue", or for "the next why", pick in this order:**
1. An idea in `src/data/ideas.ts` marked `started` by this person: finish it.
2. Otherwise the first `open` idea in the category with the fewest published whys (`npm run ideas` shows counts).
3. If asked for translation work instead: the lowest-numbered why that has no `src/content/whys/vi/` file.

**Writing a why, step by step** (details in docs/ADDING_A_WHY.md; rules in CONTRIBUTING.md):
1. Branch from `main` (`git checkout -b why-<slug>`). Claim the idea: `status: 'started', by: '<their name>'`.
2. Check the science in at least two reliable sources before writing; note them for the pull request.
3. Add the catalog entry to `src/data/whys.ts` (next free number) and remove the idea from `src/data/ideas.ts`.
4. Write `src/content/whys/en/<slug>.mdx`: copy the layout of an existing why (Guess → Investigate → Answer →
   Myth/Mystery → TryIt → Whoa). Guess replies explain each option; the answer's first paragraph is one sentence.
5. Draw the scene (`src/components/whys/scenes/`, 640 × 400, register in `scenes/index.ts`; reuse `Kid` and `Cat`).
6. Build the investigate part: a lab (`src/interactives/<topic>/`, inside `<Lab>`, with an autoplay film) or a
   diagram (`src/components/whys/diagrams/`, labels as props, export it in `index.ts`).
7. Formulas go in `src/lib/whys-science.ts` with tests in `tests/whys.test.ts`.
8. Check it (below), commit, push the branch, and open a pull request with sources and screenshots.

**Checks before you call it done:**
- `npm test` and `npm run build` pass (or `npm run check`).
- Look at the page in a real browser with Playwright (installed in cloud sessions: `require('playwright')`,
  `chromium.launch()`): desktop 1280 wide, phone 390 wide (`document.documentElement.scrollWidth` must be 390),
  dark mode, and reduced motion (pictures start paused, and frame 0 must look right). No console errors.
  Look at the screenshots yourself: overlapping labels, things off the edge, text unreadable on its background.
- A lab plays by itself when scrolled to, stops when a control is touched, and the play button resumes it.
- Home experiments follow the safety rules in CONTRIBUTING.md.

**Publishing:** open a pull request; CI runs the tests and the build. Merging to `main` deploys to GitHub Pages
(<https://silly-sprout-lab.github.io/whys/>). Commit messages: a short summary line, then what changed and why.

**Known pitfalls in cloud sessions:**
- Astro needs Node ≥ 22.23.4. If `node -v` is older, install Node 24 next to the project and put it first on PATH:
  `npm i --prefix /tmp/node24 node@24 && export PATH=/tmp/node24/node_modules/node/bin:$PATH`.
- `npm run preview -- --port 4500` serves the built site for screenshots; `github.io` itself is usually not
  reachable from cloud sessions, so verify locally and check the Actions run instead.
- In SVG, an element's `transform` attribute is replaced by a CSS animation of `transform`: animate a child
  `<g>` inside the positioned one.
- A label key in a lab's `strings.ts` must not reuse the name of a caption key.

**Never:** change the SillyChili project (Dung-ND/boc) or its website; put secrets in the repository; add home
experiments with button batteries, mains electricity, flammable or toxic chemicals, or unsupervised heat or knives.
