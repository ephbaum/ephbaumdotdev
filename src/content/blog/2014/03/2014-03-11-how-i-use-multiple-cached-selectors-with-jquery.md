---
title: (How I) Use Multiple Cached Selectors with jQuery
postSlug: how-i-use-multiple-cached-selectors-with-jquery
pubDate: 03/11/2014 05:25 PM
imgUrl: "../../../../assets/img/ephbaum_dot_dev.png"
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description:
  Placeholder description for imported post from Ghost Blog
---

I am embarrassed to admit how often it really happens, but I frequently forget how to use multiple cached selectors with jQuery and usually just fire a quick Google search and then kick myself when I see a Stack Overflow post like [this one](http://stackoverflow.com/questions/8526226/jquery-how-to-use-multiple-cached-elements) and immediately remember how _I_ do this.

#### The _Two_ Methods

I am referring to is trying to select more than one element like this:

`$( '#main_content, #sub_header' )`

If you know what you're doing this should return an array with two DOM elements inside.

When using cached selectors, however, this doesn't work the same way:

`var $main_content = $( '#main_content' ), $sub_header = $( '#sub_header' );`

There are two ways that you can handled this. One of them is using the `.add()` method like this:

`$main_content.add( $sub_header )`

The problem here is that this is method is know to be pretty slow, so what's a better solution (even if speed doesn't _really_ matter)?

As you might have seen from the link I referenced above, this is what is often recommended:

    var $main_content = $( '#main_content' )[0], 
        $sub_header = $( '#sub_header' )[0]; 
    
    $( [ $main_content, $sub_header ] );

This works pretty well, but I feel like there are some pitfalls here worth keeping in mind.

##### Pitfalls?

I don't know if the term pitfalls is particularly accurate. Perhaps they're more potential 'gotchas' that I worry about. First, this recommend method relies on knowing for certain that you'll only ever get one element to match in your cached selector. If you're matching multiple elements you're simply excluding all but the first when actually defiing the variable.

The other concern I have depends on how else you may intend to use these selectors. If you want to use this selector on its own for chaining, for example, this notation will at best be an annoyance to readability and semantics and at worst may behave in a way you wouldn't expect.

This:

`$( '#main_content' )[0].removeAttr( 'style' )`

may not behave identically to this:

`$( '#main_content' ).removeAttr( 'style' );`

Actually, it probably will, but I am meaning more complicated chains and methods and scoping that could become a nightmare.

##### What do I do?

Well, I'm glad you asked me that because that's the exact reason why I am writing this post!

What I do is a little different but I think makes a great deal more sense to me. Perhaps I'm an idiot and would love to hear how.

Until I do, however, I'll do this:

    var $main_content = $( '#main_content' ),
        $sub_header = $( '#sub_header' ); 
    
    $main_content.removeAttr( 'style' ); 
    
    $( [ $main_content[0], $sub_header[0] ] ).fadeIn( 'fast' );

Did you see that? What I did? Yeah, it's minor, but makes an enormous amount of sense in the end.

That's it for now. See you next time!
