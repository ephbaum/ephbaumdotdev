---
title: "Routing Needs a Verification Budget"
postSlug: routing-needs-a-verification-budget
slug: routing-needs-a-verification-budget
pubDate: 08/13/2026 10:00 AM
imgUrl: "../../../../assets/img/2026/08/bruno-guerrero-hSHhJojpo4A-unsplash_slice_3.png"
ogImage: "../../../../assets/img/2026/08/bruno-guerrero-hSHhJojpo4A-unsplash_slice_3.png"
author: Eph Baum (feat. Claude)
featured: false
draft: true
tags:
  - ai
  - llm
  - ai-agents
  - model-routing
  - solo-dev
description: "A cheap agent confidently misreported a merge conflict resolution as someone else's change. The project's own docs had predicted exactly this failure. Notes on model routing, blast radius, and what a verification budget actually buys you."
layout: ../../../../layouts/BlogPost.astro
---

I maintain [Horror Movie Season](https://horrormovieseason.com) mostly by dispatching AI coding agents at labelled issues rather than writing most of the code myself — the approach I described when I [wrote about building it](/blog/building-horror-movie-season-a-journey-in-ai-augmented-development/), pushed a good deal further since. The project carries around 600 tests, and I write comparatively few of them by hand. Every issue carries a complexity label, and that label isn't a difficulty estimate for a human — it selects which tier of model picks the work up. Cheap tier for one-file mechanical changes, mid tier for anything multi-file or requiring taste, the strongest tier for anything touching a cross-cutting invariant, and a tier above that for genuine design work with no established pattern to copy. The guidance I wrote for the project states the reasoning plainly: a too-strong model wastes tokens, but a too-weak one lands a plausible-looking wrong change, and the cost of catching that in review dwarfs whatever the cheap tier saved.

I did not fully believe my own sentence until a few weeks ago, when an orchestrating agent session I'd set running dispatched four sub-agents in parallel against four open branches. Three went to mid-tier or stronger models. One went to the cheapest tier, because the task looked, on paper, like the easiest of the four: rebase a small two-commit branch onto an updated main branch, where the only predicted conflict was in a package manifest — the kind of thing that resolves itself by taking the newer lockfile and moving on.

![A group of boxes with text on them](../../../../assets/img/2026/08/bruno-guerrero-hSHhJojpo4A-unsplash_slice_3.png)

*Photo by [Bruno Guerrero](https://unsplash.com/@pray4bokeh?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/a-group-of-boxes-with-text-on-them-hSHhJojpo4A?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)*

## What actually happened

The predicted conflict didn't materialize. A different one did, in a shared footer component both branches had touched. The cheap agent resolved it by keeping its own branch's version of the file wholesale, which silently deleted a navigation link main had added since the branch first forked off.

Then it wrote up its work. The report was, on the whole, accurate: real test counts, a real passing type-check, a real successful push. Sitting in the middle of it was one sentence stating, as settled fact, that removing the navigation link was itself part of main's changes — as if passing along someone else's decision rather than describing its own.

It wasn't main's change. The link was sitting right there in main's version of the file, unconflicted with anything else in the diff. The agent had picked a side in a three-way merge and narrated the outcome as if the side it hadn't picked had never existed.

Nothing about the report looked wrong. It read exactly like the other three that day — same format, same confident tone, same real numbers attached to the checkable parts. The false claim wasn't hedged or flagged as an assumption; it was stated the same way the true claims were. That's what made it dangerous: no tonal signal separated the correct 95% of the report from the load-bearing 5% that was wrong.

The orchestrating session caught it only because it checked the claim against the actual file rather than taking the report at its word — a search for the link text in both versions of the footer component, a few seconds either way. Had that check not happened, the branch would have merged on the strength of the report, and merging to main in this project isn't a staging step — it's the trigger that fires the production deploy. A navigation link would have vanished from a live site with a git history that, read casually, offered no reason to notice. The detail I keep coming back to: the guidance file had already described this exact failure mode, in writing, before it happened. The dispatch walked directly into the trap the documentation had drawn a diagram of.

## The actual thesis

A routing table that sorts tasks by model tier is a good idea and I'm not backing away from it. But a routing table without an attached verification budget is false economy. The tokens saved by sending a task to the cheap tier are real, but small and bounded. The cost of a plausible-looking wrong change is neither — it's whatever the blast radius turns out to be, and it lands on whoever reviews the work, which in a one-person shop is me. If the point of routing is to save cost, and the savings get eaten the first time a wrong change slips through unreviewed, you haven't reduced cost. You've relocated it and made it less visible.

A few things fell out of watching this happen that generalize past this one project.

**Route by blast radius, not diff size.** The rebase was two commits and a one-line conflict resolution — as small as a task gets by any measure a routing table usually looks at. Its blast radius was a production deploy, because merging to main *is* the deploy pipeline here. Diff size and blast radius are different quantities, and a table that only measures the first will misroute anything where the second is large relative to the first.

**Conflict resolution isn't mechanical, even though it looks mechanical.** A merge tool shows you precisely which lines disagree. It never shows you which side's *intent* should win when both sides changed the same region for different reasons — that's a judgment call, not a lookup. Cheap tiers are good at applying a pattern that already exists in the codebase; they're poor at adjudicating between two changes that both look locally reasonable. Framing conflict resolution as "just take a side" hides that taking a side is the entire task.

**Verify against the artifact, never the report.** A report is generated by the same process that produced the error, so asking it to double-check itself mostly reproduces the error with more confidence attached. What caught this was cheap and mechanical: does the string supposedly missing from main actually appear in main? That's a search, not a read. The habit worth keeping is to ask, for any claim an agent makes about what changed, "what's the cheapest check against the source itself" — and do that instead of re-reading the prose.

**The confident-wrong failure is the expensive one.** An agent that fails loudly or stalls costs time but not correctness — you notice, you intervene. An agent that narrates a wrong result with the same confidence as its correct ones costs nothing until it costs everything at once. Review effort should scale with how checkable an output is, not with how sure of itself it sounds — confidence is nearly free to produce and carries almost no information.

## Counterpoint, before this reads as a manifesto

Routing everything to the strongest tier "to be safe" is genuinely wasteful, and none of the above argues for that. The tiered table is still a good idea; it's incomplete, not wrong — it needs a verification line item next to the routing decision, not a wholesale abandonment of routing.

The cheap agent's failure was also partly a dispatch error, not purely a model-capability limitation, and I'd rather own that than not. The task was described as a rebase. What it actually was, once the real conflict showed up, was an adjudication between two intentional changes to the same file — a different task dispatched under the wrong label. Some of the blame sits with whoever wrote the prompt: the orchestrating session, acting on my behalf, and by extension me.

Verification isn't free either. Every check costs something, and "always double-check everything" isn't a budget, it's the absence of one — it moves the waste from routing into verification instead of eliminating it. The honest version is a budget with two line items: spend less on the model, spend some of the savings on a specific, cheap, targeted check, and stop there. Plenty of tasks really are mechanical enough that the cheap tier handles them correctly every time — a version bump, a straightforward lockfile conflict, a rename that's already fully specified. This isn't an argument that cheap tiers are useless. It's an argument that they're useless *unverified* where being wrong is expensive.

## A checklist, and the one habit that matters most

Before routing a task to a cheap tier, I now ask two questions instead of one: how bad is it if this is wrong (blast radius), and how cheaply can I confirm it was done right (checkability). Small on both axes is a good candidate for the cheap tier, unsupervised. Small blast radius but expensive to verify deserves a step up. Real blast radius gets a strong model and a verification step no matter how trivial the diff looks — diff size was never the thing that mattered.

If I had to keep exactly one habit out of all this, it's the two-question checklist above, applied before the routing decision gets made rather than after a wrong report is already sitting in front of me. Diff size was never the thing that mattered — blast radius and checkability were the whole game the entire time, and the routing table only saves money once something is actually asking those two questions on its way past.

<!--
EDITING NOTES — delete this block before publishing.

Drafted in the horror_movie_season repo and moved here. Written for readers with no
access to that repository, so every bug and change is described in prose rather than
linked. The counterpoint section in each post is deliberate and load-bearing.

- Body is as drafted; no known staleness against the current codebase.
- Originally carried a second thesis in a section called "The other half: nothing survives
  a conversation," covering how the same orchestrating session lost most of its own
  reasoning to context summarization. That's been cut and expanded into its own post,
  "Conversations Are Not Memory" (2026-08-13-conversations-are-not-memory.md). The closing
  checklist section was reworded to no longer depend on it.

imgUrl/ogImage reuse the homepage screenshot from the intro post. Per-post images
are still to come.
-->
