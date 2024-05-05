---
title: WTF is Idiomatic
postSlug: wtf-is-idiomatic
pubDate: 10/27/2023 09:50 PM
imgUrl: ../../../../assets/img/2023/10/9bb3bcf4aa82f34aebae411aba3cd416e9ccd341.jpeg
ogImage: ../../../../assets/img/2023/10/9bb3bcf4aa82f34aebae411aba3cd416e9ccd341.jpeg
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description:
  Placeholder description for imported post from Ghost Blog
---

![Featured Image](../../../../assets/img/2023/10/9bb3bcf4aa82f34aebae411aba3cd416e9ccd341.jpeg)

In a recent post I used the word "idiomatic" more than once and had to make sure I was using right. Then, someone asked me what the hell it meant so I figured others might also wonder what it means and figured I'd write another post about it because content, right?

In the context of programming, "idiomatic" refers to code that follows the practices, patterns, and conventions of a particular language. Writing idiomatic code usually results in more readable, efficient, and maintainable code. It aligns with the language's philosophy and leverages its unique features.

On the other hand, "non-idiomatic" code can often resemble "writing Language A in the style of Language B." For example, using `throw` and `catch` for control flow in Elixir could be considered non-idiomatic because Elixir, being a functional programming language, prefers other constructs like pattern matching, guard clauses, `case`, and `cond` for handling various conditions and branching logic.

### Idiomatic Elixir Examples:

**Pattern Matching:**

    def calculate_area({:circle, radius}) do
      :math.pi() * radius * radius
    end
    

**Guard Clauses:**

    def is_even?(n) when rem(n, 2) == 0, do: true
    def is_even?(_), do: false
    

### Non-Idiomatic Elixir Examples:

**Throw/Catch for Control Flow:**

    try do
      if some_condition do
        throw(:abort)
      end
    catch
      :throw, :abort -> :error
    end
    

**Imperative Style Loops:**

    # Using recursion to mimic a 'for' loop, instead of using Enum.map/2, Enum.reduce/2, etc.
    

By adhering to idiomatic practices, you embrace the strengths and paradigms of the language, making it easier for others who are familiar with the language to understand and contribute to your code.

I hope this helps clarify the terms "idiomatic" and "non-idiomatic" in the context of Elixir or any programming language.
