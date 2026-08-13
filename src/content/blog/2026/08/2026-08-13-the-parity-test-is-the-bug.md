---
title: "The Parity Test Is the Bug"
postSlug: the-parity-test-is-the-bug
slug: the-parity-test-is-the-bug
pubDate: 08/13/2026 9:30 AM
imgUrl: "../../../../assets/img/2025/10/horror-movie-season-homepage.png"
ogImage: "../../../../assets/img/2025/10/horror-movie-season-homepage.png"
author: Eph Baum (feat. Claude)
featured: false
draft: true
tags:
  - firebase
  - testing
  - architecture
  - technical-debt
  - software-engineering
description: "When a test suite's job is proving two copies of a function agree, it's reporting a packaging problem, not providing safety — a case study from a solo-developer app."
layout: ../../../../layouts/BlogPost.astro
---

[Horror Movie Season](https://horrormovieseason.com) hands out badges: a three-day streak, a full 31-day run, five vampire movies in a week. I'm the only developer on it, and I wrote about [how it got built](/blog/building-horror-movie-season-a-journey-in-ai-augmented-development/) last year. Recently I spent a while fixing a bug in how those badges get their evidence attached, and the fix included something I want to talk about separately from the bug itself: a fixture file whose entire purpose is proving that two functions, living in two different parts of the codebase, compute the same answer.

That file is a good idea. It's also a symptom. Both things are true, and figuring out which one matters more is the actual question.

## Two copies of the same brain

The app is a SvelteKit static site backed by Firebase — Auth, Firestore, and Cloud Functions. Badges are evaluated twice. When you log a movie, the browser immediately checks whether you've earned anything and shows it to you — instant feedback, no round trip. A few seconds later, a Firestore trigger on the server re-runs the same checks against the same data and treats itself as authoritative: if the browser granted something the server's logic doesn't agree with, the server deletes it.

That means the award logic exists as two separate implementations: `src/lib/services/awards.ts` in the browser bundle, and `functions/src/awards.ts` in the deployed function. They are not thin wrappers around a shared core. They are two bodies of logic that happen to agree, by construction and by discipline, not by the compiler.

Some of what's duplicated is trivial — a `STREAK_MILESTONES` array of four numbers, easy to eyeball for drift. Some of it isn't. There's a function called `findStreakEvidence` that decides which specific movies get attached to a streak badge as "these are the ones that earned it" — it has to take one representative movie per calendar day, walk the days looking for consecutive runs, prefer a live run over an equally long historical one, and fall back to the longest run present if nothing reaches the milestone. That function is copied byte-for-byte between the two files. Theme detection — is this movie a vampire movie, a zombie movie, a slasher — is duplicated too, including the actual keyword and tag lists, which the project's own guidance file states outright "must stay in agreement." Nobody wrote that sentence for style. They wrote it because the alternative is exactly what happened before the fix I mentioned: the server-side validator was too strict, decided a legitimately-earned badge didn't have real evidence behind it, and quietly deleted it. Not a failed build. Not a red CI run. A badge a user actually earned, gone, with nothing in the product surfacing why.

That is the stakes of this particular duplication. It's not "the two files look different," it's "if they disagree, the failure mode is silent data loss in production."

## Why copy-paste was the right call

I want to be honest about this before I criticize it: sharing code across that boundary is not an import statement away. Firebase deploys the `functions/` directory as its own self-contained package — separate npm workspace, separate `tsconfig.json`, separate test runner, separate build. For the browser code to reuse a module from `functions/`, that module would need to become a real shared package that gets pulled into both the client bundle and the deploy artifact, or there'd need to be a bundler step stitching the two together, and either way it has to keep working with the emulator-backed integration tests that exercise the deployed function for real. That's not a five-minute refactor. Early on, with one function and a handful of award types, copy-pasting the logic was strictly cheaper than building that plumbing, and it was the correct call. I'd make it again.

## The mitigation: fixtures, not trust

The fix I actually shipped landed in a branch I haven't merged yet. Alongside correcting the evidence logic and the validator, it adds a file called `streakParityFixtures.ts` that lives under `functions/src/` but is deliberately excluded from the deployed function via a `tsconfig.json` exclusion — `"exclude": ["src/**/*.test.ts", "src/streakParityFixtures.ts"]`. It has no imports of its own; it's just typed data. Both test suites — the client's and the server's — import it and run their own implementation of `findStreakEvidence` against the same eleven cases, asserting the same expected output.

The eleven cases aren't arbitrary. They cover a historical streak that's lapsed sitting next to unrelated recent activity; the same movies fed in scrambled order, to confirm both sides sort before reading; a live streak beating an equally-long historical one; different milestones landing on different runs within the same movie list; a single calendar day holding six movies, which should count as one day of evidence, not six; two movies on the same day at different hours, to check that recency — not just the id tie-break — picks the representative; an inflated `longestStreak` value that has to gracefully truncate rather than invent evidence; two equal-length runs where recency should still win the tie; a full 31-day run sliced per milestone; already-earned milestones being correctly skipped; and the degenerate case of streak numbers with no movies behind them at all, which is supposed to fail validation rather than fabricate evidence. Several of those cases exist specifically because the two sides query Firestore *independently* — the client's read and the server's read aren't guaranteed to come back in the same order — so a stable sort with an explicit tie-break on document id is what keeps both implementations landing on the same movie when the raw ordering doesn't match.

That's a genuinely well-designed piece of test infrastructure. It's also, if I'm precise about what it does, a synchronization primitive sitting inside a test suite.

## The actual ledger

Here's the honest accounting, because "duplication bad" is a slogan and not an argument.

**What the duplication costs:** every change to award logic is now two edits, in two workspaces, in two languages of feel even if not of syntax — and the failure mode when someone (frequently me) misses the second edit is not a build failure. It's a support ticket, or worse, no ticket at all, just a badge that quietly isn't there anymore.

**What the fixtures cost:** real design effort, ongoing maintenance as the award system grows, and — this is the part that's easy to gloss over — they only prove agreement on the eleven inputs someone thought to write down. They are a *sample*, not a proof. A twelfth case nobody imagined can still diverge between the two implementations and the fixture file will stay green while it happens.

**What consolidation would cost:** real packaging work against a deploy model that actively wants the functions directory to be self-contained, plus the emulator-integration surface that has to keep passing.

The tipping point isn't a fixed line, but here's the shape of it: the fixtures are a fixed tax that grows every time the shared surface grows — a new award type, a new detection heuristic — while the thing they're protecting against (any possible future divergence) is unbounded and the thing they actually test (eleven specific cases) is bounded. That gap doesn't close on its own. It gets wider the more logic sits in the duplicated middle.

Stated more generally, because this pattern shows up outside award badges: **a test that asserts two implementations agree is a synchronization primitive, not a correctness check.** Its failure message is "these two things drifted," not "this behavior is wrong." I've seen the same shape elsewhere — golden files kept in lockstep between two renderers, a constant duplicated between a client and a server with a test asserting they're equal, an interface reimplemented in two languages behind a shared conformance suite. That last one deserves a carve-out: when the two implementations are in genuinely different languages and literally cannot import each other, a conformance suite isn't a workaround, it's the correct permanent architecture. The smell is specific to duplication that *could* be collapsed into one source of truth and hasn't been.

## The counterpoint, seriously

I don't think the fixtures were a mistake, and I want to resist the tidy narrative where the enlightened ending is "delete the duplication." A few things pull the other way:

The fixtures caught real things. The evidence bug that started all this — badges showing the wrong contributing movies, then getting revoked because the validator (correctly, it turns out) didn't believe the evidence — got fixed with those eleven cases as a harness making the fix safe to ship without babysitting production. Deleting the fixtures before consolidating the code would be strictly worse than leaving both in place.

"Just share the code" is a glib thing to say about a deploy boundary that's designed to resist exactly that. Anyone offering it as a one-line suggestion hasn't priced the actual packaging work, and in this codebase specifically, that price has been correctly deemed too high more than once.

And some duplication is on purpose. A fast path and a reference implementation that's slower but obviously correct is a legitimate design, and a conformance suite between them isn't technical debt — it's the point of having both.

## The test I'd apply to my own repo, and yours

If a test's failure message would read "these two things drifted" rather than "this behavior is wrong," that's worth pausing on. Ask whether the build system could make the drift structurally impossible — a shared package, a codegen step, a single source of truth compiled twice — rather than merely detected. Sometimes the honest answer is no, the packaging cost is real and the duplication stays, and in that case the parity suite is exactly the right tool and should stay too.

But if the answer is eventually yes, there's an ordering that matters: consolidate the logic first, and only then demote or delete the parity suite that used to guard it. Never the other way. A parity suite deleted before the duplication it was watching is gone is not a cleanup — it's the safety net removed one step early, on the assumption that everything under it has already landed.

<!--
EDITING NOTES — delete this block before publishing.

Drafted in the horror_movie_season repo and moved here. Written for readers with no
access to that repository, so every bug and change is described in prose rather than
linked. The counterpoint section in each post is deliberate and load-bearing.

- NEEDS THE MOST WORK. Written while the duplication was still live; it has since been consolidated.
- `streakParityFixtures.ts` no longer exists — it is now `shared/awards/streakEvidence.fixtures.ts`, an ordinary regression suite rather than a parity harness.
- "The fix I actually shipped landed in a branch I haven't merged yet" is stale; it merged.
- The ledger section prices consolidation as hypothetical future work. It happened — `shared/` compiles into both deploy targets. That is a stronger ending than the draft has: the post predicted the tipping point and then hit it.

imgUrl/ogImage reuse the homepage screenshot from the intro post. Per-post images
are still to come.
-->
