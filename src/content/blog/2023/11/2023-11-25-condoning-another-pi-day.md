---
title: Condoning Another Pi Day
postSlug: condoning-another-pi-day
slug: condoning-another-pi-day
pubDate: 11/25/2023 01:34 PM
imgUrl: ../../../../assets/img/2023/11/ae84eb9dd789555dfc8bf1f3b9cda56225e248e2.jpeg
ogImage: ../../../../assets/img/2023/11/ae84eb9dd789555dfc8bf1f3b9cda56225e248e2.jpeg
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description:
  Placeholder description for imported post from Ghost Blog
layout: ../../../../layouts/BlogPost.astro
---

![Featured Image](../../../../assets/img/2023/11/ae84eb9dd789555dfc8bf1f3b9cda56225e248e2.jpeg)

11/24 wasn't just Black Friday. It became another Pi day around here.

We had pie for breakfast, leftover from Thanksgiving. We had Quiche, an egg pie, for lunch. Finally, for dinner, we had ourselves some pizza pie from a local woodfire place that was delicious. For dessert, yep, more pie.

Pie day needed to be condoned, however.

1124

Those numbers [_definitely_](https://clickcalculators.com/pi-calculator/100000) appear in Pi. I posit that all numeric sequence appear in Pi somewhere due to the nature of infinity and all.

I cheated and found them in a couple of sources that store the value of Pi to millions of places and doing a simple text search

It's there.

But where?

I guessed it was in the first 10k to 100k places.

But I wanted to tell you, dear reader, that it was Pi day due to 1124 appearing at position _n_.

Calculating Pi?
---------------

Could I calculate that myself?

I could use the [Chudnovsky algorithm](https://en.wikipedia.org/wiki/Chudnovsky_algorithm).

There's a python script in the Wiki page:

    import decimal
    
    
    def binary_split(a, b):
        if b == a + 1:
            Pab = -(6*a - 5)*(2*a - 1)*(6*a - 1)
            Qab = 10939058860032000 * a**3
            Rab = Pab * (545140134*a + 13591409)
        else:
            m = (a + b) // 2
            Pam, Qam, Ram = binary_split(a, m)
            Pmb, Qmb, Rmb = binary_split(m, b)
            
            Pab = Pam * Pmb
            Qab = Qam * Qmb
            Rab = Qmb * Ram + Pam * Rmb
        return Pab, Qab, Rab
    
    
    def chudnovsky(n):
        P1n, Q1n, R1n = binary_split(1, n)
        return (426880 * decimal.Decimal(10005).sqrt() * Q1n) / (13591409*Q1n + R1n)
    
    
    print(chudnovsky(2))  # 3.141592653589793238462643384

So, of course I could.

This method wouldn't yield the precision I need.

You could do [something like this](https://replit.com/@ephbaum/Chudnovsky-algo-in-py#main.py) to get to a certain precision:

    from decimal import Decimal, getcontext
    import math
    
    def calculate_pi(precision):
        """
        Calculate pi using the Chudnovsky algorithm to the specified precision.
        """
        getcontext().prec = precision + 1  # Set precision
        C = 426880 * Decimal(math.sqrt(10005))
        M = 1
        L = 13591409
        X = 1
        K = 6
        S = L
    
        for i in range(1, precision):
            M = (M * (K ** 3 - 16 * K)) // i ** 3 
            L += 545140134
            X *= -262537412640768000
            S += Decimal(M * L) / X
            K += 12
    
        pi = C / S
        return str(pi)[:precision]
    
    # Calculate Pi to 100 digits
    pi_100_digits = calculate_pi(100)
    pi_100_digits
    
    pi_100000_digits = calculate_pi(100000)
    pi_100000_digits

It's not the most efficient solution. I think I might have made repl.it mad when I tried to get 100,000 digits with the above. I gave up trying to even get to 10,000 digits in other 20 minutes of waiting.

It's _obviously_ not efficient - just look at it!

So, that didn't seem like an easy enough path and I really didn't want to spend all that much time / money on solving this problem. Also, I'm not a Python expert by any means.

Search a Pre-calculated Dataset
-------------------------------

There are sources of this data around the internet, one need only do a little searching.

A couple of examples can be found [here](https://www.damienelliott.com/1-million-digits-of-pi-%cf%80-ready-to-copy-and-paste/) and [here](https://www.mathsisfun.com/numbers/images/pi-million.txt), so, easy enough, I have me some pi to search.

To find the digits with an existing dataset I figured I could:

*   Obtain a Pi Dataset - That was easy
*   Read the Dataset - pick a programming language and read the dataset - Doesn't seem too hard either - Python, Rust, Go, etc. all seem like they'd be well suited
*   Search for the Sequence - This also seems relatively easy, most languages have built in search methods so it's not like I need to implement a fancy search algorithm myself, this isn't some leetcode challenge
*   Output the Position - This also seems _relatively_ easy, find the first instance of the sequence I'm seeking and output its position. Bingo.

So, back to repl.it I went looking to find the sequence in a pre-calculated dataset, like a chump who was too lazy to calculate Pi. Who has time to calculate Pi? I know it _can_ be calculated but others have already done so, so I guess that's good enough for me.

My first attempt was to whip up something in Rust because I'm always looking for excuses to use Rust. At first I used `reqwest` and `tokio` but, unfortunately, that resulted in some OpenSSL issues due to the dependency on OpenSSL that Repl.it didn't meet and, so, I opted for a least resistant path and switched to a [more simplistic blocking solution](https://replit.com/@ephbaum/search-pi-dataset-with-rust#src/main.rs) by using `ureq` and boom💥:

> Sequence found at position: 25705

The code is simple:

    fn find_sequence_in_url(url: &str, sequence: &str) -> Result<Option<usize>, Box<dyn std::error::Error>> {
        let response = ureq::get(url).call()?.into_string()?;
    
        Ok(response.find(sequence))
    }
    
    fn main() -> Result<(), Box<dyn std::error::Error>> {
        let url = "https://www.mathsisfun.com/numbers/images/pi-million.txt";
        let sequence = "1124";
    
        match find_sequence_in_url(url, sequence)? {
            Some(position) => println!("Sequence found at position: {}", position),
            None => println!("Sequence not found"),
        }
    
        Ok(())
    }

But it's effective enough.

So, now I know that yesterday was another Pi day and that pattern appears only 25705 places into to Pi.

So, literally every day can be Pi day!

Enjoy your Pie!
