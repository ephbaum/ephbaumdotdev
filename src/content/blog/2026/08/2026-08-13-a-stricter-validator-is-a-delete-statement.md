---
title: "A Stricter Validator Is a Delete Statement"
postSlug: a-stricter-validator-is-a-delete-statement
slug: a-stricter-validator-is-a-delete-statement
pubDate: 08/13/2026 9:45 AM
imgUrl: "../../../../assets/img/2025/10/horror-movie-season-homepage.png"
ogImage: "../../../../assets/img/2025/10/horror-movie-season-homepage.png"
author: Eph Baum (feat. Claude)
featured: false
draft: true
tags:
  - firebase
  - firestore
  - distributed-systems
  - data-integrity
  - architecture
description: "How a second, stricter implementation of the same rule turned normal-looking hardening into badge-deleting data loss in a solo-developer app."
layout: ../../../../layouts/BlogPost.astro
---

[Horror Movie Season](https://horrormovieseason.com) hands out badges — a three-day streak, a seven-day streak, a themed badge for a week of vampire movies, a challenge for thirty-one films in one October. I wrote about [building it](/blog/building-horror-movie-season-a-journey-in-ai-augmented-development/) last year. The detail I glossed over then is the one this post turns on: the browser writes straight to Firestore, with no backend API in between for normal writes.

That last part is what makes this story possible. Because the browser is the one writing, award badges are granted optimistically, client-side, the instant you qualify — no spinner, no round trip. And because I don't trust the browser with the final word, a Cloud Function trigger fires on every write to a movie document and re-validates that user's awards against a second, independent implementation of the same rules.

Two implementations of one rule, running on different machines, one of them holding delete authority over the other's output. That sentence is the whole postmortem. Everything below is just what happens when you don't notice you've built it.

## The trigger, and the sleep that should have worried me

Here's the relevant piece of the trigger:

```ts
export const validateAwardsOnMovieChange = onDocumentWritten('movies/{movieId}', async (event) => {
  // ...
  // Add a small delay to allow client-side optimistic update to complete
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const result = await validateUserAwards(movieData.userId);
  // ...
});
```

Read that comment literally: the server doesn't know when the client's write lands, so it waits two seconds and hopes. That's not a bug by itself — it's a coin flip about ordering, dressed up as a number. I'll defend it later. But notice what it implies: the server is going to act on the *result* of that race, and "act" here doesn't mean "flag" or "log." It means overwrite the user's `awardInstances` array with whatever the validation pass decides survives.

## A presence check wearing a correctness check's comment

For a long time, the streak-award half of that validation looked like this:

```ts
export function validateStreakAward(instance: AwardInstance): boolean {
    // Simplified: just check if the contributing movies form a valid streak
    return instance.contributingMovies.length > 0;
}
```

The comment describes consecutive-day checking. The code checks that an array is non-empty. It's a presence check wearing a correctness check's comment, and that phrasing matters more than it sounds like it should — a function that's honestly weak (`return true`) gets side-eyed the first time anyone reads it. A function whose comment claims more than it does gets skimmed and trusted. This one sat there passing review for a long time because the comment answered the question before anyone asked the code.

In practice it meant a badge claiming a thirty-one-day streak would pass validation as long as it carried at least one movie, real evidence or not.

## The bug that actually shipped

The browser-side code that builds a streak badge's "contributing movies" populated it with the user's *most recent* watched films. That's the right answer if the badge is about a streak that's currently running — the recent films are the streak. It's the wrong answer if the badge is about the user's all-time *longest* streak, which can be a run from weeks or months ago that has nothing to do with what they watched yesterday. In one specific shape of data, this produced an empty contributing-movies list for a streak badge.

An empty list is exactly the one thing the stub validator actually checked for. So the badge would appear on screen from the optimistic client write, survive for a couple of seconds, and then vanish when the trigger ran and found nothing to validate. Refresh the page, watch a movie, the badge reappears, and two seconds later it's gone again. Not a one-time loss — a flap.

## Why it flapped instead of just failing once

This is the part I find genuinely interesting, because it's not the obvious bug. The validation function did two things in one pass: it removed instances that failed the check, and then it ran fresh server-side detection to fill in anything the client had missed — a self-healing step, in theory. The self-healing step took as input the set of award types the user was *already considered to hold*, and skipped detecting any type already in that set, since these badges aren't meant to be re-granted redundantly.

The bug is in which list "already held" meant. It was computed from the award instances *before* the removal loop ran, not after. So an award type about to be revoked in this exact pass was still counted as "already held" when the detection step asked what to skip — and it skipped re-granting the very thing it had just deleted, even though the server had every piece of information it needed to build a correct replacement right there in the same function call. The fix and the damage happened in the same breath, and the fix lost.

Next write from the browser: no badge on the user's account, client optimistically grants it again (with the same broken evidence, because the client-side bug hadn't been touched), server revokes it two seconds later. Repeat indefinitely.

