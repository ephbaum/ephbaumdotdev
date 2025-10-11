---
title: Array.prototype.diff(meaCulpa)
postSlug: array-prototype-diff-meaculpa
slug: array-prototype-diff-meaculpa
pubDate: 08/23/2014 08:45 PM
imgUrl: "../../../../assets/img/ephbaum_avatar_800_400.png"
author: Eph Baum
featured: false
draft: false
tags:
  - javascript
  - arrays
  - prototype
  - follow-up
description: "When extending JavaScript's core functionality goes wrong—learn from the Array.prototype.diff() mea culpa. A follow-up to the original diff method that adds proper type checking with instanceof, because sometimes you need to watch your data types more carefully."
layout: ../../../../layouts/BlogPost.astro
---

So, it turns out that when you go off all half-cocked all willy-nilly extending a core functionality of JavaScript it's bound to result in a hiccup now and then.

It was, then, a few days after posting about my [new 'diff' function](/blog/array-prototype-diff/) that I found my JavaScript choking on exactly that function. It turns out that the issue was that I wasn't watching my data types carefully enough.

The solution? Simply watch what you're doing!

    Array.prototype.diff = function( a ) { 
      if ( a instanceof Array && this instanceof Array) { 
        return this.filter( function( i ) { 
          return a.indexOf( i ) < 0; 
        }); 
      } else { 
        return new Array(); 
      } 
    };
    

At this point we're doing the EXACT same thing that we had been doing before except prior to comparing the two arrays, we check to make sure that they _are_ both actually arrays using `instanceof`, as you can see above.

You'll see that the `else` now simply returns an empty array if they're not both arrays. This solution works for me but you _could_ definitely do quite a bit more with this if you felt it was warranted.
