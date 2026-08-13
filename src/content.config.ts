import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// Astro 7 deprecates the `z` re-export from `astro:content` and no longer ships
// it as a namespace, so `z.ZodType` has to come from zod directly.
import { z } from 'zod';
import type { ImageMetadata } from 'astro';

// Posts live at src/content/blog/YYYY/MM/YYYY-MM-DD-slug.md, but their public
// URLs are flat (/blog/my-post/). Under the legacy collections API that came for
// free: `slug` was a reserved frontmatter key that overrode the path-derived
// slug. The content layer has no such reserved key, so the behaviour is rebuilt
// here — without it every post URL would gain a /YYYY/MM/ segment.
const blogCollection = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.md',
    generateId: ({ data, entry }) =>
      typeof data.slug === 'string' && data.slug.length > 0
        ? data.slug
        : // Fallback mirrors the legacy derivation: drop the extension, the
          // YYYY/MM/ directories, and the YYYY-MM-DD- filename prefix.
          entry
            .replace(/\.md$/, '')
            .replace(/^\d{4}\/\d{2}\//, '')
            .replace(/^\d{4}-\d{2}-\d{2}-/, ''),
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        author: z.string(),
        tags: z.array(z.string()),
        description: z.string(),
        pubDate: z.string(),
        imgUrl: image() as z.ZodType<ImageMetadata>,
        draft: z.boolean().optional().default(false),
      })
      // Legacy collections passed the *raw* frontmatter to a markdown layout, so
      // the post page printed `pubDate` exactly as authored ("04/23/2023 09:36
      // AM"). Keep that string for display while still exposing a real Date for
      // the RSS feed and for sorting.
      .transform(({ pubDate, ...rest }) => ({
        ...rest,
        pubDate: new Date(pubDate),
        pubDateRaw: pubDate,
      })),
});

export const collections = {
  blog: blogCollection,
};