## The fix, and why the order of operations is the actual lesson

There's an unmerged branch that fixes this properly, and the order it does things in is the part worth internalizing more than any individual diff. It doesn't start by tightening the validator. It starts by fixing what the *producer* — the client — attaches as evidence, replacing "most recent N movies" with a shared function that locates the actual run of consecutive days a milestone can be traced to, identically on both sides. Only after that does it fix the self-healing step to compute "already held" from the *post-removal* survivors, so a revoked badge becomes eligible for correct re-detection in the same pass instead of waiting for the next write. Only *after both of those* does it strengthen `validateStreakAward` from a presence check into something that actually checks consecutive days.

Do those in the opposite order — strengthen the validator first — and you get the exact bug this post is about, just with better production values.

Two details from the tightened validator are worth calling out because they're the parts that keep it from immediately re-breaking:

- It caps the streak length it requires at the longest run the user's *movies actually contain*, rather than trusting the milestone number outright. The client is handed its streak counts from a stored field on the user's document and doesn't recompute them from the movie list; if that stored number is ever stale or inflated, an uncapped validator would revoke every honestly-computed badge on every single write, rebuilding the exact flap this post describes — with a stricter check as the cause instead of the cure.
- It allows one day of slack per gap between contributing days, because the client groups a "day" using the viewer's local timezone and the server trigger runs in UTC. A streak that straddles a daylight-saving transition can look, from the other side of that gap, like it has a one-day hole in it. Rejecting that would delete a badge that was earned honestly, purely as an artifact of which clock did the grouping.

## The general shape of the mistake

Strip away the movie badges and this is a claim I'd defend for any reconciliation job: **never give a reconciler unilateral delete authority over data it cannot re-derive.** If the reconciler can rebuild the record from source data, deletion is a correction — worst case, it's briefly wrong and then right again. If it can't rebuild it, deletion is destruction wearing a validation label, and the label is what makes it dangerous, because it reads as safe.

The fix order generalizes too, and it's the counterintuitive part: fix the producer first, make the reconciler capable of repairing what it removes second, and only then make it stricter. Tightening a check is normally the unambiguously safe direction to move — more scrutiny, fewer false positives slipping through. Here it's backwards, because the check's target holds delete authority and the two implementations of "is this streak real" were never fed the same inputs to begin with: one recomputes from raw movie data, the other used to receive precomputed streak numbers as arguments and just trusted them. Two functions that don't even see the same evidence were never going to agree by luck forever.

## Where I think the instinct to "just add validation" goes wrong

Optimistic UI itself isn't the mistake, and "never write optimistically" isn't the lesson here — instant feedback when you log a movie is genuinely worth having, and I'd keep it. The problem was never that the client acts first. It's that something downstream was allowed to delete the client's work without being able to replace it correctly in the same breath.

The weak stub validator is also not pure villain in this story. Its one real check — non-empty evidence — is precisely what turned a silent, permanent data-quality bug into a visible, reproducible flap. If it had been `return true` instead of a length check, the empty-evidence badges would have sat there forever, technically wrong and nobody the wiser. Weak validation surfaced the bug. No validation would have buried it. I'd rather have the flap.

And the two-second sleep, much as it invites mockery, was a reasonable call for a one-person project on a deadline. The real question it was dodging — who is authoritative when client and server writes race — doesn't get answered by a better timer. It gets answered by deciding, on purpose, which side wins and what the other side is allowed to do about it.

Not every reconciler should lose its delete authority, either. A cache invalidator that drops a stale entry is fine, because the source of truth is sitting right there to repopulate it from. The dividing line isn't "does this thing check for correctness" — it's whether what it's about to delete is derivable from something else you still have.

## The question I ask now

Before I let any reconciliation job run unattended against live data, I ask it one question: if this disagrees with whatever produced the data, what does it actually *do* — and can it rebuild what it's about to remove? If the honest answer is no, or "not yet," the underrated first move is to have it log the disagreement instead of acting on it. Watching a log of disagreements for a week is cheap. Watching users lose badges they earned is not, and it doesn't tell you anything a log wouldn't have told you first.

<!--
EDITING NOTES — delete this block before publishing.

Drafted in the horror_movie_season repo and moved here. Written for readers with no
access to that repository, so every bug and change is described in prose rather than
linked. The counterpoint section in each post is deliberate and load-bearing.

- "There's an unmerged branch that fixes this properly" is stale — the fix has merged. Shift to past tense.
- The fix-order argument (producer, then repair, then strictness) still holds and is the durable part of the post.

imgUrl/ogImage reuse the homepage screenshot from the intro post. Per-post images
are still to come.
-->
