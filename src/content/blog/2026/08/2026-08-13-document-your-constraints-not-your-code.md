---
title: "Document Your Constraints, Not Your Code"
postSlug: document-your-constraints-not-your-code
slug: document-your-constraints-not-your-code
pubDate: 08/13/2026 9:00 AM
imgUrl: "../../../../assets/img/2025/10/horror-movie-season-homepage.png"
ogImage: "../../../../assets/img/2025/10/horror-movie-season-homepage.png"
author: Eph Baum (feat. Claude)
featured: false
draft: true
tags:
  - firebase
  - documentation
  - software-engineering
  - ai-agents
  - solo-dev
description: "What survives a refactor isn't a comment explaining what the code does — it's a paragraph explaining what forced it to look that way."
layout: ../../../../layouts/BlogPost.astro
---

I maintain [Horror Movie Season](https://horrormovieseason.com) by myself — the SvelteKit-and-Firebase app I wrote about [building last year](/blog/building-horror-movie-season-a-journey-in-ai-augmented-development/). Nothing about the domain is complicated: you log horror movies, it counts streaks, it hands out badges. What's complicated, the way it always is, is the accumulated residue of decisions made under constraints no longer visible anywhere except in my head.

Or they were only in my head, until I started writing them down somewhere specific. This post is about that habit, why it matters more than the usual "keep your comments and docs current" advice, and where it can go wrong.

## The advice everyone gives, and why it's incomplete

The standard line is: comment your code, keep your README current, document as you go. It's not wrong, but it's aimed at the wrong target. Source code is already, by construction, a record of *what* the system does. You can read a function and know what it computes. You can read a Firestore security rule and know exactly which requests it permits. That information is recoverable — slowly, maybe, but recoverable — by reading the artifact itself.

What is not recoverable from the artifact is *why it has this shape instead of a more obvious one*. Which simpler alternative did I look at and reject, and for what reason? What external limitation — a platform's security model, a library's peer-dependency range, a race condition I hit in production — forced an odd-looking shape into existence? That reasoning lived entirely in my head at the moment I made the decision, and if I don't externalize it, it's gone the next time I need it. Usually that "next time" is me, eight months later, having forgotten my own reasoning as thoroughly as a stranger would have.

The stakes here are not abstract. Most damaging refactors I've seen — in my own projects and elsewhere — aren't caused by carelessness. They're caused by someone genuinely trying to be careful, looking at code that seems more complicated than it needs to be, and correctly failing to tell whether it's scar tissue (safe to clean up) or load-bearing structure (something a past decision encoded into the code's shape for a reason). That distinction is completely obvious at the moment the decision gets made. It is not obvious six months later, to a new contributor, or — increasingly relevant now — to an AI coding agent that picks up a repository with zero memory of any conversation that ever happened about it. A deliberate workaround and an accidental one produce byte-for-byte identical diffs. The only thing that tells them apart is a sentence somebody wrote down.

## Four examples from one project guidance file

I keep this project's guidance file — the document that orients anyone, human or AI, picking up the codebase cold — pretty terse, but a few sections are decent specimens of what I'm describing. Four of them, in particular, are the same underlying move wearing different clothes.

**The mirror that looks redundant but isn't.** The app keeps two representations of user data: a private `users` collection with everything (streaks, awards, privacy settings) and a `publicProfiles` collection that duplicates a small subset of those fields — display name, bio, a couple of visibility toggles. On its face this is the kind of duplication a code-quality pass would flag and someone unfamiliar with the constraint would "simplify" by deleting. The doc heads this off directly:

> `publicProfiles` is **not** redundant with `users`. Firestore security rules can't do field-level reads, so we can't let strangers read `users/{uid}.displayName` without also exposing streak/award/privacy internals.

That's the whole justification in two sentences, and it's airtight once you know it: the database's authorization model works at the document level, not the field level, so there is no rule you can write that says "let anyone read this one field of this private document." The only way to expose a safe subset is to maintain a second document that *is* that subset. Once you see the constraint, the "redundancy" stops looking like an oversight and starts looking like the only correct solution.

The doc doesn't stop at justifying the mirror — it names the actual risk it introduces (drift between the two copies) and the mechanism that prevents it: one list of mirrored field names, defined once, that every write path is required to route through rather than hand-copying fields. It also says, just as usefully, what's deliberately *not* mirrored: live-computed stats like total movie count and current streak, because a mirrored copy of a constantly-changing number is stale the instant someone logs a new movie. Leaving those out isn't an omission, it's the same constraint applied correctly in the other direction.

**A prohibition that explains itself.** Username uniqueness is enforced by a dedicated collection where the document ID literally is the claimed username — if the document exists, the name is taken. The doc says, flatly, never go back to the earlier approach of querying the `users` collection for a matching username field. On its own that's just an order to obey. What makes it followable is the reason attached: that approach required a blanket rule letting any authenticated user read every other user's private document, and it had a race condition where two people signing up at the same instant could both pass the "is this name free" check before either write actually landed, handing out the same username twice. A rule without a reason gets silently violated by someone convinced their case is the exception. A rule with a reason survives contact with someone smart.

**A dependency pin with its own expiration date.** The project deliberately holds a build tool at an older major version even though a newer one exists, and the reason is spelled out precisely: a specific linting tool's peer-dependency range doesn't accept the new major yet. Crucially, the note also states the condition under which the pin should be lifted — once that linting tool's peer range widens. That's the difference between a pin that gets revisited and one that calcifies into permanent superstition nobody remembers the origin of.

**A negative decision, recorded.** The project labels issues by complexity to route them to different model sizes for automated work. At one point there was a fifth label sitting between the two lowest tiers. It got removed, and the doc says so directly — it existed, it turned out to carry no actual routing difference from the tier below it, and it was retired, with an instruction not to reintroduce it. Documenting the *absence* of a thing is unusual and underrated: without that line, the next person staring at a gap between two tiers has no way to know whether nobody's gotten around to filling it, or whether it was tried and found pointless.

## The payoff, honestly reported

Here's the concrete evidence that this pays for itself. An AI coding agent picked up this codebase with no memory of any prior session — a cold start, same as a new hire's first morning. Working on my behalf, it did not do the thing I was half-expecting: it did not "simplify" the `publicProfiles` mirror down to a single collection. The reason it didn't is traceable directly to the paragraph explaining the field-level-read limitation. The constraint was written down where the decision was being made, so the decision got made correctly again, unattended. I want to be honest about the provenance here — I didn't watch every step of that session and hand-verify each choice; I'm reporting the outcome as I observed it, which is that the documented reasoning did the job it was written for.

## Where this breaks

I don't think this practice is free, and it's worth being specific about how it fails, because a post that only argues for its thesis is worth less than one that also argues against it.

Constraint docs rot, like any other documentation, except worse in one specific way: a stale comment describing behavior is usually caught quickly, because the behavior and the comment visibly disagree. A stale *reason* is much harder to catch, because nothing forces it to be re-checked against reality. If the underlying constraint disappears — the platform adds field-level security rules, the dependency range widens, whatever — and nobody deletes the now-obsolete justification, you've laundered a decision that used to be correct into an invariant nobody questions anymore, purely because it has an authoritative-sounding paragraph attached. A confidently wrong recorded reason is worse than no reason at all, because "no reason" at least invites someone to ask.

It also only works if the document gets read. A five-hundred-line guidance file that nobody, human or agent, actually opens before making changes is worse than no file, because it creates the appearance of institutional memory without the substance of it — someone assumes the reasoning was captured somewhere and stops asking the question themselves.

There's a real discipline cost to writing this material at the moment it's needed, too. The reasoning feels obvious right when you're making the decision — of course the mirror is necessary, why would I write that down — and "obvious to me right now" is exactly the trap, since it stops being obvious to anyone, including future me, within a few months.

Not every unusual-looking piece of code deserves a paragraph of justification, either. Write one for every slightly odd line and the file becomes unreadable, and the genuinely important constraints drown in noise. The threshold I try to use: write it down when you rejected a plausible-sounding alternative, or when the shape of the code looks wrong *on purpose*. If a reasonable engineer glancing at it would suggest the "obvious" fix, and that fix is wrong for a non-obvious reason, that's the case that earns the paragraph. Ordinary code that looks like ordinary code doesn't need a permanent record of why it's ordinary.

## Something to do tomorrow

Stripped of the philosophizing: the next time you write a workaround — code more roundabout than the "clean" version would be — stop for one minute and write down two things next to it. First, the alternative you considered and rejected, specifically enough that someone could reconstruct it. Second, the condition under which the workaround stops being necessary — a library version, a platform feature, a threshold — so whoever reads it later, including you, can check whether the constraint still holds, rather than inheriting it as gospel. That second part is the one people skip, and it's the one that keeps the first part honest.

<!--
EDITING NOTES — delete this block before publishing.

Drafted in the horror_movie_season repo and moved here. Written for readers with no
access to that repository, so every bug and change is described in prose rather than
linked. The counterpoint section in each post is deliberate and load-bearing.

- Body is as drafted; no known staleness against the current codebase.

imgUrl/ogImage reuse the homepage screenshot from the intro post. Per-post images
are still to come.
-->
