---
title: Iteration v. Recursion
postSlug: iteration-v-recursion
slug: iteration-v-recursion
pubDate: 06/24/2023 01:13 PM
imgUrl: ../../../../assets/img/2023/06/5890503802e344127555580131845016b7758057.jpeg
ogImage: ../../../../assets/img/2023/06/5890503802e344127555580131845016b7758057.jpeg
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description: "For loops vs. function calls that call themselves—when should you choose iteration over recursion? A practical guide to understanding these fundamental programming concepts with real examples, performance considerations, and when each approach shines."
layout: ../../../../layouts/BlogPost.astro
---

![Featured Image](../../../../assets/img/2023/06/5890503802e344127555580131845016b7758057.jpeg)

I was chatting recently with another engineer who was sharing  their desire to have started working through [leetcode](https://leetcode.com/) problems sooner in their career. They, having recently been let go from their gig, like so many folks I know, are working toward leveling up while on the hunt for their next job.

During our conversation I was asked:

> Would you say that anything that is iterative is essentially recursive?

My response was:

> Not exactly but this feels like a blog post… 😅  
> While you could say that every problem you can solve iteratively can technically be solved using recursion, there are important distinctions between the two

So now I'm writing a blog post about this topic, I guess 😂

What is Iteration?
------------------

Iteration, in the context of programming, is the repetition of a process within a computer program to generate an outcome. This can be accomplished using various control structures, such as 'for', 'while', and 'do-while' loops.

For instance, consider the problem of adding all the numbers in an array. An iterative solution might start with a variable set to zero, loop through each element in the array, and add that element's value to the variable. The loop repeats until it has processed every element in the array.

The advantage of iterative solutions is their efficiency, especially in terms of memory. Because they update the current state directly and don't have to keep track of multiple layers of function calls, iterative solutions often use less memory than their recursive counterparts. The word _often_ is doing some work here, and I'm sure I might catch hell for using it, but I believe it's apt.

What is Recursion?
------------------

Recursion is a method where the solution to a problem depends on smaller instances of the same problem. Essentially, a recursive function calls itself with a different argument until it reaches a base case — a condition where it can return a result without any further recursion.

Let's return to our array addition problem. A recursive solution might take the first number in the array, add it to the result of a recursive call with the rest of the array, and return that sum. The base case occurs when the array is empty, at which point the function returns zero.

Recursive solutions can be more intuitive and easier to understand for certain problems, especially those involving tree or graph traversals, backtracking, and problems that naturally fit into a divide-and-conquer strategy.

Challenges for Recursion
------------------------

While recursion can make code shorter and easier to write, it comes with its own set of challenges. Each recursive call adds a layer to the system's call stack, which uses memory to keep track of return addresses and local variables. If the depth of recursion is too high, it could lead to a stack overflow — a common pitfall when using recursion.

Iteration v. Recursion?
-----------------------

![Family Guy's Peter Griffin Points to the Movie Screen where a character has said the name of the film in a film and says "Ah. Ah. He Said It."](https://media.tenor.com/X3TqG0t92LgAAAAd/family-guy-peter-griffin.gif)

While every problem that can be solved iteratively can technically also be solved recursively, and vice versa, the two are not the same. The choice between iteration and recursion often depends on the specific problem, the constraints of the task, and the specific language you're using.

In general, recursion is suited for problems where the task can naturally be divided into subproblems that are similar to the original. On the other hand, iteration is usually better suited for tasks that involve a straightforward repetition of the same process.

Want Some Examples?
-------------------

Sure you do. Let's consider two common programming problems and solve them using both iterative and recursive approaches: calculating the factorial of a number and summing the elements of an array.

**1. Factorial of a number**

The factorial of a non-negative integer _n_ is the product of all positive integers less than or equal to n. It's denoted by n!.

_Iterative Approach:_

```js
function factorial_iterative(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

_Recursive Approach:_

```js
function factorial_recursive(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial_recursive(n - 1);
    }
}
```

**2. Summing the elements of an array**

This problem involves calculating the total sum of all elements in an array, as mentioned above. These two code snippets _should_ provide a reasonable illustration of the differences in behaviors between these two approaches.

_Iterative Approach:_

```js
function sum_iterative(array) {
    let result = 0;
    for (let i = 0; i < array.length; i++) {
        result += array[i];
    }
    return result;
}
```

_Recursive Approach:_

```js
function sum_recursive(array) {
    if (array.length === 0) {
        return 0;
    } else {
        return array[0] + sum_recursive(array.slice(1));
    }
}
```

In both examples, you can see that the iterative solutions involve looping through a range or an array and directly updating the result, whereas the recursive solutions involve breaking the problem down into smaller sub-problems, solving them, and combining the results.

While these problems are simple, they provide a clear illustration of the difference between iteration and recursion, and how you can use each technique to solve the same problem in different ways.

You'd Like a Conclusion, Perhaps?
---------------------------------

Iteration and recursion are two fundamental techniques that every programmer should understand. Each has its strengths and weaknesses, and knowing when to use one or the other can make your code more efficient, readable, and elegant.

Keep in mind that the choice between recursion and iteration isn't always an either/or decision. Sometimes, the best solution involves a mix of both. Ultimately, the best strategy is to become comfortable with both iteration and recursion, and to understand how and when to use each one effectively.

For some relevant reading, checkout the [Church-Turing Thesis](https://plato.stanford.edu/entries/church-turing/)
