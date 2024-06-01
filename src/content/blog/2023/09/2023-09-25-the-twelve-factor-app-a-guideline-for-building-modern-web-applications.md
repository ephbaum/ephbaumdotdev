---
title: The Twelve-Factor App - A Guideline for Building Modern Web Applications
postSlug: the-twelve-factor-app
slug: the-twelve-factor-app
pubDate: 09/25/2023 08:02 PM
imgUrl: ../../../../assets/img/2023/09/cd8c55e9de1b081ebe023f3296caab0b2286501d.jpeg
ogImage: ../../../../assets/img/2023/09/cd8c55e9de1b081ebe023f3296caab0b2286501d.jpeg
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description:
  Placeholder description for imported post from Ghost Blog
layout: ../../../../layouts/BlogPost.astro
---

![Featured Image](../../../../assets/img/2023/09/cd8c55e9de1b081ebe023f3296caab0b2286501d.jpeg)

Introduction
------------

In the realm of software development, the [Twelve-Factor App](https://en.wikipedia.org/wiki/Twelve-Factor_App_methodology) methodology once garnered significant attention as a guide for building scalable, maintainable, and portable software-as-a-service applications.

I guess.

To be honest, I hadn't really thought about it specifically in some years until a recent job posting mentioned it alongside the [SOLID](/blog/thinking-srp-in-solid/) & [ACID](/blog/understanding-acid/) principles (etc.).

The methodology was crafted by engineers at Heroku with experience in meeting the intricate challenges that come with SaaS development. It outlines twelve principles or "factors" designed to be a blueprint for _modern_ web architectures.

I thought, given my lack of recollection, that writing an overview of these factors, explaining their significance and how they can be applied might be helpful for me.

Perhaps it will be helpful for you as well.

The Twelve Factors
------------------

### 1. Codebase

**Principle**: One codebase tracked in version control, multiple deploys

**Significance**: Having a single codebase ensures uniformity and ease of collaboration. Version control systems like Git enable tracking changes and coordinating work among multiple developers.

### 2. Dependencies

**Principle**: Explicitly declare and isolate dependencies

**Significance**: Dependencies should be explicitly declared to prevent any surprises during deployment or maintenance. This isolation simplifies troubleshooting and enhances portability.

### 3. Config

**Principle**: Store configuration in the environment

**Significance**: Configuration settings should be externalized from the codebase and read from the environment. This enables easy modification without code changes, providing flexibility in deployment.

### 4. Backing Services

**Principle**: Treat backing services as attached resources

**Significance**: Whether it's a database, a messaging queue, or a caching layer, backing services should be loosely coupled to the codebase. This allows for easy replacement and upgrades without affecting the application.

### 5. Build, Release, Run

**Principle**: Strictly separate build and run stages

**Significance**: The build, release, and run stages should be distinct to minimize errors and maximize deployability. This ensures that any change goes through a well-defined pipeline before it impacts users.

### 6. Processes

**Principle**: Execute the app as one or more stateless processes

**Significance**: Applications should be stateless to enable effortless scaling. State should be externalized to backing services like databases to maintain this statelessness.

### 7. Port Binding

**Principle**: Export services via port binding

**Significance**: Applications should be self-reliant, exposing services through binding to ports. This makes them easy to containerize and deploy using modern orchestration tools.

### 8. Concurrency

**Principle**: Scale out via the process model

**Significance**: Applications should be built to scale horizontally, meaning they can handle more traffic by adding more instances rather than upgrading a single instance's resources.

### 9. Disposability

**Principle**: Maximize robustness with fast startup and graceful shutdown

**Significance**: Applications should be designed to start quickly and shut down gracefully. This resilience enables seamless deployments and scaling operations.

### 10. Dev/Prod Parity

**Principle**: Keep development, staging, and production as similar as possible

**Significance**: A consistent environment across development, staging, and production minimizes surprises during deployment, making life easier for both developers and operations teams.

### 11. Logs

**Principle**: Treat logs as event streams

**Significance**: Logs should be viewed as a continuous stream of events rather than static files. This enables real-time monitoring and analysis.

### 12. Admin Processes

**Principle**: Run admin/management tasks as one-off processes

**Significance**: Administrative tasks, like database migrations, should be performed as one-off processes to ensure they are repeatable, auditable, and isolated from the application.

* * *

Conclusion
----------

The Twelve-Factor App methodology offers a set of best practices that aim to optimize various aspects of a web application, from codebase management to how configuration and logging are handled. Adopting these principles can dramatically improve the maintainability, scalability, and portability of your applications.

I realized, while reacquainting myself with this list, that these are _indeed_ best practices for web applications. While these are rather tailored specifically to a host like Heroku, they're still a good set of guidelines regardless of your cloud provider (for example, the job listing that triggered this post wanted familiarity with GCP and/or AWS).

👋
