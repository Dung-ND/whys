# Start here

Welcome to **Whys**! This page gets you from zero to your first contribution, working with Claude.
You shouldn't need to ask anyone anything: if something here is unclear, that's a bug in this page, so fix it.

## What Whys is

A website of short, fun science pages for curious people of all ages: *Why is the sky blue? Why does popcorn pop?*
Every page (a "why") follows the same steps a scientist would:

1. **Your guess**: pick one of three answers before reading.
2. **Investigate**: a small hands-on lab or a labeled diagram.
3. **The answer**: one big sentence, then the explanation.
4. **Extras**: a busted myth, a safe home experiment, a surprising fact, and "still a mystery" where science isn't settled.

Each why has its own animated cartoon. Pictures and labs play by themselves and can be paused: the site is for reading.

- **Live site:** <https://silly-sprout-lab.github.io/whys/>
- **Repository:** <https://github.com/Silly-Sprout-Lab/whys>
- **Languages:** English first. Vietnamese and Spanish pages show English (with a notice) until translated.

## Where things stand

- **Published:** whys #1–#24, in English. Whys #1–#8 also have Vietnamese. Nothing is in Spanish yet.
- **Waiting to be written:** about 100 questions in [`src/data/ideas.ts`](src/data/ideas.ts), each with a hint.
  They're also listed on the site's **Coming soon** page, and by `npm run ideas`.

To see the latest numbers, run `npm run ideas` (it prints how many are published, open and started).

## What you need

- A **GitHub account** that's a member of the Silly-Sprout-Lab organization (ask an owner to invite you, once).
- A **Claude account** with Claude Code.

## Start working with Claude

**In the browser (easiest):** go to [claude.ai/code](https://claude.ai/code), start a new session and choose the
repository **Silly-Sprout-Lab/whys**. Claude reads [`CLAUDE.md`](CLAUDE.md) automatically, which tells it how this
project works, so you can just say what you want.

**On your computer:**

```sh
git clone https://github.com/Silly-Sprout-Lab/whys
cd whys
npm install          # needs Node 22.23.4 or newer (24 recommended, see .nvmrc)
npm run dev          # the site at http://localhost:4321
claude               # start Claude Code in this folder
```

## Things you can ask Claude

Copy one of these, or write your own. Put your name in so Claude can claim the question for you.

- **"Write the next open why. My name is Lan."**
  Claude picks a question from the ideas list, claims it for you, writes the whole page (text, cartoon, lab or
  diagram), checks it, and opens a pull request.
- **"Write the why 'Why are planets round?'. My name is Lan."** (any question from the ideas list)
- **"Translate whys #9 to #16 into Vietnamese."**
- **"Translate why #1 into Spanish."**
- **"Add a new idea: Why do we get hungry?"**
- **"Review the why about volcanoes and check its facts."**
- **"The cartoon on the popcorn page looks wrong on my phone: fix it."**

You can say "continue" at any time; Claude will pick up the next sensible piece of work (see "How to work" in
[`CLAUDE.md`](CLAUDE.md)).

## What "done" looks like

Claude works on a **branch** and opens a **pull request**. Before you merge, check that:

- the pull request lists the **sources** used to check the facts;
- it shows **screenshots** (desktop and phone) or you've looked at the page yourself;
- the home experiment is **safe** for a child (see the safety rules in [CONTRIBUTING.md](CONTRIBUTING.md));
- the **checks** on the pull request are green (tests and build run automatically).

Merging to `main` publishes the site automatically, within a couple of minutes.

## Learn more

- [CONTRIBUTING.md](CONTRIBUTING.md): picking and claiming a question, getting the science right, safety rules.
- [docs/ADDING_A_WHY.md](docs/ADDING_A_WHY.md): how the pieces of a why fit together.
- [CLAUDE.md](CLAUDE.md): the project's rules and working steps, written for Claude but useful for people too.
- [README.md](README.md): project layout and commands.
