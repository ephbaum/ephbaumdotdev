import { z, defineCollection } from 'astro:content';
import type { ImageMetadata } from 'astro';

const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string(),
      tags: z.array(z.string()),
      description: z.string(),
      pubDate: z.string().transform((str) => new Date(str)),
      imgUrl: image() as z.ZodType<ImageMetadata>,
      draft: z.boolean().optional().default(false),
    }),
});

export const collections = {
  blog: blogCollection,
};