---
title: Ghost Blog backup to Astro markdown
postSlug: ghost-blog-backup-to-astro-markdown
slug: ghost-blog-backup-to-astro-markdown
pubDate: 10/09/2023 09:59 PM
imgUrl: ../../../../assets/img/2023/10/14b96419c1596c4eed6a61b4c2cbddc116edefb4.jpeg
ogImage: ../../../../assets/img/2023/10/14b96419c1596c4eed6a61b4c2cbddc116edefb4.jpeg
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description:
  Placeholder description for imported post from Ghost Blog
layout: ../../../../layouts/BlogPost.astro
---

![Featured Image](../../../../assets/img/2023/10/14b96419c1596c4eed6a61b4c2cbddc116edefb4.jpeg)

The Problem:
------------

I believe I have mentioned here in the past my desire to leave the [Ghost Blog](https://ghost.org/) platform in favor of using [Astro](https://astro.build/) for at least some of my blogs.

To be clear, I love the Ghost platform, but I've long been interested in moving to a more simplistic static hosting solution. I find that Ghost is a bit more than I really need and, at least for most of my use cases, more overhead than I'd prefer. I've looked at using multiple options such as Gatsby. Not too long ago I had Astro recommended and I've been playing with it ever since and found it very much to my liking.

The issue that I encountered was that I have not been able to find a useful tool or tutorial that would allow me to easily migrate my posts from Ghost to Astro.

Ghost has long had a [backup feature](https://ghost.org/docs/faq/manual-backup/). More recent versions of Ghost include a backup tool in the [CLI](https://ghost.org/docs/ghost-cli/). The backups that produces a zip archive containing your content and various metadata related to your Ghost Blog

I found one useless [tutorial](https://www.geekinsta.com/how-to-export-ghost-posts-to-markdown/) that pointed to a [tool](https://github.com/hswolff/ghost-to-md) that claimed to convert Ghost Blog's backup to markdown files but the [issues](https://github.com/hswolff/ghost-to-md/issues) and [commit history](https://github.com/hswolff/ghost-to-md/commits/master) suggested it is quite outdated. The last commit was in 2019. The tutorial itself is incomplete even if the tool it referenced worked.

The Solution:
-------------

Write it myself was the path I chose.

Here's an embedded a [gist](https://gist.github.com/ephbaum/286b9d0c0fb9941a525d6dfdd7307b08) with some placeholders that accomplishes my goal, broadly:

This solution isn't perfect. There are myriad improvements and optimizations possible, but it served my needs pretty well recently and I felt it was worth sharing for anyone else looking to accomplish this same goal.

I think it's pretty self explanatory. It uses Turndown to convert the HTML in the JSON backup file to Markdown and then outputs each post as its own Markdown file.  
  
Good luck and feel free to reach out if you have any questions.
