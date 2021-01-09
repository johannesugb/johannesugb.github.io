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
looking for the best way of how to pass-in lambda functions as a parameter. There are several ways, and it might not be obvious which one is the optimal way:
- by (const) reference,
- by universal reference*, or
- by value?

\* I will be using the term "universal reference" in this blog post and not "forwarding reference" since those references will not be forwarded in 
the code examples but only used in place. Therefore, good old "universal reference" seems to be the more appropriate term in this context.

## How does the STL do it?

A look into the STL reveals that in (almost?) all places lambdas are passed *by value*. The `UnaryPredicate` of 
[`std::find_if`](https://en.cppreference.com/w/cpp/algorithm/find), for example, is passed by value in all overloads. 
Why might it be a good idea to pass by value? 

To answer this question, let us consider a lambda which does not capture any data as shown in Code Listing 1.

```cpp
auto lambda = [](const char* callee){ 
    printf("This lambda is invoked from %s", callee); 
};
```
_Code Listing 1:_ A lambda that does not capture any data.

It only contains functionality, but no data. In such a case, it _does not really matter_ how exactly we capture the lambda. No matter if we capture
it by reference or by value, the compiler _only_ has to plug in the instructions of the lambda but no data needs to be transferred, whatsoever.

We can verify this by taking a look at the generated assembly code (e.g. using [COMPILER EXPLORER](https://godbolt.org/)):
The two different code versions shown in Figure 1 compile to the same assembly instructions as shown in Figure 2 (x86-64 clang 11.0.0 -O1, diff created with [WinMerge](https://winmerge.org/)).

[![Two versions of a function accepting lambda by value or const reference](/assets/images/lambda_byval_vs_byconstref.png)](/assets/images/lambda_byval_vs_byconstref.png)
_Figure 1:_ Two versions of a function, the left accepts a lambda by value, the right accepts it by const reference.

[![Assembly code of the two different functions from Figure 1](/assets/images/use_func_byval_vs_byconstref.png)](/assets/images/use_func_byval_vs_byconstref.png)
_Figure 2:_ The assembly code of the two versions from Figure 1 compared with each other.

Where it _can_ make a difference is when the lambda captures data. If a lambda captures large amounts of data, that data would have to be copied whenever a lambda is passed by value. Let us assume that a lambda captures a large vector by value, shown in Code Listing 2.

```cpp
std::vector<uint8_t> blob;
auto lambda = [blob](){ ... };
```
_Code Listing 2:_ A lambda that captures a lot of data.

In such a case, the entire vector would be duplicated every time `lambda` is passed by value. This implicates an allocation of potentially a lot of data.

The STL, however, obviously assumes that such cases are rare or considers them bad practice---and rightfully so!
I.e. for "small" lambdas, passing by value looks like the way to go. 

## Accept a lambda by value if it captures only small amounts of data

For many of the STL's functions, it can be expected that a lambda should only capture small amounts of data. But even if it requires to capture a lot of data, the cost of _passing_ a lambda around by value can potentially be minimized. A potential alternative to Code Listing 2 that can be cheaply passed around by value is shown in Code Listing 3.

```cpp
std::vector<uint8_t> blob;
auto lambda = [&blob](){ ... };
```

Capturing the `std::vector` by reference incurs the small cost of copying only one pointer to a memory address when passing `lambda` around by value. Please note, however, that this is only safe if `blob` outlives `lambda`.

## Are the alternatives any good, i.e. accepting a lambda by reference?

TBD...
