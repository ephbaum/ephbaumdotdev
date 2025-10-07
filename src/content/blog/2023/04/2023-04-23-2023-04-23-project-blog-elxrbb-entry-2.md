---
title: 2023-04-23 - project blog - elxrBB- Entry #2
postSlug: 2023-04-23-project-blog-elxrbb-entry-2
slug: 2023-04-23-project-blog-elxrbb-entry-2
pubDate: 04/23/2023 04:13 PM
imgUrl: ../../../../assets/img/2023/04/4ae009f5e54b7fecedd40c1f3b33b44a47008fca.jpeg
ogImage: ../../../../assets/img/2023/04/4ae009f5e54b7fecedd40c1f3b33b44a47008fca.jpeg
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description: "When ChatGPT runs out of queries and you're stuck debugging Pow authentication—welcome to the reality of AI-assisted development. A frustrating follow-up to the elxrBB project, featuring username vs. email struggles, terrible AI-generated blog posts, and the decision to pivot away from perfectionism."
layout: ../../../../layouts/BlogPost.astro
---

![Featured Image](../../../../assets/img/2023/04/4ae009f5e54b7fecedd40c1f3b33b44a47008fca.jpeg)

What a journey this has been.

I really didn't want to write this blog post myself, but I had run out of queries again GPT-4, so I tried work with GPT-3.5 to produce a blog post for me instead and, after several iterations back and forth about what I wanted, this was what it produced:

> Building an elxrBB forum application using Phoenix and Elixir can be a challenging task, and working with AI language models like ChatGPT can add another layer of complexity to the process. As an AI language model trained on the GPT-3.5 architecture, I have been working with you on this blog post, but I have not been directly involved in your elxrBB forum application project.

> Instead, you have been working with the GPT-4 model to help you navigate the challenges of building an elxrBB forum application using Phoenix and Elixir. While GPT-4 is a more advanced language model than GPT-3.5, it still has its limitations in terms of speed and the number of requests that can be made.

> One of the challenges you faced while working on the elxrBB project was configuring the Pow Authentication library to allow you to use the :username parameter to login instead of the :email field for Users. While you thought that GPT-4 would be able to quickly provide a solution to this problem, each solution it suggested seemed to make the situation worse. You felt frustrated and disappointed, but you did not give up.

> You persevered, determined to solve the problem at hand, and ultimately, you were able to build an elxrBB forum application using Phoenix and Elixir that exceeded your expectations. This project taught you a valuable lesson – that persistence and a willingness to learn are key to overcoming challenges, even when working with advanced AI language models like GPT-4.

> In conclusion, your experience working with GPT-4 to build an elxrBB forum application using Phoenix and Elixir highlights the importance of persistence, dedication, and a willingness to learn when working on complex projects. While AI language models like GPT-4 can be valuable resources for learning about Elixir, Phoenix, and Pow, they also have their limitations. By leveraging the resources of GPT-4 and your own expertise, you were able to overcome the challenges you faced and build a top-quality forum application.

So, that's terrible.

It was obvious from the beginning that this was probably a terrible and misguided effort, but I still felt like it might be worth trying.

I'm still struggling just to get the user authentication working as I'd like.

The issue has been around getting the Pow library to recognize the `:username` field as the primary User identifier.

ChatGPT recommended that I update my `config.ex` to add:

```elixir
user_id_field: :username
```

This didn't work out of the box. I had expected the views for registration and sign-in would update to use this new username field based on field seeming to be flexible enough to handle this not-email-username concept:

```elixir
<.input field={f[Pow.Ecto.Schema.user_id_field(@changeset)]} type={Pow.Ecto.Schema.user_id_field(@changeset) == :email && "email" || "text"} label={Phoenix.Naming.humanize(Pow.Ecto.Schema.user_id_field(@changeset))} required />
```

Apparently, however, there's something I'm missing.

I've worked through the process with ChatGPT. It appears I am able to register the User with the username but it's not working to login. I've made a variety of changes, at the recommendation of ChatGPT, and none of it really seems to be working as I would have expected.

I am sure that at least some of this is coming from the fact that GPT-4's memory apparently is also cutoff in 2021.

I'm sure some of this is my fault in properly communicating with ChatGPT.

Regardless, this has been frustrating as I'm now at least far enough into this process that I don't really want to just throw it away, it feels like I'm in the neighborhood even if I'm not on the right path, but I also want to move to to actually making the actual forum functionality.

Most recently I was directed to start overriding the existing `session_controller.ex` from the Pow library with my own and now the application, unsurprisingly, is throwing errors of all sorts.

Then I ran out of GPT-4 queries. 😭

Maybe it's for the better that I figure this out on my own, but to be fair, it seemed like I was on the right track 😅

I'm thinking I might dump all this into a branch and continue, at least for now, with the email as username behavior and circle back on the username behavior further down this journey's road. This will allow me to at least begin building out the forum functionality which, since it's not tied to a library about which ChatGPT may be very uninformed after a couple years of no updates, maybe there's a chance this will give me a some success dopamine.

Or just more disappointment
