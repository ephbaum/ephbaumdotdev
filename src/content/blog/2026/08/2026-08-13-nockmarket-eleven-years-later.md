---
title: "Nockmarket, Eleven Years Later"
postSlug: nockmarket-eleven-years-later
slug: nockmarket-eleven-years-later
pubDate: 08/13/2026 4:54 AM
imgUrl: "../../../../assets/img/ephbaum_avatar_800_400.png"
ogImage: "../../../../assets/img/ephbaum_avatar_800_400.png"
author: Eph Baum (w/ Claude)
featured: false
draft: true
tags:
  - ai
  - llm
  - legacy-code
  - nodejs
  - refactoring
  - technical-debt
description: "In 2014 I built a fake stock exchange from a Node.js book. I handed it to Opus 5 in 2026. The dead dependencies turned out to be the easy part."
layout: ../../../../layouts/BlogPost.astro
---

## — or — the repo was never the project

In April of 2014 I worked through _Jump Start Node.js_, a SitePoint book by Don Nguyen, and came out the other side with a thing called Nockmarket: a fake stock exchange bolted onto a portfolio app. A limit order book, five invented tickers, a signup form, a chat room. You could watch synthetic prices tick, buy some, and talk to whoever else happened to be connected at the same time — which, realistically, was nobody.

It ran on Node 0.8.8. The `package.json` also pinned npm to `1.1.49`, which tells you roughly everything about the era.

I enjoyed it more than I expected to. The book moves fast and glosses over things — Backbone.js turns up with almost no explanation of what you're signing yourself up for — but that's a reasonable trade for a book about getting started. So when the walkthrough ended I kept going. Upgraded some packages. Made the layout responsive. Poked at it.

The last commit on GitHub is dated January 12th, 2015. It says `Update README.md`.

## The repo was never the project

Here's the part I'd half-forgotten until I went looking.

Nockmarket didn't live on GitHub. It lived on Heroku. Heroku was the deploy target, `git push heroku` was the actual workflow, and GitHub was a second remote I kept in parity — right up until I didn't. At some point the parity stopped, and I just kept working against the thing that was actually running.

So a real amount of work went to Heroku and only Heroku. Fixes, adjustments, whatever I noticed while looking at the live app. None of it recorded anywhere I can now reach, because Heroku retired free dynos in November 2022 and those instances went with them. The README used to link a live demo at `fskirschbaum-nockmarket.herokuapp.com`. That link has pointed at nothing for years.

There is probably a working copy on an old machine in a closet. I'd give it even odds. But "probably, somewhere, on a drive I'd have to find and power on" is a different category of asset than "in version control," and after eleven years the honest accounting is that those changes are gone.

What survives is `master`: the point where I last bothered to push. Not where the project stopped. Just where the public record did. Every judgment anyone makes about that code — including everything below, including mine — is a judgment about the version I neglected, not the version I ran.

That's a strange thing to sit with. The repo isn't a record of the project. It's a record of my discipline about the repo.

## Handing it over

I've written before about [using LLMs for the tedious, systematic work](/blog/using-llms-to-audit-and-clean-up-your-codebase-a-real-world-example/) I never have the patience for, and more recently about [why I think the gap between what these tools are and what people assume they are](/blog/ai-or-slow-down/) is worth worrying about. Both of those are still what I think.

This was a different experiment. I pointed Opus 5 at Nockmarket and asked it to bring the thing back to life.

The interesting variable wasn't capability. It was context — specifically, the total absence of it. The model had no memory of writing this, no idea which parts I'd been proud of, no sense that the `BinaryHeap` implementation was the bit I'd found clever at the time. It read 48 files with no history attached to any of them.

I could not do that. I've never once looked at this code neutrally.

## It didn't run

First finding, and it took about a minute: the app did not start. Not "had problems." Did not start.

```js
var $ = require('jquery'),
  BinaryHeap = require('./BinaryHeap');
```

