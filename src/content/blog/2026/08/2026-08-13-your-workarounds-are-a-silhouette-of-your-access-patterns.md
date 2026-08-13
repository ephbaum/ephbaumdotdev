---
title: "Your Workarounds Are a Silhouette of Your Access Patterns"
postSlug: your-workarounds-are-a-silhouette-of-your-access-patterns
slug: your-workarounds-are-a-silhouette-of-your-access-patterns
pubDate: 08/13/2026 9:15 AM
imgUrl: "../../../../assets/img/ephbaum_avatar_800_400.png"
ogImage: "../../../../assets/img/ephbaum_avatar_800_400.png"
author: Eph Baum (feat. Claude)
featured: false
draft: true
tags:
  - firestore
  - security-rules
  - architecture
  - solo-dev
  - nosql
description: "A solo dev's field notes from a browser-to-database app: three concessions to a document database's authorization model, and what they have in common."
layout: ../../../../layouts/BlogPost.astro
---

I've been building a small app for logging horror movies watched in October — watch streaks, award badges, public profiles you can opt into. It's a static SvelteKit site with no backend to speak of: Firebase Auth, Firestore, Storage, and a couple of Cloud Functions that only exist because two things need a hidden API key. Everything else is the browser talking straight to the database. There's no server process sitting between them deciding what's allowed — that job belongs entirely to a declarative rules file, about sixty lines long, that Firestore evaluates on every read and write.

That architecture is the whole story of this post. When authorization lives in rules instead of in server code, the database's opinions about *what a rule can even talk about* become your application's opinions too. And over the life of this project I've written three distinct workarounds to route around those opinions. For a while I filed them mentally under "things Firestore makes annoying." Then I noticed they don't scatter randomly across the codebase. They all sit at the same seam.

## The pattern, once you see it

A document database with row-level security rules is superb at answering one question: *is this document yours?* Every rule in my `firestore.rules` file is a variation on that check — compare `request.auth.uid` to a field on the document, allow or deny. It's fast, it's declarative, and for the 90% of this app that's genuinely per-user data — your movies, your streaks, your watchlist — it's exactly the right tool and I never think about it.

The workarounds all show up at the other 10%: the moment a rule needs to answer a question that isn't "is this yours," but "is this true about everyone," or "did you honestly earn this," or "does no one else already have this." The database has no primitive for those questions. So I built one, three separate times, in three separate ways.

**First: a mirror collection, to let a stranger read part of a document.** Public profiles need to show a viewer someone's display name and bio without also handing them that person's private streak data, award history, and privacy settings — all on the same `users` document. Firestore rules can't restrict a read to specific fields; the grant is all-or-nothing at the document level. So there's a second collection, `publicProfiles`, mirroring just the safe fields — username, display name, bio, profile picture, a few visibility toggles — and every code path that writes one of those fields to the private document must also project the same fields into the mirror, through one shared function that lists them exactly once. Login runs a reconciliation step that heals a mirror that's missing or drifted, and there's a standalone backfill script for accounts that never logged back in to trigger that healing. All of that — a second collection, a shared field list, a login-time healer, a batch script — exists to do what a column-level grant does in one line in a relational system. Notably, I did *not* mirror the stats a profile shows (total movies, current streak, award count): those get computed fresh from source on every view specifically so this apparatus can't make them stale. The mirror is only for fields with no live source to recompute from.

