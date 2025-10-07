---
title: How PHP 5.4's Closure - -bind Saved me From Reflection
postSlug: closure-bind-not-reflection
slug: closure-bind-not-reflection
pubDate: 06/15/2015 06:00 PM
imgUrl: "../../../../assets/img/ephbaum_dot_dev.png"
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description: "When you need to access private properties but Reflection feels 'ooky'—discover how PHP 5.4's Closure::bind() provides a lightweight alternative. A practical solution for accessing private class members without the complexity of Reflection, complete with real-world Laravel examples."
layout: ../../../../layouts/BlogPost.astro
---

A few weeks ago I was faced with a problem: I needed to access private variables within a Library class in our Laravel 4 based web application. The library we're using, installed with Composer, did not offer a way to access any of its properties, instead it offered two public methods that simply returned concatenated private variable strings. I needed only one of the two elements.

As an example, it looked a bit like this:

    class Library  
    {
      private $privateProperty1 = "value1";
      private $privateProperty2 = "value2";
      public function returnConcatProps()
      {
       return 'The private properties are: '.
               $this->privateProperty1 . ' ' .
               $this->privateProperty2;
      }
    }
    
    $lib = new Library();
    echo $lib->returnConcatProps() . "\n";
    
    echo $lib->privateProperty1;  
    

In this case, if you try to access those private properties of the Library class:

![Private means private!](https://web.archive.org/web/20160326152724im_/http://phantombear.net/content/images/2015/07/library_errors_out.png)

Extending the class isn't possible as it would still leave the properties I needed unavailable, and modifying directly wouldn't work as an update in the future would overwrite the changes. The only way to get at these properties historically is to use Reflection.

This, to me, didn't seem right for a few reasons. It feels, and I'm using a technical term here, ooky. Also, if you check out the documentation for the Reflection class in PHP, it says:

> Introduction

> PHP 5 comes with a complete reflection API that adds the ability to reverse-engineer classes, interfaces, functions, methods and extensions. Additionally, the reflection API offers ways to retrieve doc comments for functions, classes and methods.

> Please note that certain parts of the internal API are missing the necessary code to work with the Reflection extension. E.g., an internal PHP class might be missing reflection data for properties. These few cases are considered bugs, however, so they should be discovered and fixed.

Using Reflection in this case, while something that would have likely accomplished my goal, seemed rather kludgy.

I won't lie, I've still not quite been able to fully grok the purpose behind the Reflection class, exactly. It allows you to modify / access code during runtime. That is not what I want in this case.

Meanwhile, in PHP 5.4, Closure::bind has been introduced. It is light weight and does exactly what I need using a simple closure.

Here's an example of how it looks:

    <?php  
      class Library
      {
        private $privateProperty1 = "value1";
        private $privateProperty2 = "value2";
        public function returnConcatProps()
        {
         return 'The private properties are: '.
                 $this->privateProperty1 . ' ' .
                 $this->privateProperty2;
        }
      }
    
      $lib = new Library();
      echo $lib->returnConcatProps() . "\n";
    
      class MyClass
      {
        public function getPrivatePropertyOneFromLibrary()
        {
          $lib = new Library();
          $closure = function( Library $library ) {
             return $library->privateProperty1;
          };
          $bind = Closure::bind( $closure, null, $lib );
          return $bind( $lib );
        }
    
        public function getPrivatePropertyTwoFromLibrary()
        {
          $lib = new Library();
    
          $closure = function( Library $library ) {
             return $library->privateProperty2;
          };
    
          $bind = Closure::bind( $closure, null, $lib );
          return $bind( $lib );
        }
      }
    
      $class = new MyClass();
    
      echo $class->getPrivatePropertyOneFromLibrary() . "\n";
      echo $class->getPrivatePropertyTwoFromLibrary() . "\n";
    ?>
    

![Showing the private goodies!](https://web.archive.org/web/20160326152724im_/http://phantombear.net/content/images/2015/07/closure_bind_example.png)

That's that. With Closure::bind() I can essentially 'extend' any class, accessing their private properties, using PHP's native Closure class and anonymous functions.