That's the top of `lib/exchange.js` — the matching engine. jQuery. Server-side. In 2014 you could `require('jquery')@1.7.3` in Node and get away with it; on Node 22 it throws at load. `lib/exchange.js` was required on the path to everything, so the process died before it printed anything.

Behind that, the usual stratigraphy: `express.createServer()`, removed in Express 3. MongoDB driver 1.0.2. socket.io 0.9. A Yahoo Finance CSV quote feed that Yahoo shut off in 2017.

None of that is interesting. That's just what happens. Leave anything outdoors for eleven years and it'll be full of leaves.

## The part that was interesting

The review turned up 35 defects. Most were the ordinary sort. Three were not, and all three had been there since the beginning — the code was never correct, and I never knew, because I was the only user and the numbers looked plausible.

Here's the worst one, in full, because it's the most legible.

```js
function isTrade() {
  var opp = cloned[getOpposite()].prices.peek();
  return BUY == orderType ? price >= opp : price <= opp;
}

var trade = isTrade();
var remainingVolume = volume;

if (trade) {
  // ...
  while (remainingVolume > 0 && Object.keys(oppBook.volumes).length > 0) {
    var bestOppPrice = oppBook.prices.peek();
    // fill against bestOppPrice — whatever bestOppPrice happens to be
  }
}
```

Look at where `isTrade()` gets called. Once. Before the loop. It checks the incoming order's limit against the best opposing price at that instant, stores the answer in `trade`, and then the fill loop runs to exhaustion without ever asking again.

The limit price is checked to decide *whether* to trade. It is never checked to decide *how far*.

Concretely: a BUY of 200 limited at 50, against asks resting at 49 and 55. `isTrade()` sees 50 >= 49, says yes. The loop fills 100 @ 49 — correct — then comes back around, takes the next best ask, and fills 100 @ 55. Five points through a limit that exists precisely to prevent that.

A limit order is a promise about the worst price you'll accept. This engine treated it as a suggestion about the first one.

And with the price simulator's clustered values, the two sides of the book sat close together constantly, so this didn't fire in some exotic edge case. It fired all the time. Which means any trade history the published version ever produced is partly fictional — not wrong in the sense of a rounding error, wrong in the sense of describing trades that should never have happened.

The other two, more briefly:

**Every trade was recorded one order late.** The loop kept the pre-order book in a local variable, reassigned the slot to the new book, then read `.trades` off the stale local. So each batch of trades that got persisted actually belonged to the *previous* order — and got stamped with the *next* order's side. Buys filed under sells, one step behind, forever.

**The "immutable clone" wasn't.** `createExchange()` did `$.extend(true, {}, exchangeData)` to snapshot the book. Deep copy, in theory. In practice it deep-copied the volumes map and copied the price heap **by reference**. Hold onto a snapshot and it silently desyncs from its own volumes: `peek()` returns a best bid the volumes map has no entry for, matching against it emits `{price, volume: undefined}`, and volume quietly disappears.

Which is the part I keep coming back to. That's the same jQuery import. The one dependency that killed the process on Node 22 was also, in 2014, the direct cause of the subtlest correctness bug in the whole thing. I pulled in a 90KB browser DOM library on the server to get one deep-clone helper, and the helper didn't do what I assumed it did.

## Testing the tests

The bit of process I'll actually take with me: the regression tests were not trusted on sight.

Each original bug was deliberately reintroduced into the new `src/`, and the suite was checked to make sure it *failed*. A regression test that passes when the bug is present isn't a regression test. It's decoration.

Two of them were decoration.

One asserted a structural interleaving that the bug happened to preserve, so it went green either way. The other compared against a value the buggy code itself had set — circular, and therefore always satisfied. Both looked completely reasonable in review. Both would have shipped as evidence of coverage they didn't provide.