**Second: a registry collection, to get something SQL calls `UNIQUE`.** Usernames must be unique across every account. The rules language has no cross-document constraint — a rule can inspect the document being written, or documents it names by path, but it can't say "no other document anywhere has this value." My first pass queried the `users` collection for a matching username before allowing a signup, which required a blanket rule letting any signed-in user read any other user's private document just to run that check, and still had a race: two people could sign up with the same name at once, both pass the check before either write landed. The fix is a dedicated collection where the *document ID itself* is the username — a document existing at that ID means the name is taken, nothing to query. But claiming and releasing that document correctly now has to happen at three separate moments — signup, a rename (delete the old ID, create a new one, since document IDs can't be edited in place), and account deletion — each wrapped in a transaction so a half-finished claim can't corrupt the registry. There's a self-heal step at login for accounts created before this scheme existed, which quietly attempts to reclaim a missing entry and just logs a swallowed error if the name is now held by someone else. The rules for this collection deliberately have no `update` — a rename was never an update, it's delete-then-create — enforced as an explicit deny that a test asserts on directly, rather than left as an accident of omission.

**Third: a server-side trigger, to police a claim the client made about itself.** Award badges are granted the instant you log a qualifying movie, computed and written by the same browser session asking for the reward — instant feedback, no round trip. But that means the entity granting the award and the entity that would need to double-check it are the same actor, and a rule attached to that document can only ask "does this belong to the person writing it," which it always will. So a Cloud Function runs a couple of seconds after every movie write, independently recomputes whether the award logic actually holds, and deletes any instance that doesn't check out. Client and server run the *same* detection logic on paper, kept in sync by hand, because if the server is stricter than the client for even one award type, it starts quietly revoking a badge that was, from the user's point of view, honestly earned. A rule the owner can't self-enforce needs an authority that isn't the owner — and rules alone can't be that authority, because a rule only ever sees the document being written, never "recompute this from scratch and compare."

There's a smaller fourth tell, easy to miss: one query in the codebase deliberately skips sorting server-side and sorts the results in the browser instead, to avoid needing a composite index for a rarely-hit query shape. It's not a security workaround, but it's the same shape of concession — a capability the store doesn't offer for free, paid for with application code instead.

## What this isn't telling you to do

It would be easy to read three items like that as a case against the architecture, and I want to resist that reading, because I don't think it's true. This app runs real authentication, per-user private data, and opt-in public profiles, for free, with an authorization policy that fits in sixty lines and no server process to patch, monitor, or scale. That's a good trade for a project at this size, and none of the three workarounds above changed my mind about it. Denormalizing into a second collection so a read pattern is cheap and rules-expressible isn't a hack in a document database — it's the intended technique the whole model is built around. The mirror and the registry aren't scars; they're the correct, idiomatic response to a real constraint, and I'd write them again. Recognizing that a workaround was forced by the tool is not the same claim as saying the tool was the wrong choice. Nor is this a tier problem: a paid Firestore plan gives you more reads, more storage, more regions. It does not give you a column-level grant or a `UNIQUE` constraint at any price, because those aren't capacity — they're a different data model.

## The actual line, and where it points next

The line worth drawing isn't relational versus document, and it isn't free versus paid. It's **per-user data versus shared invariants.** Data with one owner — your movies, your streaks, your plan for next October — lives comfortably in a model where the only question a rule ever needs to answer is "is this yours." A fact that has to hold across more than one person's data at once — a name nobody else can also have, a badge that has to be independently true, a relationship between two accounts that both sides need to agree about — is a shared invariant, and a per-document rule engine structurally cannot enforce one, no matter how the rule is phrased.

That's the test I'd apply to a feature before building it, not after. Say I add following other users. A follow is inherently two-sided: your following list has to agree with their follower list, or the counts lie. If the browser writes both sides directly, from two documents with two rule checks that each only see the document in front of them, I haven't built a feature — I've pre-ordered a fourth mirror, with the same drift risk and the same reconciliation script waiting to be written once someone notices the counts don't match. The fix isn't a bigger database; it's routing that one write through a server function that owns both sides as a single transaction, while everything genuinely single-owner keeps going straight from browser to database as it does today. The split isn't "rebuild the backend" — it's "give the shared slice a place to live that isn't a rules file," and leave the rest alone.

## The diagnostic

If you want to run this on your own codebase, don't start by asking whether you're regretting your database. List the actual workarounds — the extra collections, the manual sync jobs, the "recompute and check later" triggers, the reconciliation scripts you wrote and now half-forget exist. For each one, ask what fact it's really trying to make true: is it "this belongs to exactly one owner," or is it a fact that has to hold *across* owners at once? If they cluster on the second kind, your database isn't wrong for the job — your application grew a feature that crosses a line the database was never going to enforce for you, and the fix is architectural, not a swap.

One tripwire worth naming plainly: if you catch yourself standing up a third precomputed, kept-in-sync-by-hand collection, stop and notice what you're actually building. You've stopped caching read-optimized copies of your own data and started hand-rolling a query planner, one denormalized table and one reconciliation job at a time. That's not a vibe, it's a count you can literally do — and it's the signal to move the invariant behind a server boundary before you write collection number four.

<!--
EDITING NOTES — delete this block before publishing.

Drafted in the horror_movie_season repo and moved here. Written for readers with no
access to that repository, so every bug and change is described in prose rather than
linked. The counterpoint section in each post is deliberate and load-bearing.

- The third workaround describes client/server award logic "kept in sync by hand". That is no longer true — both sides now call one implementation in `shared/awards`. Reword to past tense, or point at the consolidation as the resolution.

imgUrl/ogImage are the placeholder avatar. Swap in a real image before publishing.
-->
