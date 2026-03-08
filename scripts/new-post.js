#!/usr/bin/env node

import { parseArgs } from 'util';
import { createInterface } from 'readline';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const { values: args } = parseArgs({
  options: {
    title:       { type: 'string' },
    description: { type: 'string' },
    tags:        { type: 'string' },
    date:        { type: 'string' },
    draft:       { type: 'boolean', default: false },
    help:        { type: 'boolean', default: false },
  },
  allowPositionals: true,
});

if (args.help) {
  console.log(`
Usage:
  pnpm new:post                                    # interactive
  pnpm new:post --title "My Post" [options]        # CLI

Options:
  --title          Post title (required)
  --description    Post description (optional)
  --tags           Comma-separated tags (default: "general")
  --date           YYYY-MM-DD (default: today)
  --draft          Mark as draft
`);
  process.exit(0);
}

function formatDate(date) {
  const year  = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day   = String(date.getDate()).padStart(2, '0');
  const mins  = String(date.getMinutes()).padStart(2, '0');
  const ampm  = date.getHours() >= 12 ? 'PM' : 'AM';
  const hours = date.getHours() % 12 || 12;
  return {
    filename: `${year}-${month}-${day}`,
    pubDate:  `${month}/${day}/${year} ${hours}:${mins} ${ampm}`,
    year, month,
  };
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function parseTags(input) {
  const tags = (input || '').split(',').map(t => t.trim()).filter(Boolean);
  return tags.length ? tags : ['general'];
}

async function prompt(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  let title, description, tags, date, isDraft;

  if (args.title) {
    // CLI mode
    title       = args.title;
    description = args.description || '';
    tags        = parseTags(args.tags);
    isDraft     = args.draft;
    date        = args.date ? new Date(args.date) : new Date();
    if (isNaN(date.getTime())) {
      console.error('Invalid date format, using today.');
      date = new Date();
    }
  } else {
    // Interactive mode
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    try {
      title = (await prompt(rl, 'Title: ')).trim();
      if (!title) { console.error('Title is required.'); process.exit(1); }

      description = (await prompt(rl, 'Description (optional): ')).trim();
      tags        = parseTags(await prompt(rl, 'Tags (comma-separated): '));

      const dateInput = (await prompt(rl, 'Date YYYY-MM-DD (Enter for today): ')).trim();
      date = dateInput ? new Date(dateInput) : new Date();
      if (isNaN(date.getTime())) {
        console.error('Invalid date, using today.');
        date = new Date();
      }

      const draftInput = (await prompt(rl, 'Draft? (y/N): ')).trim();
      isDraft = draftInput.toLowerCase().startsWith('y');
    } finally {
      rl.close();
    }
  }

  const slug = slugify(title);
  const { filename, pubDate, year, month } = formatDate(date);
  const filePath = join('src', 'content', 'blog', String(year), month, `${filename}-${slug}.md`);

  mkdirSync(join('src', 'content', 'blog', String(year), month), { recursive: true });

  if (existsSync(filePath)) {
    console.error(`File already exists: ${filePath}`);
    process.exit(1);
  }

  const frontmatter = `---
title: "${title}"
postSlug: ${slug}
slug: ${slug}
pubDate: ${pubDate}
imgUrl: "../../../../assets/img/ephbaum_avatar_800_400.png"
ogImage: "../../../../assets/img/ephbaum_avatar_800_400.png"
author: Eph Baum
featured: false
draft: ${isDraft}
tags:
${tags.map(t => `  - ${t}`).join('\n')}
description: "${description}"
layout: ../../../../layouts/BlogPost.astro
---

`;

  writeFileSync(filePath, frontmatter);
  console.log(`Created: ${filePath}`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
