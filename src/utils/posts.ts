import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/**
 * All blog posts, filtered for the current environment.
 *
 * `draft: true` means "not published", not "published at an unlisted URL", so
 * drafts are excluded everywhere in production — listings, RSS, OG images, and
 * the post route itself. `import.meta.env.DEV` keeps them visible in `pnpm run
 * dev` so drafts can still be previewed locally. This is the only call site
 * for `getCollection('blog')`; every consumer must go through here so the
 * filter can't be forgotten.
 */
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  return getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
}

/**
 * All published blog posts, newest first.
 *
 * Legacy content collections returned entries ordered by source file path, so
 * a bare `.reverse()` happened to yield newest-first — posts are stored under
 * `YYYY/MM/YYYY-MM-DD-slug.md`, so path order was date order. The content layer
 * orders entries by `id` instead, which for this site is the flat URL slug, so
 * `.reverse()` became reverse-alphabetical. Sorting on `pubDate` states the
 * intent directly and no longer depends on how the files happen to be named.
 */
export async function getPostsNewestFirst(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getPublishedPosts();
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
