---
title: Initial Impression of Claude.ai
postSlug: initial-impression-of-claud-ai
slug: initial-impression-of-claud-ai
pubDate: 07/11/2023 10:15 PM
imgUrl: ../../../../assets/img/2023/07/c468f1f893fd4f2526e62a270ae6d520f0745297.jpeg
ogImage: ../../../../assets/img/2023/07/c468f1f893fd4f2526e62a270ae6d520f0745297.jpeg
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description:
  Placeholder description for imported post from Ghost Blog
layout: ../../../../layouts/BlogPost.astro
---

![Featured Image](../../../../assets/img/2023/07/c468f1f893fd4f2526e62a270ae6d520f0745297.jpeg)

Recently a friend introduced [Claude.ai](https://claude.ai/) from [Antrhopic](https://www.anthropic.com/) to our chat. I've not found myself with the correct combination of time, energy, interest, and motivation to get back to [my elxrBB project](https://github.com/ephbaum/elxrBB-tutorial), I still think about it, though, and would like to focus there, but it is hard when it feels like there's always something else vying for my attention.

Since it was on my mind this evening and I had a spare moment, [here's](#) (I'm not sure I trust their links yet 😅) a recent interaction I had with Claud.ai that I think was pretty positive over all. I gave it a couple of prompts and its results were less forthright and robust than what I'd experienced with ChatGPT / GPT4 for sure, but it's quick and seems like it will do well to let you drill deeper, I'd love to dig a little more on this one should more spare moments make themselves known.

Seems like a good project, I even noticed that they're [hiring](https://www.anthropic.com/careers) 🤔😅

###### Here is our first couple of exchanges:

> Could you help me build a BB forum software based on the elixir and phoenix framework

From Claude.ai:

Here are some tips for building a bulletin board (BB) forum software using Elixir and Phoenix:

Use Phoenix for the web framework. It comes batteries included with things like controllers, views, templating, etc.

Use Ecto for the database access layer. It integrates nicely with Phoenix and allows you to define schemas that map to database tables.

Use authentication plugs like Pow or Ueberauth for user signup/login.

Use Channels for any real-time/websocket functionality like showing active users or live notifications.

Structure the app into logical domains like Forums, Topics, Posts, Users. Keep the contexts separated.

For the forums themselves, have a Forum schema with has\_many topics. Then a Topic schema with has\_many posts.

Use associations and preloads to efficiently load associated records. Avoid N+1 query problems.

Use LiveView for interactive, real-time features like posting, commenting, editing.

Make use of Elixir GenServers for background jobs, scheduling, caching, etc.

Stick to conventions like RESTful routes and MVC patterns to keep it maintainable.

Write tests! Use ExUnit and Mox for unit and mocking. Cypress can help with E2E.

Consider using umbrella projects to break the app into isolated domains/contexts.

Deploy on a PAAS like Heroku, Gigalixir, or Render for easy scaling.

Let me know if you have any other specific questions!

> Let's write a step by step tutorial together

From Claude.ai:

Here is a step-by-step tutorial for building a bulletin board forum software with Elixir and Phoenix:

Set Up the Phoenix Framework
----------------------------

First, make sure Elixir and Phoenix are installed. Create a new Phoenix project:

    mix phx.new bbforum

Create the Database and Schemas
-------------------------------

We'll use Postgres for the database. Generate a User schema with name, email, password fields:

    mix ecto.gen.schema Users

Also generate Forums, Topics, and Posts schemas with appropriate fields.

Run the migrations to create the schema tables in the database.

Routes and Controllers
----------------------

Set up routes in `router.ex` for the main pages like home, forums index, user profiles.

Generate controllers for each resource using `mix phx.gen.controller`.

Have simple actions in controllers like `show`, `index`, `create`, etc.

Views and Templates
-------------------

Create templates for each controller action that will render HTML.

Use layouts to share a common header and footer.

Add User Authentication
-----------------------

Use Pow or another library for user registration and login.

Add registration and login forms.

Require login for certain pages using pipeline authentication.

Implement Forums and Topics
---------------------------

On the forums index, show all the forum categories and topics.

Allow logged in users to create new forums.

Each forum shows the topics, with pagination. Users can create topics.

Implement Posts
---------------

On each topic page, show all the posts. Logged in users can reply.

Use Ecto associations to easily fetch posts for a topic.

Order posts chronologically. Use markdown for formatting.

Real-Time Features
------------------

For real-time interaction, use Channels and LiveView. This powers live posts, notifications, online users list.

Implement those features by following Channel and LiveView examples.

Use WebSockets and processes for speed.

Testing
-------

Write test coverage for all features using ExUnit, Mox, and Cypress.

This ensures code quality and protects against regressions.

Deployment
----------

Configure a production SQL database. Deploy the app to Heroku, Gigalixir, or another Elixir PAAS.

Enable SSL. Configure the domain name. Launch the app!

This covers the major steps and features involved. Let me know if any part needs more explanation!

* * *

TBH - this is pretty slick, and I get the feeling that I could continue to work forward from here with even these simple prompts and come up with something that felt polished.

It _appears_ to me, based on my still limited experience with Elixir, to reference mostly accurate and modern references.

If ever I find some more of that mythical free time, I'll definitely possibly maybe focus on this (or whatever else might need my attention at that moment)

I'm sure by then this will be monetized, though 🤷
