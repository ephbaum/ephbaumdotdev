---
title: Test Tangential Development - TTD
postSlug: test-tangential-development-ttd
slug: test-tangential-development-ttd
pubDate: 02/11/2021 07:15 PM
imgUrl: "../../../../assets/img/ephbaum_dot_dev.png"
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description:
  Placeholder description for imported post from Ghost Blog
layout: ../../../../layouts/BlogPost.astro
---

We have all heard the [TDD Test-Driven Development](https://en.wikipedia.org/wiki/Test-driven_development). This is, of course, the Right Way™. I am certain that in the last decade or so I have heard TDD evangelized at least a couple times year during various conferences, meetups, podcast, talk tracks, etc.

Stop me if you've heard this one: "To demonstrate TDD, I'm going to create a \[Blog, TODO App, API Endpoint, [FizzBuzz](https://youtu.be/GoyAeom2f2k)\] using TDD!"

This is all well and good if you're building something you're well familiar with or is dead simple. Sure, with FizzBuzz you know what to expect, it's not deeply challenging. That's why people will ask you to whiteboard it during a job interview (that's a whole other topic of discussion though).

The problem with TDD is that it often seems to work best during certain optimal conditions:

*   You're building a very well known feature / system
*   What you're building has **extremely** clear requirements.

Stray too far outside of optimal conditions and TDD feels like it's just getting in your way.

Often in the engineering world you're under resourced and flying by the seat of your pants. You don't have an architect, business analyst, project manager, or anyone else available to provide you with bullet proof and extremely clear requirements. A common reality is that you are asked by _someone_ in the business to do _something_ to make a client happy. If you're lucky this thing hasn't already promised to the client with a timeline that is so woefully inaccurate as to possibly push the limits on your poker face when presented.

![In a room filled with flames and smoke an oblivious little dog in a hat sits at a table next to a coffee cup. The caption reads "This Is Fine". Grabbed from memgenerator.net](https://via.placeholder.com/400x300/cccccc/666666?text=This+Is+Fine)

This is fine.

Another common scenario might simply be trying to build a solution to overcome a difficult challenge of some kind. This could be something blocking critical functionality or a hard left an otherwise straight development path.

In these cases you are often doing an ugly form of rapid prototyping. Rapid prototyping, also known as the [spaghetti method](http://www.english-for-students.com/Spaghetti.html), is a process by which you try to make a thing using code very quickly so that you can test it and then either iterate or throw it away and start over depending on the results. (Please don't @ me, I'm just trying to keep this stupidly simple)

The difficulty in TDD here is that you may have literally no idea what to start testing. The testing itself becomes a blocker to your progress as opposed to the almost magical way of validating your expectations.

This is where I recommend what I call TTD - Test Tangential Development. This is where you start by doing, drag your testing along with you until you reach the point that can fill out your tests and use them to wrap up your development.

This may look something like this:

*   Build a controller that returns a response
*   Create a test that validates that response
*   Update the controller to _do something_
*   Then update your test to follow.

Doing this iteratively lets you keep falling back into your tests and continue to validate your progress as you go. Eventually, however, like any journey, your destination becomes clearer, you'll reach a point where you can let testing take the lead and drive.

I want to be absolutely clear: TDD is an extremely valuable tool and should be utilized. When it makes sense to so.

You just should't let yourself become get caught up in idea that you must utilize TDD from start to finish in every project. Testing is extremely important, if it wasn't we wouldn't keep talking about it. Important or not, however, don't let testing stand in the way of getting your work done. Instead, build rapport with testing, bring it along with you on your journey.

Find your TTD flow.

If you're doing it this way, you're fine. It works. <3
