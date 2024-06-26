---
title: Organising your content
postSlug: organising-content
slug: organising-content
pubDate: 01/31/2021 05:19 PM
imgUrl: ../../../../assets/img/2021/01/9cff322e08720301c3f50b53aba86d15b27c4e9e.png
ogImage: ../../../../assets/img/2021/01/9cff322e08720301c3f50b53aba86d15b27c4e9e.png
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description:
  Placeholder description for imported post from Ghost Blog
layout: ../../../../layouts/BlogPost.astro
---

![Featured Image](../../../../assets/img/2021/01/9cff322e08720301c3f50b53aba86d15b27c4e9e.png)

Sensible tagging
----------------

You can think of tags like Gmail labels. By tagging posts with one or more keyword, you can organise articles into buckets of related content.

When you create content for your publication you can assign tags to help differentiate between categories of content.

For example you may tag some content with News and other content with Podcast, which would create two distinct categories of content listed on `/tag/news/` and `/tag/podcast/`, respectively.

If you tag a post with both `News` _and_ `Podcast` - then it appears in both sections. Tag archives are like dedicated home-pages for each category of content that you have. They have their own pages, their own RSS feeds, and can support their own cover images and meta data.

### The primary tag

Inside the Ghost editor, you can drag and drop tags into a specific order. The first tag in the list is always given the most importance, and some themes will only display the primary tag (the first tag in the list) by default.

> _**News**, Technology, Startup_

So you can add the most important tag which you want to show up in your theme, but also add related tags which are less important.

### Private tags

Sometimes you may want to assign a post a specific tag, but you don't necessarily want that tag appearing in the theme or creating an archive page. In Ghost, hashtags are private and can be used for special styling.

For example, if you sometimes publish posts with video content - you might want your theme to adapt and get rid of the sidebar for these posts, to give more space for an embedded video to fill the screen. In this case, you could use private tags to tell your theme what to do.

> _**News**, #video_

Here, the theme would assign the post publicly displayed tags of News - but it would also keep a private record of the post being tagged with #video. In your theme, you could then look for private tags conditionally and give them special formatting.

> _You can find documentation for theme development techniques like this and many more over on Ghost's extensive [theme docs](https://ghost.org/docs/themes/)._

Dynamic routing
---------------

Dynamic routing gives you the ultimate freedom to build a custom publication to suit your needs. Routes are rules that map URL patterns to your content and templates.

You may not want content tagged with `News` to exist on: `example.com/tag/news`. Instead, you want it to exist on `example.com/news` .

In this case you can use dynamic routes to create customised collections of content on your site. It's also possible to use multiple templates in your theme to render each content type differently.

There are lots of use cases for dynamic routing with Ghost, here are a few common examples:

*   Setting a custom home page with its own template
*   Having separate content hubs for blog and podcast, that render differently, and have custom RSS feeds to support two types of content
*   Creating a founders column as a unique view, by filtering content created by specific authors
*   Including dates in permalinks for your posts
*   Setting posts to have a URL relative to their primary tag like `example.com/europe/story-title/`  
    

> _Dynamic routing can be configured in Ghost using [YAML](http://yaml.org/spec/1.2/spec.html) files. Read our dynamic routing [documentation](https://ghost.org/docs/themes/routing/) for further details._

Next: Apps & Integrations
-------------------------

Work with all your favourite apps and tools using our [integrations](__GHOST_URL__/apps-integrations/), or create your own custom integrations with webhooks.
