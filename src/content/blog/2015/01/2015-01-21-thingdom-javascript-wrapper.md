---
title: Thingdom JavaScript Wrapper
postSlug: thingdom-javascript-wrapper
slug: thingdom-javascript-wrapper
pubDate: 01/21/2015 04:00 PM
imgUrl: "../../../../assets/img/ephbaum_avatar_800_400.png"
author: Eph Baum
featured: false
draft: false
tags:
  - javascript
  - api
  - wrapper
  - integration
description: "From Arduino to WordPress—discover how Thingdom's JavaScript wrapper can mobile-enable any project in just four lines of code. A developer's guide to the IoT platform that connects everything from Raspberry Pi to web apps, complete with CodePen examples and real-world use cases."
layout: ../../../../layouts/BlogPost.astro
---

Of late I have been working working on several different projects in my day to day.

Our team has been pushing out the release of a new tool called [Thingdom](https://thingdom.io/) and I'd like to talk a bit about it and the JavaScript wrapper I worked on.

### What is Thingdom?

To (lazily) quote the [about](https://thingdom.io/about) page for Thingdom:

> We help developers add a mobile experience to their existing project in a fraction of the time it used to take. Whether you're a developer in a big company, or a small startup, we want to help you create a mobile experience in a matter of minutes no matter the language that you use.

That doesn't completely nail it down, but the essential nuts and bolts are there: With only a few lines of code and an afternoon you can 'mobile enable' almost anything so that it can update its status and send alerts to users on their mobile devices.

It's free for personal use and perfect for the hacker and maker folks because Thingdom can be used almost anywhere from Arduino & Raspberry Pi to Wordpress, or Ghost, or Beanstalk... you get the idea. If your product can talk to the Internet, it can probably talk to Thingdom and then it can be monitored by you or your users, as you see fit, from just about anywhere at any time.

#### Oh... But... WHAT IS IT?!?

The best way to understand exactly what Thingdom is and does is to see it in action. We've pushed hard to build an API that just works and create wrappers to help developers use Thingdom easily and without a lot of extra code.

We're sticking to our stated goal of 'Only Four Lines of Code' to integrate Thingdom with your own project.

The libraries for Thingdom are available on GitHub at the [ThingdomIO page](https://github.com/thingdomio), and there are some other examples and ideas for usage there and on the Thingdom site.

#### JavaScripts

I've had the opportunity to work on building out our [Thingdom-JS Library](https://github.com/thingdomio/thingdom-js) and a [simple example](http://codepen.io/fskirschbaum/pen/ZYeoyB/) for use on CodePen.io.

It's embeddable. Thingdom isn't hosted yet on any CDNs, so in the Pen it's called externally from another pen for demonstration purposes.

You can, however, include Thingdom-JS in your own project using `bower install thingdom-js` for [Bower](https://bower.io/) users and, of course, you can simply download it from the GitHub link above.

##### The Example:

To try out this example just walk through each step, one at a time, to see what's actually happening.

Part of the magic comes from installing the free Thingdom Mobile app from [iOS](https://itunes.apple.com/us/app/thingdom/id807761969?mt=8) or [Android](https://play.google.com/store/apps/details?id=com.thingdom.mobile). The example will prompt you.

See the Pen [thingdom-js example (light)](http://codepen.io/fskirschbaum/pen/ZYeoyB/) by F. Stephen Kirschbaum ([@fskirschbaum](http://codepen.io/fskirschbaum)) on [CodePen](http://codepen.io).

#### Did that Wow you?

Most of the people that I've shown this example to immediately start telling me of ways that Thingdom could be used for their own needs.

Some ways Thingdom is already being used include:

*   Health and Status Monitoring for Hydraulic Power Units
*   Remote Monitoring of, and interaction with, home security systems and other 'connected' devices.
*   Monitoring use of, and scores for, desktop and web applications and games
*   Notification of Comments and Sign-ups for Web Applications
*   Monitoring and notification of security issues for servers
*   And more...

Some things you can do with the JavaScript Library might include:

*   Capture form data without the need for any server side code
*   Monitor analytics of almost any kind
*   Get fast push notifications from users requesting help or sales contacts
*   And... more...

#### MOAR?!?

Here's some more links to resources you might find helpful if you want learn more about Thingdom:

*   [Thingdom FAQ](https://thingdom.io/faq)
*   [REST API Information](https://thingdom.io/rest) (Full Access to API Docs with Free Sign-up)
*   [Thingdom Developer's Portal](https://dev.thingdom.io/) (Free to Sign-up)