What replaced them was an independent invariant, one the bug cannot satisfy no matter how it's implemented: *a buy at limit P can only ever fill at a price ≤ P*. That doesn't describe the code's behavior. It describes what a limit order means. The code either satisfies it or the code is wrong.

I'd have written the decorative version. I know I would have, because the decorative version is what "test that the fix works" naturally produces — you look at the fixed code and assert what it does. The move is to ignore the implementation entirely and assert the property that made it a bug in the first place.

## Where it landed

| | Before | After |
|---|---|---|
| Runtime | Node 0.8.8, CommonJS | Node 22, ES modules |
| HTTP | Express 2.5.8 | Express 5 |
| Database | mongodb 1.0.2 | driver 7, repository modules |
| Realtime | socket.io 0.9, hand-parsed cookies | socket.io 4, shared session middleware |
| Frontend | jQuery, Backbone, Underscore, vendored Bootstrap 3 | vanilla ES modules, Pico.css, native `<dialog>` |
| Passwords | unsalted MD5 | scrypt, upgraded transparently on login |
| Quotes | Yahoo CSV (dead since 2017) | pluggable provider, deterministic offline default |
| Ops | none | Docker Compose + MongoDB, GitHub Actions |

Roughly 11,000 insertions across 107 files, 19 commits, 207 tests that need neither a database nor a network to run. `docker compose up` and it works, no API keys, no `.env`. All 35 defects fixed; 24 carry a regression test.

The engine now lives in `src/order-book/` and imports nothing outside its own directory — not even Node builtins — with an ESLint boundary rule enforcing it. If I ever want it as a standalone package, that's a `git mv` and not a rewrite.

And one thing is honestly unverified: **no browser has loaded a page.** The frontend was rewritten and passes lint and static checks, and that is the entire extent of the evidence. It's in the PR in those words. I'd rather have the gap stated than papered over, and I'd rather state it here too, since the temptation in a post like this is to let "207 tests passing" imply more than it covers.

## What fresh context is actually good for

I want to be careful about the conclusion here, because there's an obvious triumphant version of it and I don't think it's the true one.

The model did not out-engineer me. Most of what it did was mechanical: swap dead APIs for live ones, replace MD5 with scrypt, containerize, write tests. Competent, fast, unglamorous. I could have done all of it, given a month of evenings I was never going to spend.

What it did that I couldn't was read `lib/exchange.js` without knowing it was mine.

Every time I'd looked at that file, I'd looked at it through 2014 — through remembering what it was supposed to do, through the walkthrough it came from, through a vague warm feeling about the binary heap. Familiarity gets described as an asset in this line of work, and often it is. It's also a filter, and the thing about a filter is that you can't see what it removes.

That's not a claim about intelligence. Fresh context is genuinely different from good judgment, and the same model that caught the limit-price bug also happily wrote two regression tests that tested nothing. The catch there wasn't cleverness either. It was process — reintroduce the bug, watch the test fail, don't take green for granted. [Useful and trustworthy still aren't the same thing](/blog/ai-or-slow-down/). The verification is where the value actually got created, and the verification is the part that stays mine.

## The part I can't fix

The modernization is done. The old code is preserved on `master` as an artifact and `main` is the trunk now.

But those Heroku fixes are still gone. I don't know what was in them. Some fraction was probably things this review just re-found and re-fixed eleven years later, which would be its own kind of joke. Some fraction was probably work that's simply lost.

The lesson isn't "keep your remotes in sync," though, sure, keep your remotes in sync. It's that I let the running instance be the source of truth, and running instances are rented. Heroku made a business decision in 2022 and my 2014 work evaporated with it. The repo, neglected as it was, is the only reason any of this still exists to write about.

Push to the boring remote. It's the one that's still going to be there.

---

_The modernization work in this post was done with Claude (Opus 5); the [pull request](https://github.com/ephbaum/nockmarket/pull/1) has the full defect list and the verification notes, including what didn't get verified. This post was drafted collaboratively and the judgments in it are mine._
