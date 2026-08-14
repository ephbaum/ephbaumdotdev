// Prettier parser/printer for Markdown that only straightens curly quotes to
// ASCII. Not the real Markdown parser — it treats the whole file as an opaque
// string so nothing else about a post (wrapping, list style, headings) gets
// reformatted. Registered for *.md via .prettierrc's overrides.
//
// The posts here were written across several editors over more than a decade
// — a Ghost web editor on macOS, Joplin on iOS — and several of them silently
// substitute curly quotes as you type. They're invisible in a rendered
// preview and only ever show up later, as a diff that touches a character
// nobody typed.
//
// This is about *source* files. The Markdown processor still applies
// typographic quotes when rendering, which is a separate, deliberate setting.

const OFF = 'straight-quotes:off';
const ON = 'straight-quotes:on';

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

function straighten(text) {
  let off = false;
  return text
    .split('\n')
    .map((line) => {
      if (line.includes(OFF)) off = true;
      const result = off ? line : line.replace(PATTERN, (c) => REPLACEMENTS.get(c));
      if (line.includes(ON)) off = false;
      return result;
    })
    .join('\n');
}

export const languages = [
  {
    name: 'markdown-straight-quotes',
    parsers: ['straight-quotes-markdown'],
    extensions: ['.md'],
  },
];

export const parsers = {
  'straight-quotes-markdown': {
    astFormat: 'straight-quotes-markdown-ast',
    parse: (text) => ({ text: straighten(text) }),
    locStart: () => 0,
    locEnd: (node) => node.text.length,
  },
};

export const printers = {
  'straight-quotes-markdown-ast': {
    print: (path) => path.node.text,
  },
};
