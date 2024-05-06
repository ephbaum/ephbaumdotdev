---
title: From Early Return in OOP to Control Flow in Elixir - A Transition Guide
postSlug: from-early-return-in-oop-to-control-flow-in-elixir-a-transition-guide
slug: from-early-return-in-oop-to-control-flow-in-elixir-a-transition-guide
pubDate: 10/17/2023 05:48 PM
imgUrl: ../../../../assets/img/2023/10/ea6aa6e6034a7824813a1267021269c4be1a9705.jpeg
ogImage: ../../../../assets/img/2023/10/ea6aa6e6034a7824813a1267021269c4be1a9705.jpeg
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description:
  Placeholder description for imported post from Ghost Blog
layout: ../../../../layouts/BlogPost.astro
---

![Featured Image](../../../../assets/img/2023/10/ea6aa6e6034a7824813a1267021269c4be1a9705.jpeg)

Introduction
------------

When transitioning from an Object-Oriented Programming (OOP) language like Java or Python to a Functional Programming (FP) language like Elixir, one of the first differences you may notice is the absence of a `return` keyword.

If you come from a PHP background, particularly with Laravel experience, transitioning to Elixir can be a paradigm shift. The "early return," a practice commonly used to handle exceptional or negative conditions without traversing through the entirety of a function. In this blog post, we'll discuss what early return is and how similar outcomes can be achieved in Elixir.

This came up recently in a conversation and I thought it might make a good blog post, so here we go:

The Value of Early Return
-------------------------

In PHP, and particularly in Laravel, early return is often employed to exit a function as soon as an exceptional or negative condition is met. This not only improves code readability but can also offer performance optimizations.

Consider the following PHP example:

    function validateInput(string $input): string
    {
        if (empty($input)) {
        	return "Input is empty";
        }
        
        // Additional validation logic
        return "Input is valid";
    } 

A contrived and simplistic example of the "Return Early Pattern"

In this example, the function returns immediately if the input is empty, preventing any further validation logic from executing. The alternative of returning later, after perhaps operating on the value, passing it through additional methods

Obviously this is a fairly simplistic and contrived example, but it illustrates how such a pattern doesn't quite make sense in the FP world of Eilxir.

The Elixir Way: No `return`, No Problem
---------------------------------------

In Elixir, functions don't have `return` statements, but there are alternative paradigms to achieve similar outcomes.

### 1\. Pattern Matching

Pattern matching can serve as a declarative way to specify different function behaviors based on input.

    def find_element([], _target), do: false 
    def find_element([head | tail], target) when head == target, do: true 
    def find_element([_ | tail], target), do: find_element(tail, target) 

Essentially overloading functions allows you to run only the logic that matches the pattern of the inputs.

Elixir trends toward conciseness in its functions, even when you're defining the same function for different cases.

To explain: the first clause is an "empty list" and matches when the list is empty. In this case `_target` is ignored since we must return `false` as there's no element to find. The second clause is "head matches target" when the first item of the list is a match to `target` the function simply stops recursing and returns true to the guard clause. The third clause is a "catch-all": If the head of the list doesn't match the target, this clause catches it. The `_` ignores the head of the list as it's not needed. The function then recurs with the remaining `tail` of the list to continue the search.

So in practice, Elixir will execute the clause that first matches the pattern and satisfies any guard clauses. This eliminates the need for an explicit `return` statement by leveraging pattern matching and recursion for flow control.

### 2\. Guard Clauses

Guard clauses enforce conditions right in the function signature, making the code clean and readable.

    def is_negative?(x) when x < 0, do: true
    def is_negative?(_), do: false

Here we check the value of `x` and if it's less than 0 you'll return true while the `_` "wildcard" placeholder will match anything not matched in the first clause and return `false`.

### 3\. `case` or `cond` Statements

When pattern matching and guard clauses are not sufficient, `case` or `cond` statements can offer more flexibility.

    def evaluate(x) do
      case x do
        x when x < 0 -> :negative
        x when x > 0 -> :positive
        _ -> :zero
      end
    end

    def evaluate(x) do
      cond do
        x < 0 -> :negative
        x > 0 -> :positive
        true -> :zero
      end
    end

These are, practically, the same constructs. Ultimately this code evaluates `x` and returns the appropriate atom result.

### 4\. Throw and Catch

Though less idiomatic in Elixir, `throw` and `catch` can be used for early exits in certain situations. This should be used sparingly, or not-at-all.

    def risky_operation(x) do
      try do
        if x == :dangerous_value do
          throw(:abort)
        end
        {:ok, x}
      catch
        :throw, :abort -> {:error, :aborted}
      end
    end

An example of throw / catch in Elixir - probably don't do this

The use of `throw` and `catch` in Elixir is generally considered non-idiomatic but can be useful for specific situations where you need an immediate, non-local exit from a deeply nested operation. It's similar in some ways to early return when you need to abort execution based on a particular condition.

While `throw` and `catch` offer a way to implement early return-like behavior, they should be used cautiously, as they can make the code harder to follow. Their use is often discouraged in favor of more idiomatic Elixir constructs like pattern matching, guard clauses, `case`, or `cond`.

Conclusion
----------

In summary, when transitioning from an object-oriented programming background with languages like PHP to a functional paradigm like Elixir, the concept of "early return" undergoes a shift. Rather than using explicit `return` statements, Elixir relies on pattern matching, guard clauses, and constructs like `case` and `cond` for flow control.

While this may initially seem unconventional, understanding and embracing these idiomatic Elixir practices can lead to more maintainable, readable, and idiomatic code. Additionally, these functional paradigms help to create code that's easier to test, debug, and reason about, since functions become more predictable and side-effect-free. They also align better with Elixir's core principles, which prioritize immutability and statelessness.

Although Elixir does offer constructs like `throw` and `catch` for non-local exits, these are generally reserved for exceptional cases and are considered non-idiomatic for typical control flow. By leaning into the native features of Elixir for managing control flow, developers can write more effective and idiomatic Elixir code.
