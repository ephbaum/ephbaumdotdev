---
title: 2023-04-02 - project blog - elxrBB- Innaugural Entry
postSlug: 2023-04-02-project-blog-elxrbb-innaugural-entry
slug: 2023-04-02-project-blog-elxrbb-innaugural-entry
pubDate: 04/02/2023 10:49 PM
imgUrl: ../../../../assets/img/2023/04/fdb7dba842b655b8cb35a1f5deccc51a3d2f3db7.jpeg
ogImage: ../../../../assets/img/2023/04/fdb7dba842b655b8cb35a1f5deccc51a3d2f3db7.jpeg
author: Eph Baum
featured: false
draft: false
tags:
  - project-blog
  - elixir
  - personal-project
  - announcement
description: "Building an Elixir forum with ChatGPT as your coding partner—what could go wrong? The inaugural entry of the elxrBB project chronicles the early days of AI-assisted development, complete with setup struggles, asdf discoveries, and the reality of working with GPT-4's limitations."
layout: ../../../../layouts/BlogPost.astro
---

![Featured Image](../../../../assets/img/2023/04/fdb7dba842b655b8cb35a1f5deccc51a3d2f3db7.jpeg)

Having reached the end of my first weekend _collaborating_ with ChatGPT (GPT-4), I wanted to take a moment to reflect over the experience thus far.

I'm referring to an ambitious project called [elxrBB](https://github.com/ephbaum/elxrBB-tutorial), which I'm almost certain to eventually abandon due to OSTD (Ooh, shiny thing! Disorder) but for which I'm at least presently excited and engaged.

What I'm doing is working with ChatGPT to quickly design and build out an open source forum web application software while simultaneously creating a series of tutorial blog posts (maybe even videos) while I'm learning to work with Elixir & Phoenix (and ecto, etc.) through the process of vetting what is certain to be often-wrong (at best) code.

Here's our mission statement:

> The mission of this project is to provide a comprehensive, accessible, and engaging tutorial series that teaches learners how to build a complete web application using the Elixir programming language and the Phoenix framework. By building elxrBB, a forum system with a wide range of features, learners will gain hands-on experience in implementing various functionalities, integrating external services, and following best practices for web development. By the end of the tutorial series, learners should have a solid understanding of Elixir, Phoenix, and related technologies, as well as the skills and confidence to develop their own web applications.

> The project aims to empower learners to become proficient in Elixir and Phoenix and contribute to the growing ecosystem surrounding these technologies. Additionally, the elxrBB application itself will be an open-source solution, allowing others to use or modify it as needed, further promoting the growth and adoption of Elixir and Phoenix.

I think it's worth noting that I've really only spent a few hours, in total, on this process, and a fair amount of that was multitasking while waiting for responses as GPT-4 does not return very quickly. Many of those responses were garbage due simply to the fact that ChatGPT has a shorter working memory than my own (which feels Memento-esque).

Ultimately this has already been quite the learning experience for sure.

It has also _felt_ productive

As I mention in the [README](https://github.com/ephbaum/elxrBB-tutorial/blob/main/README.md), ChatGPT is quite the yes-man.

It has been genuinely fun to chat with ChatGPT, it's a generous chat partner, and it keeps track of context well enough to have followed me on the evolution of a fairly significant undertaking.

So far, though I'm not far in the process, it's been pretty accurate.  It's at least close to accurate describing the current instructions for setup. You can [see](https://github.com/ephbaum/elxrBB-tutorial/commit/5ec645ba8a9b1fb12048854fd0669721e3a5ac58) I made only minor tweaks around the ChatGPT content. I did inject my own experience on needing to update runtimes which, unrelated to ChatGPT, jives well with my experience trying to install all kinds of different runtimes and frameworks since forever.

FWIW - Ultimately I settled on [asdf](https://asdf-vm.com/) - it feels almost like cheating, tbh - if you're not familiar, you might want to check it out 😅

I can't make too many judgements yet, but I'm broadly feeling positive and excited about this project. I'll admit, however, I have already considered pivoting toward what feels like a more relevant idea: a “buy nothing” marketplace platform using an event-driven architecture (ooh: ✨✨)

Anyway, let me close by pointing out that GPT-4 clearly isn't [AGI](https://en.m.wikipedia.org/wiki/Artificial_general_intelligence). It makes a lot of dumb repeated mistakes, its memory is terrible, it makes things up, and sometimes just seems dumb\*, however, it's definitely a powerful technology. The more time with it I spend, the more impressed I become.

We'll see how this goes, at a glance I think a lot of missing steps, inaccurate and disjointed code, and blatantly wrong information is going to rear their ugly heads as I go.

It's been fun so far!

🤞 wish me luck

🤙 is you want to help

* \* says the person using a Dunning-Kruger machine in a vain attempt to make an open source software using a language they've previously used only briefly to create a simple todo app using a programming paradigm for which they're not the most experienced 😅
