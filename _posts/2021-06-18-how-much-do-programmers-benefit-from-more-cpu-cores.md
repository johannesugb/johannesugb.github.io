---
title: "How Much Do Programmers Benefit From More CPU Cores"
# last_modified_at: 2021-06-18T16:00:00+02:00
categories:
  - Hardware
# header:
#   image: /assets/images/1500x500.jpg
---

I currently have access to PCs which are of totally different form factors---one being a desktop-PC, the other being a laptop-PC---and actually pretty different CPUs---the former featuring a (then-high end) [AMD Ryzen AMD Ryzen 9 3900X](https://www.amd.com/en/products/cpu/amd-ryzen-9-3900x) with 12 physical cores, the latter featuring a (currently mid-tier, and mobile) [Intel Core i5-1135G7](https://ark.intel.com/content/www/us/en/ark/products/208658/intel-core-i5-1135g7-processor-8m-cache-up-to-4-20-ghz.html) with four physical cores---and during programming, I actually expected long waiting times and my patience being tried sorely when programming with the mobile i5-1135G7. However, I have to say that for many tasks, I can not feel any difference between the two PCs.
Taking a closer look at how the two very different CPUs compare to each other on [UserBenchmark](https://cpu.userbenchmark.com/Compare/Intel-Core-i5-1135G7-vs-AMD-Ryzen-9-3900X/m1286124vs4044) reveals very similar single-core scores for these two CPUs, with actually the i5-1135G7 being attributed a 8% higher single-core score compared to the 3900X. 

As we all know, programmers always need more cores because our PCs must not impede us in our endeavours---at least that's what I am thinking sometimes when I try to find justifications for why I need the high-end model of a CPU series. After all, all the benchmarks of recent years said that if you are doing "productivity stuff" (whatever that means), you should go for a Ryzen because it has more cores than Intel. But what if the number of cores don't matter so much and core speed is more important? This question was nagging in the back of my mind, so let's try to get some more information about this.

In this blog post, I will compare the Ryzen 9 3900X with the Core i5-1135G7 for CPU tasks. However, the comparisons will not be totally accurate because I will not test them with the same hardware components for things like SSD and RAM. I.e., it will not exactly be an apples to apples comparison. But the hardware specifications are not too different from each other, so at least overall performance trends should become visible. 

For a start, _Table 1_ shows some results from [PCMark 10](https://benchmarks.ul.com/pcmark10). I have performed all tests on the laptop-PC twice: once in "extreme performance mode" and plugged in, and once in "intelligent cooling mode" running on battery.


