import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import UnoCSS from '@unocss/astro';
import { unified } from '@astrojs/markdown-remark';

export default defineConfig({
  // used to generate images
  site: 'https://ephbaum.dev',
  trailingSlash: 'ignore',
  // Astro 7 changed the default to 'jsx', which strips whitespace between
  // inline elements. That is a rendering change, not a dependency change, so
  // keep the HTML-aware compression this site was built against.
  compressHTML: true,
  integrations: [sitemap(), UnoCSS({ injectReset: true })],
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
  markdown: {
    // Astro 7 made Sätteri the default Markdown processor. These are 55 posts
    // migrated out of Ghost, so stay on the remark/rehype pipeline they were
    // authored against rather than re-rendering all of them through a new
    // parser as a side effect of a dependency bump.
    processor: unified(),
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://shiki.style/themes
      theme: 'catppuccin-macchiato',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://shiki.style/languages
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
      // Add custom transformers: https://shiki.style/guide/transformers
      // Find common transformers: https://shiki.style/packages/transformers
      transformers: [],
    },
  },
});
