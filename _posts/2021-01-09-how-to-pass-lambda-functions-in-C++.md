---
title: "How To Pass Lambda Functions in C++ (by value, by reference, by universal reference)"
# last_modified_at: 2016-03-09T16:20:02-05:00
categories:
  - Modern C++
tags:
  - C++
  - lambda functions
# header:
#   image: /assets/images/1500x500.jpg
---

A question that I've asked on StackOverflow: [C++ best practice: Pass use-only (not stored) lambda argument to function by const-reference or by 
forwarding-reference (a.k.a. universal-reference)](https://stackoverflow.com/questions/65562986) tempted me to create this post. I was 
looking for the best of how to pass-in lambda functions as a parameter. There are several ways, and it might not be obvious which one is the optimal way:
- by (const) reference,
- by universal reference*, or
- by value?

\* I will be using the term _universal reference_ in this blog post and not _forwarding reference_ since those references will not be forwarded in 
the code examples. Therefore, good old "universal reference" seems to be the more appropriate term in this context.

# How does the STL do it?

A look into the STL reveals that in (almost?) all places lambdas are passed *by value*. The `UnaryPredicate` of 
[`std::find_if`](https://en.cppreference.com/w/cpp/algorithm/find), for example, is passed by value in all overloads. 
Why might it be a good idea to pass by value? 

To answer this question, let us consider a lambda which does not capture any data: 
``` 
auto lambda = [](const char* callee){ 
    printf("This lambda is invoked from %s", callee); 
};
```
It only contains functionality, but no data. In such a case, it does not really matter _how exactly_ we capture the lambda. No matter if we capture
it by reference or by value, the compiler _only_ has to plug in the instructions of the lambda but no data needs to be transferred, whatsoever.

We can verify this by taking a look at the generated assembly code (e.g. using [COMPILER EXPLORER](https://godbolt.org/)):
The two different code versions shown in Figure 1 compile to the same assembly instructions as shown in Figure 2 (x86-64 clang 11.0.0 -O1, diff created with [WinMerge](https://winmerge.org/)).

![Two versions of a function accepting lambda by value or const reference](/assets/images/lambda_byval_vs_byconstref.png)
_Figure 1:_ Two versions of a function, the left accepts a lambda by value, the right accepts it by const reference.

![Assembly code of the two different functions from Figure 1](/assets/images/use_func_byval_vs_byconstref.png)
_Figure 2:_ The assembly code of the two versions from Figure 1 compared with each other.

That means, how ex

# Passing a lambda 
