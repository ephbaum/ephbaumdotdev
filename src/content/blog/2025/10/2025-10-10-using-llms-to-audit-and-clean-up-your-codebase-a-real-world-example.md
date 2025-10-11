---
title: "Using LLMs to Audit and Clean Up Your Codebase: A Real-World Example"
postSlug: using-llms-to-audit-and-clean-up-your-codebase-a-real-world-example
slug: using-llms-to-audit-and-clean-up-your-codebase-a-real-world-example
pubDate: 10/11/2025 1:05 PM
imgUrl: "../../../../assets/img/2025/10/marija-zaric-SKcO5YXf0D4-unsplash.jpg"
ogImage: "../../../../assets/img/2025/10/marija-zaric-SKcO5YXf0D4-unsplash.jpg"
author: Eph Baum (w/ Claude)
featured: true
draft: false
tags:
  - ai
  - automation
  - developer-tools
  - llm
  - codebase-management
  - productivity
description: "How I used an LLM to systematically audit and remove 228 unused image files from my legacy dev blog repository, saving hours of manual work and demonstrating the practical value of AI-assisted development."
layout: ../../../../layouts/BlogPost.astro
---

![Delete On Grafitti from Unsplash](../../../../assets/img/2025/10/marija-zaric-SKcO5YXf0D4-unsplash.jpg)

## Introduction

Today, as I did a bit more cleanup on this dev blog, I figured it was time to tackle the bloat and handle the images that I've been carrying along through multiple platform migrations. What followed was an excellent example of how Large Language Models can transform tedious, error-prone manual work into a systematic, documented, and efficient process.

This isn't about AI writing code for me. This is about AI being a worthy pair programming partner for the kind of work that often makes developers cringe — auditing, analyzing, and cleaning up technical debt.

Moreover, this was another case where using a file (typically markdown), helps raise the confidence that the LLM will not "forget" and lose its working memory. (More on this below)

## The Problem: Digital Clutter After Multiple Migrations

After migrating my blog from Ghost CMS to Astro and finally getting that work done (after two years!), I noticed that I had both `public/img/` and `src/assets/img/` directories, and that they seemingly contained a lot of the same files. I recently wrote about the process of [migrating from Ghost to Astro](/blog/migrating-from-ghost-cms-to-astro/), and given the long time, level of automation involved, and lack of focus, I was sure there was cruft from the migration process.

As a matter of fact: some of the files were still hanging around from the _previous_ incarnations of this blog.

How much cruft? That was the question. Which files were duplicates? Which were actually being used? The thought of manually checking 220+ image files across dozens of blog posts made me want to simply continue ignoring the issue:

<iframe width="560" height="315" src="https://www.youtube.com/embed/0avDWIrP24M?si=8_ZU0ssvsPGZYIt_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Enter the LLM: A Systematic Approach

Instead of manually clicking through directories, I asked Claude, via Cursor, to help audit the situation. What happened next was fascinating—not because the AI did anything magical, but because it approached the problem with the systematic rigor that I always _should_ but rarely have the patience for.

### Phase 1: Discovery and Analysis

The LLM started by doing what any good engineer would do:

1. **Cataloged everything** - Used `glob` to find all 110 files in `public/img/` and 110 in `src/assets/img/`
2. **Searched for usage** - Used `grep` to find where images were actually referenced in the codebase
3. **Identified patterns** - Recognized that blog posts reference `../../../../assets/img/` while OG image generation uses `public/img/`
4. **Documented findings** - Created a comprehensive audit document

**Result:** 140 files in `public/img/` were duplicates. Only 1 file (`ephbaum_avatar_200_200.png`) was actually needed there for OG image generation.

### Phase 2: Scientific Testing

Here's where it got interesting. Rather than just deleting files and hoping for the best, the LLM proposed a test:

```bash
# Backup
cp -r public/img /tmp/backup

# Delete all but the essential file
find public/img -type f ! -name 'ephbaum_avatar_200_200.png' -delete

# Run build
pnpm run build

# Verify nothing broke
```

Build passed. Zero errors. **140 files confirmed (and removed) as cruft.**

### Phase 3: Deeper Cleanup

With confidence from Phase 1's success, we moved on to `src/assets/img/`:

- **38 `_o` optimization files** - Ghost CMS created "optimized" versions, but Astro handles optimization automatically
- **19 unused images** - Profile pictures, icons, and other files never, or no longer, referenced in posts
- **31 Unsplash reference files** - Ghost's Unsplash integration left behind ID files (like `photo-1234567890`) with no file extensions

