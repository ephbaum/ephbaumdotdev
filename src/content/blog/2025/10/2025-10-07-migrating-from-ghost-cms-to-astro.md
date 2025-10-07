---
title: Migrating from Ghost CMS to Astro: A Complete Journey
postSlug: migrating-from-ghost-cms-to-astro
slug: migrating-from-ghost-cms-to-astro
pubDate: 10/07/2025 12:00 PM
imgUrl: "../../../../assets/img/ephbaum_dot_dev.png"
author: Eph Baum
featured: false
draft: true
tags:
  - migration
  - astro
  - ghost-cms
  - vercel
  - digital-ocean
  - blog
description: "The complete story of migrating from Ghost CMS on Digital Ocean to a modern Astro blog hosted on Vercel. From content export to image restoration, this is the full journey of modernizing a personal blog."
layout: ../../../../layouts/BlogPost.astro
---

![Featured Image](../../../../assets/img/ephbaum_dot_dev.png)

After years of running my personal blog on Ghost CMS hosted on Digital Ocean, I finally made the decision to migrate to a modern static site generator. This post documents the complete journey from Ghost CMS to Astro, hosted on Vercel.

## Why Migrate?

The decision to migrate wasn't made lightly. Ghost CMS had served me well for years, but several factors pushed me toward a static site approach:

- **Performance**: Static sites load faster and provide better Core Web Vitals
- **Cost**: Moving from a VPS to static hosting reduces ongoing costs
- **Maintenance**: No more server management, updates, or security patches
- **Developer Experience**: Modern tooling and deployment workflows
- **Flexibility**: Full control over the build process and customization

## The Migration Strategy

The migration involved several key phases:

1. **Content Export**: Extracting all posts, pages, and metadata from Ghost
2. **Image Migration**: Preserving all original images and their relationships
3. **Template Conversion**: Converting Ghost themes to Astro components
4. **Deployment Setup**: Configuring Vercel for static site hosting
5. **SEO Preservation**: Maintaining all URLs and meta data
6. **Final Cleanup**: Restoring placeholder images and ensuring everything works

## The Final Mile: Image Restoration

*[This section documents the work completed on October 7, 2025]*

The last step of the migration involved restoring all the placeholder images that had been temporarily used during the transition. This turned out to be a more systematic process than expected.

### The Problem

During the initial migration, all Ghost CMS image URLs (using the `__GHOST_URL__` placeholder) were replaced with `placeholder.com` images to prevent build failures. While this allowed the site to build successfully, it left 13 placeholder images across 7 blog posts that needed to be restored.

### The Solution

Using git history analysis, I was able to trace each placeholder back to its original Ghost CMS URL and then locate the corresponding image in the migrated assets directory. The process involved:

1. **Systematic Discovery**: Found all 13 placeholder images across 7 blog posts
2. **Git History Analysis**: Extracted original Ghost CMS URLs from commit history
3. **Asset Verification**: Confirmed all original images existed in `/src/assets/img/`
4. **Path Restoration**: Updated all markdown files with correct relative paths

### The Results

**Files Processed**: 7 blog posts  
**Images Restored**: 13 total placeholder images  
**Success Rate**: 100% - All images found and restored

The migration was actually perfect - all original images were successfully migrated to the local assets directory with the exact same hash filenames. The only issue was that the image paths in the markdown files were replaced with placeholders instead of being updated to point to the local assets.

### Technical Details

All images now use proper relative paths in the format:
```markdown
![Alt Text](../../../../assets/img/YYYY/MM/filename.ext)
```

The original Ghost CMS URLs followed the pattern:
```
__GHOST_URL__/content/images/YYYY/MM/[hash].ext
```

And were successfully mapped to:
```
../../../../assets/img/YYYY/MM/[hash].ext
```

## What's Next?

*[This section will be filled in with the broader migration efforts]*

The image restoration marks the completion of the Ghost CMS to Astro migration. The blog is now:

- ✅ Fully self-contained with no external dependencies
- ✅ Hosted on Vercel with automatic deployments
- ✅ Optimized for performance with static generation
- ✅ All original content and images preserved
- ✅ Modern development workflow with Astro

## Lessons Learned

*[This section will be expanded with insights from the full migration process]*

The migration process taught me several valuable lessons about content migration, image handling, and the importance of systematic approaches to complex technical tasks.

## Conclusion

*[This section will be completed with final thoughts on the migration]*

The migration from Ghost CMS to Astro represents a significant modernization of the blog infrastructure while preserving all the valuable content and images that have been created over the years.

---

*This post documents the complete migration journey from Ghost CMS on Digital Ocean to Astro hosted on Vercel, completed on October 7, 2025.*
