---
title: "Conversations Are Not Memory"
postSlug: conversations-are-not-memory
slug: conversations-are-not-memory
pubDate: 08/13/2026 10:15 AM
imgUrl: "../../../../assets/img/2026/08/bruno-guerrero-hSHhJojpo4A-unsplash_slice_6.png"
ogImage: "../../../../assets/img/2026/08/bruno-guerrero-hSHhJojpo4A-unsplash_slice_6.png"
author: Eph Baum (feat. Claude)
featured: false
draft: true
tags:
  - ai
  - ai-agents
  - llm
  - documentation
  - solo-dev
description: "A long agent session re-derived the same conflict matrix twice, because the first pass never left the conversation before the context window rolled over it. Notes on treating a session as scratch space and the repository as the only real memory."
layout: ../../../../layouts/BlogPost.astro
---

I maintain [Horror Movie Season](https://horrormovieseason.com) mostly by dispatching AI coding agents at labelled issues, an approach I described when I [wrote about building it](/blog/building-horror-movie-season-a-journey-in-ai-augmented-development/). A while back I had an orchestrating agent session running for hours, managing several open branches at once — checking which ones conflicted with each other, dispatching sub-agents to resolve what it found, verifying the results. It was, by a wide margin, the most productive single session I'd run against that project. It's also the session that taught me the productivity was mostly an illusion, because almost none of what it figured out was still there by the time it mattered.

This isn't about which model got which task, which is its own story. It's about a narrower, easier-to-miss problem: a long-running agent session doesn't just run out of tokens eventually — it actively discards its own history well before that, and it discards good reasoning exactly as readily as bad.

![A group of boxes with text on them](../../../../assets/img/2026/08/bruno-guerrero-hSHhJojpo4A-unsplash_slice_6.png)

*Photo by [Bruno Guerrero](https://unsplash.com/@pray4bokeh?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/a-group-of-boxes-with-text-on-them-hSHhJojpo4A?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)*

## What a context window actually throws away

Past some threshold, a long session summarizes its own earlier turns to keep operating within its context window, and the summary is what persists going forward — not the turns themselves. That's a sensible mechanism; without it a long session would simply stop. But a summary compresses lossily and indiscriminately. It has no way to know that the conflict matrix derived four turns ago is going to be needed again in twenty turns, and no way to know that a throwaway aside about test flakiness never will be. Both get compressed with the same disregard, and past a certain point, one of them is just gone — not summarized-with-less-fidelity, but absent, as if it had never been reasoned through in the first place.

The failure mode this produces isn't the one people usually picture when they worry about context limits. It's not the model getting confused or losing the thread mid-task. The task kept going fine. What broke was continuity: the session's *later* self had no access to its *earlier* self's work, and no signal that anything had been lost, because from the inside, a session with no memory of a thing looks identical to a session that never had it.

## The conflict matrix, twice

Early in that session, the orchestrator built a full conflict matrix across every open branch: which branches touched which files, where the overlaps were, which conflicts looked mechanical and which looked like they'd need a judgment call. That matrix drove a good hour of dispatch decisions. Much later in the same session, after several rounds of sub-agent work and verification, it needed the matrix again — to double-check that a newly landed change hadn't introduced a fresh conflict with a branch still in flight.

It didn't have it. The turns that built the matrix the first time had already been folded into a summary that kept the conclusions relevant to what was happening *then*, not a general-purpose index of every branch's file overlaps. So it rebuilt the matrix from scratch: same branches, same diffs, same reasoning, arrived at independently a second time because the first arrival had no way to leave a trace anywhere the second attempt could find it. The rebuild wasn't wrong — it landed on the same answer — which is almost worse, because it means the work was fully redone for zero informational gain. That's the cost when it goes well. The version where the second derivation quietly disagrees with the first, and nothing flags the disagreement because nothing remembers there was a first, is the version that should worry you more.

## What actually survived

The same session produced a lot else worth having: the analysis that eventually caught a bad merge-conflict resolution before it reached main, architectural notes on features still in progress, several rounds of verification reasoning about why a given fix was actually sufficient. Almost none of that was retrievable by the end of the session on the strength of the conversation alone.

What was retrievable was exactly, and only, what had been written into the repository itself along the way — the project's guidance file, descriptions attached to the open branches, issue bodies, commit messages. Anything that had made it into one of those was there, durable, checkable, the same the next morning as it had been the moment it was written. Anything that existed only as reasoning inside a conversation turn was subject to the same silent compression as everything else, with no distinction drawn between a conclusion worth keeping and one that wasn't.

## The discipline this implies

The practical upshot is a habit I now take seriously: treat the conversation as scratch space, and the repository as the only real memory the project has. If a conclusion is worth having reached, it has to land somewhere durable — a doc, an issue, a description on a branch, a commit message — or, functionally, for every purpose that matters later, it never happened. Reaching a good conclusion inside a conversation and never writing it down is indistinguishable, from the outside and eventually from the inside too, from never having reached it.

That reframes what a project's guidance file is for. It's easy to treat it as onboarding material — the thing a new contributor, or a fresh agent session, reads once to get oriented. It's actually closer to the project's only long-term memory, in a system where every other form of memory gets silently and automatically discarded on a schedule nobody set on purpose. Writing to it isn't a chore adjacent to the real work. For a project run this way, it more or less *is* the real work, in the sense that it's the only part of a session's output that outlives the session.

There's a version of this that applies just as much to a solo human working alone across days, not sessions — a conclusion reached at 11pm and not written down is gone by the next morning too, for entirely mundane reasons. Agent sessions just make the discard mechanism visible and make it happen on a much shorter clock, which is what made it obvious enough to write a post about.

## Counterpoint: not everything deserves a commit

Taken too literally, "write it all down" is its own failure mode. Not every intermediate thought in a long session is worth externalizing, and a repository stuffed with every dead-end and half-formed idea a session ever had is worse than one with none of them — the signal-to-noise ratio drops until nobody, human or agent, can find the conclusion that actually matters inside the log of every conclusion that didn't. Externalizing has a cost too, in the same way verification has a cost in the routing story: every write is a thing someone later has to read, and read *through*, to find what's load-bearing.

The line I try to draw is whether a conclusion would change what a future session — mine or an agent's — does differently if it had access to it. The conflict matrix clears that bar easily; it's exactly the kind of thing a later turn in the same session needed and didn't have. A passing observation that a particular test took longer than expected on one run doesn't clear it, and writing that down would just be noise wearing the same format as a conclusion that mattered.

It's also not a substitute for the underlying fix, which is a session that's shorter, or better scoped, or checkpointed more deliberately in the first place. Writing durable notes about what a five-hour session concluded is a mitigation for the fact that the session ran five hours and summarized itself twice along the way. A differently-shaped orchestration — smaller sessions, explicit handoff points, a sub-agent dispatched with a narrow enough task that it never needs yesterday's context — reduces how much of this discipline you need to lean on in the first place. Both are legitimate; treating the write-it-down habit as sufficient on its own, without ever asking whether the session should have been shaped differently, just relocates the inefficiency instead of removing it.

## The test I use now

Before a long session moves on from a nontrivial conclusion, I now ask one question: if this session's context rolled over right now, would this conclusion survive anywhere else? If the honest answer is no, that's the signal to write it down before continuing, not after — waiting until the session feels done is exactly the point at which the earliest, and often most expensive, conclusions have already rolled off the edge.

The routing table in the last post and this habit are two instances of the same underlying rule. A verification budget exists because a report generated by a process is not the same as checking the process's actual output. A durable note exists for the same reason, one layer up: a conversation's account of what it concluded is not the same as the conclusion having landed anywhere a later session — or a later self — can actually find it. Nothing either of them produced was fake. It just didn't count, in the only sense that ends up mattering, until it was somewhere that would still be there tomorrow.

<!--
EDITING NOTES — delete this block before publishing.

Split out of "Routing Needs a Verification Budget," which originally carried this as a
second thesis under a section called "The other half: nothing survives a conversation."
That section covered the conflict-matrix-derived-twice incident in three paragraphs; this
post expands the same incident into its own full argument, with a counterpoint section and
closing test to match the shape of the other posts in this batch. No new facts beyond what
the routing draft already stated — the mechanism (context summarization discarding good and
bad reasoning alike) and the conflict-matrix example are both expansions of material already
established there, not new claims about the underlying session.

Drafted for readers with no access to the horrormovieseason.com repository, so the incident
is described in prose rather than linked. Written to stand alone — doesn't assume the reader
has read the routing post, though the closing section nods at it.

imgUrl/ogImage reuse the same placeholder image as the routing post, since this is split from
it. Per-post images are still to come for the whole batch.
-->
