---
title: Me - Add An Admin, Ghost - Oh, Actually I'm Broken
postSlug: me-add-an-admin-ghost-oh-actually-im-broken
slug: me-add-an-admin-ghost-oh-actually-im-broken
pubDate: 01/29/2023 04:12 PM
imgUrl: ../../../../assets/img/2023/01/9539bf1767a10c8cbe68daca41c4e1528b9cbead.jpeg
ogImage: ../../../../assets/img/2023/01/9539bf1767a10c8cbe68daca41c4e1528b9cbead.jpeg
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description:
  Placeholder description for imported post from Ghost Blog
layout: ../../../../layouts/BlogPost.astro
---

![Featured Image](../../../../assets/img/2023/01/9539bf1767a10c8cbe68daca41c4e1528b9cbead.jpeg)

I have more than one instance of ghost running right now and I'm learning about the folly of trying to run multiple Ghost Blog instances from a SysAdmin perspective for sure. Maintaining these damn things isn't challenging, but it's also not simple either. And, of course, my current state is largely

> My Own Fault™

I've been lazily handling these damn things, but it's really time I should probably should probably architect myself a more organized solution.

For now, though, I have one instance that's been plugging along just fine for a while, though it has been barking at me that it needs updated. It's on the most recent minor version of 4 but it wants the next major version of 5.

And the obnoxiously obvious banner at the top as been in the way for a hot minute, I'll be honest. But having recently (there's another blog post I'm not even done writing about this sitting in my drafts already) done that upgrade on a different server, I'd been hoping to put it off just a little bit longer until I had more time to focus on the aforementioned orchestration plans.

Today, however, I tried to take the audacious step of adding another administrator. For my efforts I was given an "Unknown Error" message:

> `Unknown error - TypeError, cannot save invite. copyError is not a function`

Which, frankly, isn't very user friendly.

A quick DuckDuckGo search query netted nothing in English but one [issue](https://github.com/JuanF998/Ghost_ABP_Kraken/issues/9) seemed to be similar enough.

A refresh of the page showed that something existed in the database because I could see a row on the page related to the invite.

Checking with the user I was inviting there had been no email, however.

Due to the fact that I'd made a few changes to this server since its inception and don't recall with perfect clarity all the changes (because I haven't been keeping the sorts of records I should out of laziness), I started poking around at config for the mailer and Mailgun settings as it seemed likely and I had a vague recollection of something similar on a different instance. I assumed there was an issue related to the settings I reset the Mailgun user password and updated the configuration and then did a restart of the instance.

That's when I started getting **502: Bad Gateway** from nginx.

So, now I'm on a journey I didn't intend to take and mildly annoyed.

Restarting the whole server didn't set things straight either.

Nginx logs say things like:

> `YYYY/MM/DD hh:mm:ss\[error\] nnn#nnn: *24 connect() failed (111: Connection refused) while connecting to upstream, client: xxx.xxx.xxx.xxx, server: example.com, request: "GET /favicon.ico HTTP/2.0", upstream: "http://xxx.xxx.xxx.xxx:xxxx/favicon.ico", host: "example.com", referrer: "https://example.com/"`

But when I check `ghost status`, I'm told:

> Status: running (production)

Checking the usual suspects I'm immediately seeing that the port listed in the status does not match the port in the nginx logs

:lightbulb:

So, now at least I have something to look into

A quick check of the `production.config.json` tells me that Ghost is running on the port in its configuration.

A quick check of the nginx configuration file tells me that it's definitely _not_ looking for the same port.

I'm confused, but the difference is 1 and I'm forced to suspect that it somehow was updated during my last upgrade of the minor version, but I'm honestly baffled and suspect it's possible I've forgotten something I did. Perhaps I even fat fingered the thing when I was updating that password, right?

No I need to get back to resolving that error when trying to add a user.

My current working theories are:

* the email configuration is borked
* it's related to an issue related to the previous upgrade work I did, or something boneheaded I've done (reasonable likelihood)
* it's related to an error, or possibly intended behavior, related to its wanted major version upgrade (possible)
* it's related to that incorrectly configured port (very unlikely)

My current plan is to:

Retry the action, observe the behavior, check the logs

Bingo:

> `[2023-01-29 23:43:51] WARN Error sending email: Failed to send email. Reason: Sending failed. Please check your email settings and resend the invitation.`  
> `[2023-01-29 23:43:51] ERROR "POST /ghost/api/admin/invites/" 500 1156ms`  
> `NAME: EmailError`  
> `MESSAGE: Error sending email: Failed to send email. Reason: Sending failed. Please check your email settings and resend the invitation.`

Which is followed by the stacktrace.

So, this error message is much clearer than what still appears in the browser:

> Unknown error - TypeError, cannot save invite. copyError is not a function

Email settings issue confirmed :successkid:

I guess it's time to dig into the mail settings, I suppose.

Ghost's documentation for Mailgun showed a property that didn't match what I had.

On my server, it was configured as:

```json
"transport": "Direct"
```

while their documentation directs:

```json
"transport": "SMTP"
```

A quick update of that property and a `ghost restart` and suddenly I was able to resend the email and all was at should be (expect that I still need to upgrade this site to the latest major version).

So, that's how I lost an afternoon to Ghost- one of these days I'll get things better orchestrated
