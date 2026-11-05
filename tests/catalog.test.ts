// Keeps the catalog of published whys and the list of ideas tidy.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { whys, whyCategories } from '../src/data/whys.ts';
import { ideas } from '../src/data/ideas.ts';

test('every slug is used once, across published whys and ideas', () => {
  const slugs = [...whys.map((w) => w.slug), ...ideas.map((i) => i.slug)];
  const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  assert.deepEqual(dupes, [], `duplicate slugs: ${dupes.join(', ')}`);
});

test('slugs are lowercase words joined by hyphens', () => {
  for (const s of [...whys.map((w) => w.slug), ...ideas.map((i) => i.slug)]) assert.match(s, /^[a-z0-9]+(-[a-z0-9]+)*$/, s);
});

test('why numbers are unique', () => {
  const ns = whys.map((w) => w.n);
  assert.equal(new Set(ns).size, ns.length);
});

test('every published why has its English text', () => {
  for (const w of whys) assert.ok(existsSync(`src/content/whys/en/${w.slug}.mdx`), `missing src/content/whys/en/${w.slug}.mdx`);
});

test('every idea has a known category, a question, a hint, and a name when started', () => {
  for (const i of ideas) {
    assert.ok(i.category in whyCategories, `${i.slug}: unknown category ${i.category}`);
    assert.match(i.question, /\?$/, `${i.slug}: the question should end with "?"`);
    assert.ok(i.hint.length > 20, `${i.slug}: hint is too short`);
    if (i.status === 'started') assert.ok(i.by, `${i.slug}: say who started it (by: '…')`);
  }
});
