# Contributing to Whys

Thank you for helping! Whys answers curious questions with real science, in short, fun pages for readers of all ages.
The easiest way to help is to **write a why** from the list of questions waiting to be answered.

## 1. Pick a question

There are three ways to see which questions are still open:

- the **Coming soon** page on the site (`/ideas/`);
- `npm run ideas` in a terminal (add `-- --all` to also see questions someone has started);
- the file [`src/data/ideas.ts`](src/data/ideas.ts).

Each idea comes with a **hint**: a suggestion for the lab or diagram, and the science or myth to be careful about.
Have a question that isn't listed? Add it to `src/data/ideas.ts` with `status: 'open'`.

## 2. Claim it

So that two people don't write the same why, claim your question **before** you start writing:
open a pull request that changes its entry in `src/data/ideas.ts` to

```ts
{ ...open('sky', 'why-are-planets-round', 'Why are planets round?', '…'), status: 'started', by: 'Your Name' },
```

or simply tell the maintainer which question you're taking. If you stop working on it, set it back to `'open'`.

## 3. Write it

Follow [docs/ADDING_A_WHY.md](docs/ADDING_A_WHY.md). Every why has the same parts:

1. **Your guess**: 3 answers to pick from, each with a reply saying what it gets right or wrong.
2. **Investigate**: a small lab (something to drag or press) or a labeled diagram.
3. **The answer**: one sentence first, then a short explanation.
4. **Extras** that fit: a myth, a home experiment, a surprising fact, and "still a mystery" where science isn't settled.
5. **A cartoon** at the top, drawn in SVG with the shared colors and characters.

Write in **English** first; translations come later. In Vietnamese, always speak to the reader as "bạn", never "em".

### Getting the science right

- Check every fact in at least two good sources (science museums, universities, NASA, encyclopedias), and list them
  in your pull request.
- Where scientists still disagree, say so ("scientists think…") and use a "still a mystery" box.
- Numbers and formulas go in `src/lib/whys-science.ts`, with a test in `tests/`.

### Home experiments must be safe

Readers may be young children doing the experiment alone. So:

- **No** button or coin batteries, mains electricity or plugs, lasers, or magnets small enough to swallow.
- **No** flammable, toxic or strong chemicals (rubbing alcohol, bleach, strong acids), and nothing to eat or drink
  unless it's ordinary food.
- **An adult** handles anything hot (stoves, boiling water, hot oil), sharp (knives) or glass.
- Warn about **choking** (balloons, small parts) and **allergies** (latex, nuts) where they apply.
- **Never** look at the Sun, even through a pinhole or glasses that aren't proper eclipse glasses.
- Add a `safety` note to `<TryIt>` whenever any of this applies.

## 4. Publish it

1. Move the question from `src/data/ideas.ts` to `src/data/whys.ts`, giving it the next free number.
2. Run `npm run check` (tests and a full build) and look at your page with `npm run dev`, on a phone-sized window
   too, and in dark mode.
3. Open a pull request with a screenshot and your sources.

Questions? Open an issue. Have fun, and stay curious!
