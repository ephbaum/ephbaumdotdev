# Brutal - The neobrutalist Astro theme

Brutal is a minimal neobrutalist theme for [Astro](https://astro.build/). It's based on Neobrutalist Web Design, a movement that aims to create websites with a minimalistic and functional design. It has some integrations like Image Optimization, RSS, Sitemap, ready to get your SEO done right.

The theme has no JavaScript integration out of the box, but can always be added of course.

This template is based on [my own personal website](<https://www.elian.codes/>), with some more generic things added.

## 🚀 Enhanced Version

This is Eph Baum's personal blog, which is a heavily modified version of the Brutal theme with significant improvements:

- **TypeScript Integration** - Full type safety throughout
- **Umami Analytics** - Privacy-focused analytics integration
- **Advanced Content Management** - Structured blog with tags, metadata
- **OG Image Generation** - Automatic social media previews
- **Enhanced SEO** - Improved sitemap and RSS feeds
- **Custom Brutalist Components** - Unique design system
- **Automated CI/CD** - GitHub Actions + Vercel deployment
- **Ghost CMS Migration** - Complete content migration from Ghost

**Note**: This is primarily a personal blog, but the enhanced theme is available for others who want a more feature-rich brutalist blog setup.

## Usage

You can bootstrap a new Astro project using Brutal with the following command:

```bash
# npm 6.x
npx create astro@latest --template eliancodes/brutal

# npm 7+
npx create astro@latest -- --template eliancodes/brutal

# pnpm
pnpm dlx create-astro --template eliancodes/brutal

# yarn
yarn create astro --template eliancodes/brutal
```

### Commands

All commands are run from the root of the project, from a terminal:

(Here I use PNPM, no problem if you use NPM or Yarn)

| Command             | Action                                             |
| :------------------ | :------------------------------------------------- |
| `pnpm install`      | Installs dependencies                              |
| `pnpm dev`          | Starts local dev server at `localhost:3000`        |
| `pnpm build`        | Build your production site to `./dist/`            |
| `pnpm preview`      | Preview your build locally, before deploying       |
| `pnpm astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `pnpm astro --help` | Get help using the Astro CLI                       |

## Integrations

### UnoCSS

In this theme, I'm using [UnoCSS](https://uno.antfu.me/) to generate the CSS. It's a utility-first CSS framework that uses a single class to style elements. It's very easy to use and has a lot of features. It's setup to be completely compatible with TailwindCSS, with the advantage of being able to use PureCSS icons. You can always switch out UnoCSS for TailwindCSS if you want to, without breaking the general styles.

### Sitemap

To generate the sitemap, you don't need to do anything. It's automatically generated when you build your site. You'll just need to switch out the `site` on `astro.config.mjs` to your own.

```js title="astro.config.mjs"
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
});
```

### RSS

The RSS feed is automatically generated from the Markdown files in the `src/content/blog` folder. You can ofcourse completely change this to your own needs.

The RSS will output to `https://example.com/feed.xml` by default. You can change this, by renaming `src/pages/feed.xml.js`.

### Image

### Analytics

This enhanced version includes Umami analytics integration for privacy-focused website analytics:

- **Privacy-first**: No cookies, GDPR compliant, no cross-site tracking
- **Lightweight**: Minimal impact on page performance
- **Real-time**: See visitor data in real-time
- **Self-hostable**: Can be hosted on your own infrastructure

The analytics script is conditionally loaded based on environment variables and only runs in production environments.

See [UMAMI_SETUP.md](UMAMI_SETUP.md) for technical implementation details.

## Components

### `components/blog/`

This directory contains all components for the blog.

### `components/errors/`

This directory contains all error components.

#### `components/errors/404.astro`

This component is used when a page is not found.

### `components/generic/`

This directory contains all generic components, reused over multiple pages.

### `components/home/`

This directory contains all components for the home page.

### `components/layout/`

This directory contains all layout components. For instance, the header and footer and `<head>` section.

### Colors

The theme has a few colors that you can use in the included components.

- red
- blue
- green
- yellow
- pink
- purple
- orange
- teal
- cyan
- lime
- emerald
- fuchsia
- violet
- rose
- sky
- amber

More colors can be added in `astro.config.mjs` in the `colors` array.

If you need more from this theme, don't hesitate to open an issue or reach out to me!
