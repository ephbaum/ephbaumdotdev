---
title: In Linux, Jobs are Useful!
postSlug: linux-jobs-are-useful
pubDate: 09/04/2021 08:14 PM
imgUrl: ../../../../assets/img/2021/09/42c24cb4f922b7dc9e6c089964d8079a36120830.jpeg
ogImage: ../../../../assets/img/2021/09/42c24cb4f922b7dc9e6c089964d8079a36120830.jpeg
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description:
  Placeholder description for imported post from Ghost Blog
---

![Featured Image](../../../../assets/img/2021/09/42c24cb4f922b7dc9e6c089964d8079a36120830.jpeg)

(This post has been in my partial drafts folder for some years... I'm finally trying to work through that backlog)

(Remind me, but at some point I need to describe the workflows I use with [NeoVim](https://neovim.io/) and [Oh my Zsh](https://ohmyz.sh/) for certain types of projects... bopping around zsh and opening files in nvim in some contexts while using [`Ctrp+p`](http://ctrlpvim.github.io/ctrlp.vim/) and [`NerdTree`](https://github.com/preservim/nerdtree) and other plugins to make `nvim` my IDE)

I've been a CLI ninja for most of my life, my early life on the command line was mostly cruising around DOS before I eventually found FreeBSD and Linux. But I started with a Tandy. I used Commodores and what not.

One of my favorite features of POSIX systems is the ability to make use of jobs for multi-tasking. Often I have seen other devs who, for a variety of reasons, may just not know their way around this functionality. I'll notice them `exit` from `mysql` when they will just be logging right back in, or `Ctrl+c` from some useful `tail -f` they're running and might want to get back to sooner or later.

If you're someone who has lamented the lack, or has simply been unaware, of multitasking in the terminal, please read on.

### A contrived example...

Let's talk about an SSH session on your test server and you're trying diagnose an issue.

In this case we're going to use use few simple commands to allow us to get some work done quickly without needing to open and close a bunch of applications repeatedly.

Here's the scenario: You've encountered a bug that only seems to be happening in your test environment. You've done everything you can to make sure that your local and test environments match.

Sure, you're using Docker to literally ship your local to production, yet here we are. ¯\_ (ツ)\_/¯

In this case you need to check some logs, probably search through them with `less` ([or something](https://www.brianstorti.com/stop-using-tail/)), access the database via `mysql`, and make some script changes in `vim` .

#### Enter [`jobs`](https://manned.org/jobs), [`bg`](https://manned.org/bg), and [`fg`](https://manned.org/fg)

Here's how it works.

Let's say you start with your log, you pipe the content into `less` and you've found a log that suggests that you might have an issue with a field type.

Press `Ctrl+z` to leave `less` in its current state. You should see:

    [1]+  Stopped                 less logfile.txt
    

Now you can open `mysql` and run a few queries to see that, strangely, it appears the data you expect is there, and perhaps you'd like to add some debugging to the running system, because you're a maverick, you dig all the way in.

Press `Ctrl+z` and again you'll see something like (don't do like this, is joke pseudo output):

    [1]+  Stopped                 mysql -u root -ppassword -h 127.0.0.1 -p 3306
    

And subsequently you open `nvim` and make some changes, and you `Ctrl+z` again.

    [1]+  Stopped                 less +F logfile.txt
    

Now, you have all these things chilling in the background, now what?

`jobs` will give you a list of these running jobs. For any of these that need to keep functioning in the background you can use `bg ${{job_id}}` .

But what about if you actually want to use the application again, now we use `fg ${{job_id}}` and that's it.

It's very easy to suspend and recall running systems and leave them in a state that you want them.

You can do that with multiple instances of a running application as well. You can open nvim for multiple codebases, maybe you need to open one instance for the front-end project code and have another for some api code.

TL;DR
-----

Linux provides for an excellent way of switching between applications through `jobs`, `bg`, and `fg` using `Ctrl+z` to suspend your currently running application as job.

Another slightly more in depth resource to describe these tools can be found on [here](https://www.redhat.com/sysadmin/jobs-bg-fg).
