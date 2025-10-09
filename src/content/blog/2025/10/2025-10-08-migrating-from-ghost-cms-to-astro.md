---
title: "Migrating from Ghost CMS to Astro: A Complete Journey"
postSlug: migrating-from-ghost-cms-to-astro
slug: migrating-from-ghost-cms-to-astro
pubDate: 10/08/2025 8:20 PM
imgUrl: "../../../../assets/img/2025/10/ghost-to-astro-migration.png"
ogImage: "../../../../assets/img/2025/10/ghost-to-astro-migration.png"
author: Eph Baum (feat. Claude)
featured: true
draft: false
tags:
  - migration
  - astro
  - ghost-cms
  - vercel
  - digital-ocean
  - blog
description: "The complete 2-year journey of migrating from Ghost CMS to Astro—from initial script development in October 2023 to final completion in October 2025. Documents the blog's 11-year evolution, custom backup conversion script, image restoration process, and the intensive 4-day development sprint. Includes honest insights about how a few days of actual work got spread across two years due to life priorities."
layout: ../../../../layouts/BlogPost.astro
---

![Ghost to Astro Migration Image](../../../../assets/img/2025/10/ghost-to-astro-migration.png)

After years of running my dev blog with [Ghost CMS](https://ghost.org/) hosted on Digital Ocean, I finally made the decision to migrate to a modern static site generator. This post documents the complete journey from Ghost CMS to [Astro](https://astro.build/), hosted on [Vercel](https://vercel.com/).

This isn't the first migration this blog has undergone. In fact, this blog has been on quite a journey over the years. Originally built using a different framework in 2014 and hosted in a data center far, far away, it had an entirely different URL (which was still clever, though). It underwent its first major migration in 2016 when I moved it to a self-hosted Ghost CMS instance on Digital Ocean. That migration was followed by a shockingly long period of not being actively updated (until 2021). I had been blogging elsewhere, just not dev blog content, though I have a huge number of drafts from that time.

Now, nearly a decade later, it's time for another evolution. This migration represents not just a technical upgrade, but a commitment to modern web development practices and a more sustainable approach to content management.

## Why Migrate?

The decision to migrate wasn't made lightly. Ghost CMS had served me well for years, but several factors pushed me toward a static site approach:

- **Performance**: Static sites load faster and provide better Core Web Vitals
- **Cost**: Moving from a VPS to static hosting reduces ongoing costs
- **Maintenance**: No more server management, updates, or security patches
- **Developer Experience**: Modern tooling and deployment workflows
- **Flexibility**: Full control over the build process and customization

## The Complete Timeline

While the migration journey spanned over 2 years (October 2023 - October 2025), the actual work was completed in just a few days of focused effort. Here's the complete timeline showing how a few days of work got spread across two years, including the blog's longer history:

## The Ghost Backup Conversion Script

One of the most critical components of the migration was creating a custom script to convert the Ghost backup JSON export into properly formatted markdown files. This work actually began much earlier than the main migration effort.

### The Original Solution (October 2023)

Back in October 2023, I published a detailed post about creating a [Ghost Blog backup to Astro markdown conversion script](https://ephbaum.dev/blog/ghost-blog-backup-to-astro-markdown). This post documented my initial research and the custom Node.js solution I developed to solve the migration problem.

The original script was created because I couldn't find any existing tools that would help migrate from Ghost to Astro. The available options were either outdated (last updated in 2019) or incomplete. So I built my own solution using:

- **Turndown**: For converting HTML content to clean markdown
- **Custom JSON parsing**: To extract posts, pages, and metadata from Ghost backups
- **Automated frontmatter generation**: Creating proper YAML headers for each post
- **Image URL mapping**: Converting Ghost image references to local paths

This script served as the foundation for the entire migration process.

### The Migration Implementation

The script I developed in 2023 handled all the critical aspects of the conversion, including JSON parsing, markdown generation, frontmatter creation, image URL mapping, slug generation, date formatting, and tag processing. This work laid the groundwork for the entire migration process that would follow over the next two years.

### 📚 Phase 0: The Blog's Journey (2014 - 2023)
**The Long History** - *Setting the Stage*
- **2014**: Original blog built on different framework, hosted in "data center far, far away"
- **2016**: First major migration to self-hosted Ghost CMS on Digital Ocean
- **2016-2021**: Long hiatus period (blogging elsewhere, but not dev content)
- **2021**: Resumed dev blogging on Ghost CMS

### 🔧 Phase 1: Initial Research & Script Development (October 2023)
**October 9, 2023** - *The Foundation*
- **Backup Conversion Script**: Created custom script to convert Ghost backup JSON to markdown files
- **Content Export**: Extracted all posts, pages, and metadata from Ghost
- **October 9**: Published "[Ghost Blog backup to Astro markdown](https://ephbaum.dev/blog/ghost-blog-backup-to-astro-markdown)" post
- **October 9**: Implemented Turndown integration for HTML to markdown conversion
- **October 9**: Developed solution for automated post migration with proper frontmatter generation

### ⏸️ Phase 2: Development Pause (October 2023 - May 2024)
**~7 months** - *Script development complete, project on hold (life happened, other projects took priority)*

### 🚀 Phase 3: Initial Setup & Migration (May 2024)
**May 3-5, 2024** - *The Main Migration (3 days of work)*
- **Image Migration**: Preserving all original images and their relationships
- **Template Replacement**: I wanted something completely different from my old blog style
- **Deployment Setup**: Configuring Vercel for static site hosting
- **SEO Preservation**: Maintaining all URLs and meta data
- **May 3**: `init Astro` - Started the Astro project
- **May 3**: `taking credit for my own site / blog` - Began customization
- **May 4**: Multiple setup commits - README, structure, content migration
- **May 5**: `copy postSlug and value to slug in frontmatter` - Fixed frontmatter issues
- **May 5**: `replace broken Ghost image references with placeholders` - **First placeholder fix attempt**

#### The Setup Process

The migration began with a fresh Astro project initialization on May 3rd. The process involved:

1. **Project Initialization** (`init Astro`) - Created a new Astro project with the latest configuration
2. **Customization** (`taking credit for my own site / blog`) - Began adapting the default setup for personal use
3. **Content Migration** - Used the backup conversion script to process all Ghost posts and convert them to markdown
4. **Structure Setup** - Organized the content directory structure and configured the build system

#### The Content Conversion

The backup conversion script that had been sitting idle for 7 months finally came into its own, processing all blog posts from the Ghost backup JSON with metadata extraction, HTML to markdown conversion, image URL mapping, and frontmatter generation.

#### The First Challenges

The initial migration wasn't without its hiccups:

- **Frontmatter Issues** (`copy postSlug and value to slug in frontmatter`) - Had to fix slug generation and frontmatter consistency
- **Image References** (`replace broken Ghost image references with placeholders`) - **First placeholder fix attempt** - Ghost image URLs were broken, so they were temporarily replaced with placeholder.com images

This placeholder fix was the first attempt at solving the image problem, but it would take another 17 months before the proper solution was implemented.

#### The Result

By May 5th, the blog was successfully running on Astro with all content migrated. The site was functional, but with placeholder images and some rough edges that would be polished much later. The core migration was complete, proving that the backup conversion script worked exactly as intended.

### ⏸️ Phase 4: Development Pause (May 2024 - October 2025)
**~17 months** - *Project on hold (life happened some more)*

### 🔥 Phase 5: Final Polish & Completion (October 2025)
**October 5-8, 2025** - *The Final Push (4 days of work)*
- **Final Cleanup**: Restoring placeholder images and ensuring everything works

#### October 5, 2025 - *Infrastructure & Security*
- `fix: resolve TypeScript errors in OG image generation`
- `fix: replace broken Ghost image references with placeholders` - **Second placeholder attempt**
- `chore: add asdf tool versions configuration`
- `security: update Astro to 4.16.19 to fix critical vulnerabilities`

#### October 6, 2025 - *Documentation & Legal*
- `docs: comprehensive README update`
- `docs: integrate brutalist theme documentation with customizations`
- `legal: add comprehensive copyright and licensing information`
- `docs: add comprehensive deployment plan for GitHub Actions + Firebase`

#### October 6, 2025 - *UI/UX Enhancements*
- `feat: enhance footer with copyright notice and GitHub link`
- `Update page titles to use consistent 'eph baum dot dev' format`
- `feat: add dynamic color change button with random background colors`
- `feat: add Vercel deployment configuration`

#### October 6, 2025 - *Dynamic Color System*
- `feat: implement dynamic color system with palette button`
- `feat: implement comprehensive dynamic color system`
- `refactor: clean up dynamic color system for production`

#### October 7, 2025 - *Migration Completion & Documentation*
- `chore: update redirect in project settings`
- `feat: Add engaging preview descriptions to all blog posts`
- **`feat: complete Ghost CMS to Astro migration - restore all placeholder images`** - **🎉 MIGRATION COMPLETE!**
- `feat: add blog post generator script` - **🛠️ Developer tooling for future posts**
- `fix: improve code block styling for better readability` - **💻 Enhanced code display**
- `draft: add blog post about Ghost CMS to Astro migration` - **📝 Started documenting the journey**
- `fix: update blog post frontmatter and content` - **🔧 Content structure improvements**
- `remove: delete test post file` - **🧹 Cleanup**
- `feat: add comprehensive timeline to migration blog post` - **📅 Timeline documentation**
- `feat: update blog post with new migration image` - **🖼️ Visual enhancement**
- `feat: enhance migration blog post with Ghost backup conversion details` - **📖 Technical details**

#### October 8, 2025 - *Site Refinements & Polish*
- `Fix blog preview tag display issues` - **🏷️ Fixed tag rendering problems**
- `Improve blog post metadata readability with contrasting background colors` - **🎨 Better visual hierarchy**
- `Add personal blog link and update navigation text` - **🧭 Navigation improvements**
- `Add gentle dark mode protection for brutalist design` - **🌙 Dark mode compatibility**
- `Improve title handling in blog preview cards` - **📝 Better title display**
- `docs: integrate 2023 backup script post with complete migration timeline` - **🔗 Cross-referencing**

### 📊 Migration Statistics from Two Perspectives:
- **Ghost to Astro Migration Timeline**: ~2 years (October 2023 - October 2025)
- **Actual Work Time**: <10 days total (1-3 days in Oct 2023 + 3 days in May 2024 + 4 days in Oct 2025)

**The Reality**: What looks like a 2-year project was actually just a few days of focused work that happened to be spread across two years due to life, other priorities, and the luxury of not having a hard deadline. Sometimes the best projects are the ones you can work on when inspiration strikes!

## The Final Mile: Image Restoration

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

I'm not sure, exactly, except that I have the best of intentions to try to get some of these draft posts that have been piling up out into the wild.

## Lessons Learned

The migration process taught me several valuable lessons about content migration, image handling, and the importance of systematic approaches to complex technical tasks.

I'm happy to be able to spin down one of my many Digital Ocean droplets. My little blog droplet has been running me about $5 a month for a long time when I could have probably knocked this more than $80 ago. Now, instead of running a Ghost Blog with its MySQL database and other resources, I've got something much more streamlined and, frankly, appropriate for the nature of my dev blog. 

## Conclusion

The migration from Ghost CMS to Astro represents a significant modernization of the blog infrastructure while preserving all the valuable content and images that have been created over the years.

I'm happy with how this new blog has turned out and while there's [still work to do](https://github.com/ephbaum/ephbaumdotdev/issues) (if this list of issues is empty I would be shocked, plus, at least as of this writing, there are still some missing splash images, tags, and plenty of opportunity for spelling and grammar fixes from years of poor editing), I'm pleased with the outcome despite the shockingly long timeline.

Maybe I'll even clean up the AI sloppiness of this post eventually, for now I wish you well and thank you for reading! 👋

---

*This post documents the complete migration journey from Ghost CMS on Digital Ocean to Astro hosted on Vercel, completed on October 8, 2025.*
