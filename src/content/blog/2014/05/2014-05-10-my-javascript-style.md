---
title: (My) JavaScript Style
postSlug: my-javascript-style
slug: my-javascript-style
pubDate: 05/10/2014 05:40 PM
imgUrl: "../../../../assets/img/ephbaum_avatar_800_400.png"
author: Eph Baum
featured: false
draft: false
tags:
  - javascript
  - coding-style
  - best-practices
description: "When JavaScript style guides are as wild as the Wild West—establish your own coding conventions that actually work. A developer's personal style guide covering brackets, comments, variable declarations, and the eternal debate over single vs. double quotes in the JavaScript wilderness."
layout: ../../../../layouts/BlogPost.astro
---

There isn't exactly a style standard for JavaScript. [Douglas Crockford](http://en.wikipedia.org/wiki/Douglas_crockford) has a good [list of conventions](http://javascript.crockford.com/code.html). The [Google JavaScript Style Guide](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml) is an excellent resource and there's even a [styleguide from jQuery](http://contribute.jquery.org/style-guide/js/) that I'm not terribly fond of, especially because they so strongly recommend the use of double quotes over single quotes. However, since it seems that generally there are more standards than there are people using them. And they are almost never exactly what you want you to do as a developer. It's like the wild west. When it comes down to it, there are almost as many ways of styling JS as there are ways to write a function.

By way of example:

var myFunction = function ( parameter ) {
  console.log( parameter );
};

function myFunction ( parameter ) {
  console.log(parameter);
}

var someObject = {
                   myFunction: function( parameter ) {
                                 console.log( parameter );
                               }
                 };

var parameter = 'some value';
( function( parameter ) {
  console.log( parameter );
 would definitely have helped.

##### Block Comments:

/\*\*
 \* comment content goes here.
 \*\*/

/\*\*
 \* comment content goes here.
 \* another comment line goes here.
 \*\*/

For functions I use comments like so:

/\*\*
 \* @desc describes a function's function.
 \* @param \[object\] $paramName - description of the parameter and origin.
 \* @return \[bool\] - $variableName - describes the return and it's destination.
 \*\*/

##### Inline Comments:

Inline comments are insanely useful to me, but only when used correctly. I like to sprinkle them in through my methods and logic.

  if ( variable !== value ) {
    functionCall(); // this could be a good place for a comment
  } else if ( anotherVariable === aValue ) {
    // now something else should be commented on
    anotherFunctionCall(); // describe the reason for this.
                           // and if you need another line, it's nice to keep
                           // all of these together.
  }

##### Brackets & Parentheticals:

For all brackets and parentheticals that have content there's a preceding and trailing space for that content, except when embedded I will collapse the trailing spaces. Also, you will add a preceding space as well.

( 'content', 'more content', ( ( variable === true || variable === 'true' )))

{ name: 'value' }

For brackets containing complex values, new lines are used.

var varName = {
                key: 'value',
                additionalKey: false,
                arrayKey: \[
                            'containedValue',
                            'anotherValue',
                            42,
                            {
                              objectKey: 'content',
                              futherKey: 64
                            },
                            'stringOfSorts'
                          \]
                }

Please note that commas come at the end of the listed items.

##### Variable declarations.

When declaring variables, new objects and arrays and strings, I use a single var declaration and simple notation.

var stringVar = '',
    arrayVar = \[\],
    objectVar = {},
    booleanVar = false,
    $jquerySelecter = $( '.className' ),
    returnedVar = function( parameter );

This is much more readable then instantiating each type of object, `new Array()` or `new Object()` is so much messier than `[]` and `{}`. Again, note that I leave commas trailing each item.

##### if / else / else if

There's something you have to remember when it comes to these statements AUB. That's right, AUB (pronounced owb). Always Use Brackets.

if ( variable !== 'value' ) {
  // do something.
} else if ( variable === 'different value' ) {
  // do soemthing else.
} else {
  // finally do another thing.
}

### Fin?

This is more or less an overview of what I do. You should do what works for you and always remember that it's best to follow existing styles in the in which you're working.

It's easier to let Google's Style Guide close up this post :

> #### Parting Words

> BE CONSISTENT.

> If you're editing code, take a few minutes to look at the code around you and determine its style. If they use spaces around all their arithmetic operators, you should too. If their comments have little boxes of hash marks around them, make your comments have little boxes of hash marks around them too.

> The point of having style guidelines is to have a common vocabulary of coding so people can concentrate on what you're saying rather than on how you're saying it. We present global style rules here so people know the vocabulary, but local style is also important. If code you add to a file looks drastically different from the existing code around it, it throws readers out of their rhythm when they go to read it. Avoid this. |
