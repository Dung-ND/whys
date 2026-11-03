# Whys

**Questions for curious minds.** Why is the sky blue? Why do fingers wrinkle in water? Why don't birds get shocked on
power lines? Each why is a short, fun page that answers one question with real science, the way a scientist would:

1. **Your guess:** pick an answer first. Every choice gets a reply saying what it gets right or wrong.
2. **Investigate:** play with a small lab (move the Sun, time the thunder, flip a bird onto two wires) or study a diagram.
3. **The answer:** one big sentence, then the explanation.
4. **Extras:** a busted myth, a safe home experiment, a surprising fact, and "still a mystery" where science isn't settled.

- 🎨 Every why has its own animated cartoon, drawn in SVG (no image files), in light and dark mode.
- 🌍 English and Tiếng Việt; Español falls back to English until translated. Visitors are sent to their language automatically.
- 📱 Works on phones, tablets and computers, and offline after the first visit (it can be installed like an app).
- 🔒 No accounts, no ads, no tracking.

## Quick start

Requires Node 22.23.4+ (24 recommended, see `.nvmrc`).

```sh
npm install
npm run dev        # http://localhost:4321
npm test           # checks the science helpers (moon phases, thunder, sky color)
npm run build      # static site in dist/
```

## Project layout

```
src/
  data/whys.ts              ← the catalog: number, category, reading time of every why
  content/whys/<lang>/      ← the text of each why (MDX), one file per language
  components/whys/          ← page building blocks: Guess, Myth, TryIt, Whoa, Mystery, Lab
  components/whys/scenes/   ← the big cartoon for each why (and Professor Owl on the home page)
  components/whys/diagrams/ ← labeled diagrams (raindrop, finger nerves, fly test)
  interactives/<topic>/     ← the labs (Svelte) and their labels in strings.ts
  lib/whys-science.ts       ← science formulas used by the labs, tested in tests/
  styles/tokens.css         ← colors, fonts, dark mode, cartoon colors (--art-*)
  i18n/locales/*.json       ← site interface text
  pages/[...lang]/          ← home page (all whys) and one page per why
  pages/sw.js.ts            ← offline support (service worker, generated at build)
```

## Adding a why

See [docs/ADDING_A_WHY.md](docs/ADDING_A_WHY.md).

## Deploying

GitHub Actions (`.github/workflows/deploy.yml`) runs the tests and builds the site on every push and pull request,
and publishes `main` to GitHub Pages. To turn publishing on: **Settings → Pages → Source → GitHub Actions**.
The site is then at `https://dung-nd.github.io/whys/`. For a custom domain, add it in the Pages settings; the
workflow picks up the new address automatically.
