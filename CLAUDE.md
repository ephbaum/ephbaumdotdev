# CLAUDE.md

Guidance for AI coding agents working in this repository.

## What this is

A personal blog — static **Astro 7** site, deployed on **Vercel** at
[ephbaum.dev](https://ephbaum.dev). Built on the
[Brutal](https://github.com/eliancodes/brutal) neobrutalist theme, heavily
modified. Content was migrated from Ghost CMS.

Package manager is **pnpm** (`packageManager` is pinned in `package.json`).
Never use npm or yarn here — they will produce a lockfile the CI does not accept.

## Required toolchain

**Use Node 22.** This is not a style preference, it is a correctness
requirement, and getting it wrong fails in a way that looks like something else.

On Node 18, pnpm silently skips the platform-specific `@oxc-parser` native
bindings when resolving `oxc-parser`'s optional dependencies. Optional
dependencies fail quietly, so `pnpm install --frozen-lockfile` still exits 0 —
the tree is just two packages short. Nothing complains until unocss loads
`uno.config.ts` through jiti, at which point the build dies with:

```
Cannot find module '@oxc-parser/binding-linux-x64-gnu'
```

Because that happens inside Astro's content-collection sync, the visible
symptom is `astro check` aborting about two seconds in — which reads like a
config or content error, not a dependency error.

Quick check that your install is intact:

```bash
node --version                  # expect v22.x
ls node_modules/@oxc-parser/    # must NOT be empty
```

`.tool-versions` pins both `nodejs` and `pnpm` for asdf/mise users.

## Commands

| Command | What it does |
|---|---|
| `pnpm install --frozen-lockfile` | Install exactly what the lockfile specifies |
| `pnpm run dev` | Dev server at `localhost:4321` |
| `pnpm run build` | **`astro check && astro build`** — type errors fail the build |
| `pnpm run preview` | Serve the production build locally |
| `pnpm run astro:check` | Type-check only, no build |
| `pnpm run lint` / `lint:fix` | ESLint |
| `pnpm run format` / `format:check` | Prettier |
| `pnpm run check` | `astro check` + lint + format check |
| `pnpm run check:fix` | Same, but writes fixes |
| `pnpm new:post` | Scaffold a blog post (interactive, or `--title "..."`; `--help` for flags) |

Before handing work back, run `pnpm run build` and `pnpm run check`. A full
build takes roughly 70-110 seconds and emits ~215 pages; budget for that rather
than assuming something has hung.

## Layout

```
src/
├── assets/img/       Images processed by Astro (optimized, WebP-converted)
├── components/
│   ├── blog/         Blog listing, content, sidebar
│   ├── errors/       404
│   ├── generic/      Shared components (incl. LocalFont.astro)
│   ├── home/         Homepage sections
│   └── layout/       BaseHead, navigation, footer
├── content/
│   ├── config.ts     Content collection schema (Zod)
│   └── blog/YYYY/MM/ Posts, foldered by year and month
├── layouts/          Default.astro, BlogPost.astro
├── pages/            File-based routing
│   ├── blog/         Listing, [slug], tags/[tag]
│   ├── v1/generate/og/  OG image endpoints (satori + resvg)
│   └── feed.xml.js   RSS
└── styles/
public/
├── fonts/            .ttf files read at build time via readFileSync
└── img/              Served as-is, no processing
```

TypeScript path aliases: `@components/*`, `@layouts/*`, `@pages/*`, `@assets/*`.

## Content conventions

Posts live at `src/content/blog/YYYY/MM/YYYY-MM-DD-slug.md`. Prefer
`pnpm new:post` over writing the file by hand — it generates the frontmatter
and the correct directory depth.

The collection schema (`src/content.config.ts`) enforces `title`, `author`,
`tags`, `description`, `pubDate`, and `imgUrl`. `imgUrl` uses Astro's `image()`
helper, so **it must be a relative path that resolves to a real file** — a
missing or misspelled path fails content sync and therefore the whole build.
Posts also conventionally carry `postSlug`, `slug`, `ogImage`, `featured`,
`draft`, and `layout`.

From `src/content/blog/YYYY/MM/`, `../../../../` resolves to `src/`:

```yaml
imgUrl: '../../../../assets/img/2026/01/photo.jpg'
```

**`slug` frontmatter decides the URL.** Posts are filed under `YYYY/MM/` but
served flat, at `/blog/<slug>/`. Astro 6 removed the legacy collections API that
made `slug` a reserved override, so `src/content.config.ts` rebuilds it in the
glob loader's `generateId`. Change that function and every post URL moves.

**`layout` frontmatter is inert.** Legacy collections applied it automatically;
the content layer does not. `src/pages/blog/[slug].astro` now imports
`BlogPost.astro` and wraps `<Content />` explicitly. The key is still present in
existing posts, and `pnpm new:post` still writes it, but nothing reads it.

**Sort posts explicitly.** The content layer orders entries by `id` — the flat
slug — so the `.reverse()` that used to yield newest-first (via path order) is
now reverse-alphabetical. Use `getPostsNewestFirst()` from `@utils/posts`.

### Where images go

This distinction is load-bearing; putting a file in the wrong place fails at
build time, not at review time.

- **`src/assets/img/`** — anything referenced from post frontmatter or an
  `<Image>` component. Astro optimizes and fingerprints these. They **cannot**
  be read with `readFileSync`, because they don't exist at a stable path.
- **`public/img/`, `public/fonts/`** — anything read from disk at build time
  (`readFileSync`) or needing a predictable public URL. Not optimized.

The OG image endpoints read both a font and the avatar from `public/` for
exactly this reason.

## Hard-won constraints

**No network calls at build time.** The OG endpoints used to `await fetch()` a
font from a third-party demo host at module scope, which made every production
build depend on an unrelated service's uptime. Fonts now come from
`public/fonts/`. Don't reintroduce build-time fetches — vendor the asset.

**`astro check` gates the build.** `pnpm run build` runs it first, so a type
error anywhere blocks deployment. Run `pnpm run astro:check` while iterating for
a faster loop.

**OG images are generated at build time** by satori + resvg for every post.
Changing the OG templates re-renders ~215 PNGs, so image-heavy changes are slow
to verify. Check output in `dist/v1/generate/og/`.

**Two Astro 7 defaults are deliberately overridden** in `astro.config.ts`, both
to keep rendered output stable rather than out of preference:

- `compressHTML: true` — Astro 7 defaults to `'jsx'`, which strips whitespace
  between inline elements and visibly reflows this theme.
- `markdown.processor: unified()` — Astro 7 defaults to Sätteri. The posts came
  out of Ghost and were authored against remark/rehype, which is also what
  `shikiConfig` feeds.

Dropping either is a content-rendering decision, not a config cleanup.

## Deployment

**Vercel's Git integration owns deployment.** It builds this repo directly on
every push to `main` and publishes `ephbaum.dev`. Nothing in `.github/` deploys
anything.

`.github/workflows/ci.yml` is a **build gate only** — install plus
`pnpm run build` on pushes and PRs to `main`, so a broken build is caught before
Vercel picks it up. It deliberately does not deploy; a previous version tried to
and produced a second, competing deploy path.

If you touch `vercel.json`, remember this is a **static multi-page** site that
emits real per-route HTML — not an SPA. It does not want a catch-all rewrite to
`/index.html`.

## Analytics

Umami (via `PUBLIC_UMAMI_WEBSITE_ID` / `PUBLIC_UMAMI_SCRIPT_URL`, both optional
— the script only loads when the ID is set) plus Vercel Analytics and Speed
Insights. Event catalogue in `ANALYTICS_EVENTS.md`, setup in `UMAMI_SETUP.md`.

## Licensing

Code is MIT. **Blog content is not** — posts, prose, and original images are
copyright Eph Baum, all rights reserved. Keep that boundary in mind before
reproducing content anywhere.
