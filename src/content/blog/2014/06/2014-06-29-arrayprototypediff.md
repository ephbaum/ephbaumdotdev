---
title: Array.prototype.diff()
postSlug: array-prototype-diff
slug: array-prototype-diff
pubDate: 06/29/2014 07:30 PM
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

#### Update - 23 August 2014

A little [mea culpa](http://en.wiktionary.org/wiki/mea_culpa) follow up here... I had to write a [follow-up post](/blog/array-prototype-diff-followup/) that corrects something I missed here... [check it out](/blog/array-prototype-diff-followup/).

#### Original article continues

Sometimes in the day to day you find some problem that is just fun to try to solve without a [Google](https://lmgtfy.com) ([Stack Overflow](http://lmgtfy.com/?q=stackoverflow.com&l=1)) search.

Recently the problem I needed to solve was this:

I have a list of 'feed' items on a page where a long poll is watching for new 'feed' items to add to the DOM. In this case, really, all I want to do is highlight ANY feed item that is newly shown with a green highlight which then fades away.

In this case what I decided to do was 'diff' an array of 'feed' ids that have already been displayed with an array of ids that represents the items coming from the server. With a fixed number of items on both sides, 20, I know that I need to highlight anything that is new. It seemed to me that simply comparing the two arrays gives me the ids that I need to work with.

Here was my solution:

    
    Array.prototype.diff = function( arr ) { 
      return this.filter( 
        function( val ) { 
          return arr.indexOf( val ) < 0; 
        }); 
    };
    

Essentially what we're doing here is taking an Array and filtering it with the value of an element of another Array and spitting a new Array back out that tells me exactly what is different.

By way of example:

    var index = [ 14, 15, 16, 21, 28 ],
        newIndex = [ 15, 16, 21, 28, 29 ]; 
        
    var diffIndex = index.diff( newIndex ); 
    
    console.log( diffIndex ); 
    
    > [ 29] 
    
    var index2 = [ 1, 2, 3, '<3' ], 
        newIndex2 = [ 1, 2, 3 ]; 
        
    diffIndex2 = index2.diff( newIndex2 ); 
    
    console.log( diffIndex2 );
    
    > ['<3']
    

Did my example have to log out as less than three? Of course it did.
