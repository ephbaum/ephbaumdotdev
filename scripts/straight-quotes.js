#!/usr/bin/env node

// Coerce typographic (curly) quotes to straight ASCII quotes in Markdown.
//
// The posts here were written across several editors over more than a decade —
// a Ghost web editor on macOS, Joplin on iOS — and several of them silently
// substitute curly quotes as you type. They are invisible in a rendered preview
// and only ever show up later, as a diff that touches a character nobody typed.
// This keeps the source ASCII so that never happens again.
//
// Note this is about *source* files. The Markdown processor still applies
// typographic quotes when rendering, which is a separate, deliberate setting.

import { parseArgs } from 'util';
import { readFileSync, writeFileSync, globSync } from 'fs';

const { values: args } = parseArgs({
  options: {
    check: { type: 'boolean', default: false },
    help: { type: 'boolean', default: false },
  },
  allowPositionals: true,
});

if (args.help) {
  console.log(`
Usage:
  pnpm quotes:check     # report curly quotes, exit 1 if any are found
  pnpm quotes:fix       # rewrite them to straight quotes in place

Covers every tracked Markdown file outside node_modules and dist.

Only quote characters are touched. Dashes, ellipses, guillemets («» ‹›) and
prime marks (′ ″) are left alone — those are either deliberate punctuation or
units, not editor substitutions.

To exempt a region that must contain the characters literally — documentation
about this very rule, or a post quoting them on purpose — wrap it in:

  <!-- straight-quotes:off -->
  ...
  <!-- straight-quotes:on -->
`);
  process.exit(0);
}

const OFF = 'straight-quotes:off';
const ON = 'straight-quotes:on';

// Returns the set of line indices that sit inside an opt-out region, so a file
// documenting the rule can still show the characters it bans.
function exemptLines(lines) {
  const exempt = new Set();
  let off = false;
  lines.forEach((line, i) => {
    if (line.includes(OFF)) off = true;
    if (off) exempt.add(i);
    if (line.includes(ON)) off = false;
  });
  return exempt;
}

// Curly quote -> ASCII equivalent. Guillemets and primes are deliberately
// absent: « » ‹ › are real quoting punctuation in other languages, and ′ ″ are
// units (feet, minutes), not quotes.
const REPLACEMENTS = new Map([
  ['‘', "'"], // ' left single
  ['’', "'"], // ' right single
  ['‚', "'"], // ‚ single low-9
  ['‛', "'"], // ‛ single high-reversed-9
  ['“', '"'], // " left double
  ['”', '"'], // " right double
  ['„', '"'], // „ double low-9
  ['‟', '"'], // ‟ double high-reversed-9
]);

const PATTERN = new RegExp(`[${[...REPLACEMENTS.keys()].join('')}]`, 'g');

const files = globSync('**/*.md', {
  exclude: (p) => p.includes('node_modules') || p.startsWith('dist'),
}).sort();

let offendingFiles = 0;
let offendingChars = 0;

for (const file of files) {
  const original = readFileSync(file, 'utf8');
  const lines = original.split('\n');
  const exempt = exemptLines(lines);
  const hits = [];

  const rewritten = lines.map((line, i) => {
    if (exempt.has(i)) return line;
    const found = line.match(PATTERN);
    if (found) hits.push({ line: i + 1, count: found.length, text: line.trim() });
    return line.replace(PATTERN, (c) => REPLACEMENTS.get(c));
  });

  if (hits.length === 0) continue;
  const fixed = rewritten.join('\n');

  offendingFiles += 1;
  offendingChars += hits.reduce((n, h) => n + h.count, 0);

  console.log(`${args.check ? '✗' : '✓'} ${file}`);
  for (const h of hits) {
    const preview = h.text.length > 96 ? `${h.text.slice(0, 96)}…` : h.text;
    console.log(`    line ${h.line}: ${preview}`);
  }

  if (!args.check) writeFileSync(file, fixed);
}

if (offendingChars === 0) {
  console.log(`No curly quotes found in ${files.length} Markdown files.`);
  process.exit(0);
}

const summary = `${offendingChars} curly quote${offendingChars === 1 ? '' : 's'} in ${offendingFiles} file${offendingFiles === 1 ? '' : 's'}`;

if (args.check) {
  console.error(`\n${summary}. Run \`pnpm quotes:fix\` to straighten them.`);
  process.exit(1);
}

console.log(`\nStraightened ${summary}.`);
