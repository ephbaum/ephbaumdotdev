import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/**
 * All blog posts, newest first.
 *
 * Legacy content collections returned entries ordered by source file path, so
 * a bare `.reverse()` happened to yield newest-first — posts are stored under
 * `YYYY/MM/YYYY-MM-DD-slug.md`, so path order was date order. The content layer
 * orders entries by `id` instead, which for this site is the flat URL slug, so
 * `.reverse()` became reverse-alphabetical. Sorting on `pubDate` states the
 * intent directly and no longer depends on how the files happen to be named.
 */
export async function getPostsNewestFirst(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
