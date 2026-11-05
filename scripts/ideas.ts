// Lists the questions waiting to be written: `npm run ideas` (open ones) or `npm run ideas -- --all`.
import { ideas } from '../src/data/ideas.ts';
import { whys, whyCategories } from '../src/data/whys.ts';

const all = process.argv.includes('--all');
const shown = ideas.filter((i) => all || i.status === 'open');
const started = ideas.filter((i) => i.status === 'started');

console.log(`\n${whys.length} whys published · ${ideas.filter((i) => i.status === 'open').length} open · ${started.length} started\n`);
for (const cat of Object.keys(whyCategories) as (keyof typeof whyCategories)[]) {
  const list = shown.filter((i) => i.category === cat);
  if (!list.length) continue;
  console.log(`${whyCategories[cat].title.en} (${list.length})`);
  for (const i of list) {
    const tag = i.status === 'started' ? `  [started by ${i.by ?? '?'}]` : '';
    console.log(`  • ${i.question}${tag}\n      ${i.slug}\n      ${i.hint}`);
  }
  console.log('');
}
if (!all && started.length) console.log(`(${started.length} started questions hidden: npm run ideas -- --all)\n`);
