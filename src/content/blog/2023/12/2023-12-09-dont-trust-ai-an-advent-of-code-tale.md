---
title: Don't Trust AI - An Advent of Code Tale
postSlug: dont-trust-ai-an-advent-of-code-tale
slug: dont-trust-ai-an-advent-of-code-tale
pubDate: 12/09/2023 11:25 AM
imgUrl: ../../../../assets/img/2023/12/f6af0ed99802cb6960e57f92fdd154a3ffb03a21.jpeg
ogImage: ../../../../assets/img/2023/12/f6af0ed99802cb6960e57f92fdd154a3ffb03a21.jpeg
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description:
  Placeholder description for imported post from Ghost Blog
layout: ../../../../layouts/BlogPost.astro
---

![Featured Image](../../../../assets/img/2023/12/f6af0ed99802cb6960e57f92fdd154a3ffb03a21.jpeg)

Or: Trust but Verify AI
-----------------------

I've been working on [Advent of Code 2023](https://adventofcode.com/) and having a good time. I _might_ even complete them all this time as I've historically fallen off usually due to the typical hustle and bustle that December creates. You can find my code for this year [here](https://replit.com/@ephbaum?path=folder/Advent%20of%20Code%202023) on Repl.it, which I've been using because I don't want to melt my own computer trying to brute force a problem like an idiot on a first pass of trying to use my part 1 code on part two (if you're not familiar: each day of [AoC](https://en.wikipedia.org/wiki/Advent_of_Code) presents you with a computer programming puzzle to solve using any programming language (or method, even manually if you're nasty) in two parts, the second part often ramps up the complexity significantly and sometimes in a "infinite loops & cycles might melt your silicon" kind of way).

Recently I was working on [part 2 of day 7](https://replit.com/@ephbaum/Advent-of-Code-2023-Day-7-Part-1-NodeJS) (**spoilers** for day 7's solution) on [Repl.it](https://replit.com/). Sometimes I work locally and copy pasta my work over to Repl.it when I'm done or as I go and sometimes I just work right in the Repl.it environment. I'm easy breezy like that.

In this case I had refactored my _working_ part 2 code in the quest for optimization as my solution was working against the example inputs but taking too long to run against the full input. So the logic I'd already written didn't need to change, it was being copy and pasted between locations. It seems that in so doing their [Co-Pilot](https://github.com/features/copilot)\-esque AI seems to have generated a less than helpful line of code and I don't even recall actually accepting it. In its defense, I don't pay for [Repl.it Core](https://replit.com/replit-core), so I only have access to their "basic" level AI.

So, without giving away too many **spoilers**, part of Day Seven's challenge was to determine the rank of card hands based on some traditional poker hands, so I had a `determineBestHand` method:

    function determineBestHand(cardCounts, jokerCount) {
      if (jokerCount === 5) {
        return { type: 'Five of a Kind', weight: 1 };
      }
    
      const frequencies = Object.values(cardCounts).sort((a, b) => b - a);
    
      if (frequencies[0] + jokerCount >= 5) {
        return { type: 'Five of a Kind', weight: 1 };
      }
      
      if (frequencies[0] + jokerCount >= 4) {
        return { type: 'Four of a Kind', weight: 2 };
      }
    
      if ((frequencies[0] === 3 && (frequencies[1] >= 2 || jokerCount > 0)) 
          || (frequencies[0] === 2 && frequencies[1] === 2 && jokerCount > 0)) {
        return { type: 'Full House', weight: 3 };
      }
    
      if (frequencies[0] + jokerCount === 3) {
        return { type: 'Three of a Kind', weight: 4 };
      }
    
      if ((frequencies[0] === 2 && frequencies.length > 1)
          || (frequencies[0] === 1 && jokerCount >0)) {
        return { type: 'Two Pair', weight: 5 };
      }
    
      if (frequencies[0] === 2 || 
          (frequencies[0] === 1 && jokerCount >= 1)) {
        return { type: 'One Pair', weight: 6 };
      }
    
      return { type: 'High Card', weight: 7 };
    }

The issue was not super obvious as a first glance. I kept missing the issue due to thinking this logic was sound, as I'd used the exact same code in the previous part's challenge with success.

Thankfully someone was able to spot the issue for me: my results no longer included "One Pair" results at all.

That made the bug obvious: the condition `(frequencies[0] === 2 && frequencies.length > 1)` will be true for any situation where there is at least one pair, regardless of whether there's a second pair or not.

The correct logic for 'Two Pairs' was:

    if (frequencies[0] === 2 && frequencies[1] === 2) {
      return { type: 'Two Pair', weight: 5 };
    }

🤦

I use generative AI now. I really like it, though it's not always helpful or accurate. I've been using GitHub's Co-Pilot for a while and it's mostly useful in saving me from typing out repetitive and basic code like `for` loops or `switch` or `match` statements. In short: I think I'm still smarter than “AI”. Co-Pilot Chat and [ChatGPT](https://openai.com/chatgpt) are still helpful in reasoning through problems sometimes- it's like [rubberducking](https://en.wikipedia.org/wiki/Rubber_duck_debugging) without having to waste a real person's time.

Some things that drive me nuts about AI:

*   it won't defend itself when it's right
*   it will vehemently defend itself when it's wrong
*   it hallucinates
*   it's sometimes overly verbose
*   other times it's surprisingly lazy

In conclusion, while AI, in forms like GitHub's Co-Pilot or Repl.it's coding assistant, offers undeniable convenience and speed in coding, it's not a panacea. As my experience with Advent of Code highlights, AI can sometimes lead us astray with its suggestions. It's a reminder that AI, at its current stage, is more of a co-pilot than an autonomous driver. It requires our expertise, vigilance, and, occasionally, our skepticism. The key is to use AI as a tool to enhance our skills, not replace them. Trust, but verify, remains a prudent approach when navigating the evolving landscape of AI in software development. As we continue to explore this symbiotic relationship, it's essential to maintain a balance between leveraging AI's efficiency and retaining our critical problem-solving abilities. After all, the true power of coding lies in the human mind's creativity and ingenuity, something no AI has yet to replicate.