Each phase followed the same pattern: identify, test, verify, commit.

## The Results: 228 Files Removed

**Before:**
- `public/img/`: 110 files
- `src/assets/img/`: 110 files
- Total: 220 files

**After:**
- `public/img/`: 1 file
- `src/assets/img/`: 53 files (100% actively used)
- Total: 54 files

**75% reduction in image files, with zero broken references.**

## What Made This Effective

This wasn't just about automation—it was about leveraging LLM capabilities that align perfectly with this type of task:

### 1. **Systematic Analysis**

The LLM didn't just look at filenames. It:
- Searched the entire codebase for references
- Understood the difference between Astro's asset pipeline and static files
- Recognized Ghost CMS patterns (`_o` suffixes, Unsplash IDs)
- Identified that `ephbaum_avatar_200_200.png` was used by the OG image generation logic

### 2. **Documentation as We Go**

Every step was documented in `IMAGE_AUDIT.md`:
- What was found
- What was tested
- What was removed
- Why decisions were made

This creates an audit trail that's invaluable if something breaks later or if you need to understand what happened.

**The Working Memory Advantage:** This audit document served a dual purpose during the process. As we worked, it functioned as the LLM's "working memory"—a persistent record of findings that could be referenced throughout the session. Once complete, it transformed into a permanent artifact documenting exactly what happened and why. You can see the [complete audit document here](https://gist.github.com/ephbaum/2709f083eb362c4cb396999bbb5fa495).

This pattern of "documentation as working memory" is incredibly powerful with LLMs because:
- The LLM can reference previous findings without re-analyzing
- Each phase builds on documented results from prior phases
- The document becomes progressively more valuable
- Future sessions can pick up where you left off
- The final artifact is immediately useful to you or your team

### 3. **Risk Mitigation**

The LLM approached this like a careful engineer:
- Created backups before deleting
- Ran builds after each phase
- Verified with actual filesystem checks
- Used `git rm` so changes could be reverted if needed

### 4. **Pattern Recognition**

Without being told, the LLM recognized:
- `_o` files were optimization artifacts
- `photo-*` files without extensions were Unsplash IDs
- Duplicate filenames across directories
- The distinction between processed assets and static files

## The Bigger Picture: LLMs as Code Janitors

This experience highlights a sweet spot for LLM-assisted development: **tedious, systematic work that requires judgment but not creativity**.

LLMs excel at:
- Auditing and cataloging
- Following systematic processes
- Pattern recognition across large codebases
- Documenting decisions and reasoning
- Proposing safe, testable changes

They struggle with:
- Truly novel architectural decisions
- Understanding implicit business requirements
- Making judgment calls without clear criteria

For tasks like this image audit—where the "right answer" is objectively verifiable (does the build pass? are there broken images?)—LLMs are incredibly effective.

## The Power of Documentation as Working Memory

One of the most valuable aspects of this process was creating the [`IMAGE_AUDIT.md`](https://gist.github.com/ephbaum/2709f083eb362c4cb396999bbb5fa495) document. This wasn't just documentation—it was the LLM's functional working memory.

### How It Worked

As we progressed through each phase:

1. **Phase 1 Discovery** - The LLM cataloged all 220 files and recorded findings
2. **Phase 1 Execution** - Results were documented: "140 files removed, 1 kept"
3. **Phase 2 Planning** - The LLM referenced Phase 1's documented results to plan Phase 2
4. **Phase 2 Execution** - Built on the foundation of Phase 1's documentation
5. **Phase 3 Final Cleanup** - Found the Unsplash files by analyzing the updated state

At each step, the audit document served as:
- **A record of what we knew** - Preventing re-analysis of the same data
- **A source of truth** - Clear decisions documented for future reference
- **A checkpoint system** - Each phase verified before proceeding
- **A shareable artifact** - Now available for anyone to review

### The Lasting Value

If you choose to commit this sort of documentation, months after the fact, if someone asks "why are there only 53 images in src/assets/img and only one over in public/img?", the answer is permanently documented. The audit shows:
- What was there originally (220 files)
- What was removed (228 files across 3 phases)
- Why each decision was made
- How each phase was tested

This is significantly better than git commit messages alone because it captures the *reasoning* and *context*, not just the actions.

Of course, these sorts of files can live in your repository but can also be uploaded as artifacts to your JIRA or Confluence, or whatever tools you're using, so that you don't have to remember the work, it's remembered on your behalf.

## Lessons Learned

### 1. **Start with Discovery, Not Solutions**

The LLM didn't immediately suggest deleting files. It first built a complete picture of what existed and how it was used. This prevented potential disasters.

### 2. **Test Every Assumption**

Phase 1's scientific test (delete, build, verify) gave us confidence to proceed with Phases 2 and 3. Without that test, we'd be nervous about every change.

### 3. **Document for Future You (and Your LLM)**

The [`IMAGE_AUDIT.md`](https://gist.github.com/ephbaum/2709f083eb362c4cb396999bbb5fa495) file served as working memory during the process and is now a permanent record of what happened and why. Six months from now, if someone asks "why is there only one file in public/img?", the answer is documented. Even better: if you need an LLM to help with related work later, you can provide this document as context.

### 4. **Commit in Phases**

Rather than one massive "removed 228 files" commit, we made three logical commits:
```bash
f20dea9 chore: remove 140 duplicate images from public/img
39a2ba1 chore: remove 57 unused images from src/assets/img (Phase 2)
1feac7e chore: remove 31 Unsplash reference files (Phase 3)
```

Each commit is independently revertible and explains its purpose.

### 5. **Improve Tools for LLM Usage**

We discovered that my `new-post.js` script only worked interactively. We updated it to accept command-line arguments, making it LLM-friendly:

```bash
pnpm run new-post --title "My Post" --description "..." --tags "ai,tech"
```

This makes the codebase more automatable for both LLMs and CI/CD pipelines.

## The Meta Moment

There's something beautifully recursive about using an LLM to clean up a codebase, then using that same LLM to write a blog post about the experience, which gets committed to the very repository we just cleaned.

In fact, the LLM even improved its own tooling during this process by making the blog post generator CLI-friendly.

## Conclusion: The Future is Collaborative

This isn't about AI replacing developers. I firmly believe that LLMs, with their fancy text prediction, will never truly _replace_ engineers. It's about AI being an incredibly patient, systematic, and thorough pair programmer for work that humans find tedious. It's about LLMs being able to manage large contexts, albeit temporarily, much more quickly and efficiently than most humans.

I could have done this audit manually. It would have taken many more hours than it did, I may even have gotten bored and quit. Potentially I might have missed patterns like the Unsplash reference files or at least it might have taken a bit longer for me to recognize exactly _what_ they were. (Immediately Claude suggested they were either Unsplash or Flickr related)

Instead, it took about 90 minutes of conversation, while multitasking (watching a horror movie to add to my [tracker](https://horrormovieseason.com)) resulted in a cleaner codebase, comprehensive documentation, and a blog post about the experience.

The future of development isn't necessarily AI writing all our code. It's AI handling the systematic, tedious parts while we focus on the creative, strategic decisions.

And honestly? I'm here for it.

Why wouldn't we offload the tedious care and feeding of our systems to a fancy text guesser?

We wouldn't unless we have some guardrails, good process, and ultimate approval over the results.

## Try It Yourself

If you have a similar situation—duplicates, unused assets, unclear technical debt—try this approach:

1. **Ask your LLM to audit before suggesting solutions** - Start with discovery
2. **Create a working document** - Let it serve as the LLM's memory
3. **Test changes systematically** - Build after each phase
4. **Document as you go** - The document becomes progressively more valuable
5. **Commit in logical phases** - Make changes independently revertible
6. **Verify nothing broke** - Check builds, check functionality

The key insight: **treat documentation as functional working memory**, not as an afterthought. The document guides the process *and* becomes the artifact.

## Resources

- [Complete Image Audit Document (Gist)](https://gist.github.com/ephbaum/2709f083eb362c4cb396999bbb5fa495) - See the full working memory document that guided this entire cleanup
- [Ghost to Astro Migration Post](/blog/migrating-from-ghost-cms-to-astro/) - The migration that created this cleanup opportunity
- [Updated new-post.js Script](https://github.com/ephbaum/ephbaumdotdev/blob/main/scripts/new-post.js) - Now LLM-friendly with CLI arguments

---

*This post was written collaboratively between a human (me) and Claude (Anthropic's LLM), using the very approach described in the article. The image cleanup, blog post creation, and even the improvement to the blog post generator script all happened in a single session. The [complete audit document](https://gist.github.com/ephbaum/2709f083eb362c4cb396999bbb5fa495) that served as working memory throughout the process is available as a gist, demonstrating how documentation can function as both working memory and permanent artifact.*
