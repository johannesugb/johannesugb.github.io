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

In this blog post, I will compare the Ryzen 9 3900X with the Core i5-1135G7 for CPU tasks. However, the comparisons will not be totally accurate because I will not test them with exactly the same hardware components for things like SSD and RAM. I.e., it will not exactly be an apples to apples comparison. But the hardware specifications are not too different from each other, so at least overall performance trends should become visible. _Table 1_ shows a comparison of the two systems' SSD speeds as determined with [CrystalDiskMark](https://crystalmark.info). While they are not exactly the same, they definitely play in the same ball park which should be sufficient for receiving an impression of performance trends in terms of compile times later on.

{: .center}
| Benchmark            | Ryzen 9 3900X Desktop || i5-1135G7 Laptop ||
|                      | Read (MB/s) | Write (MB/s) | Read (MB/s) | Write (MB/s) | 
| :---                 |       ----: |        ----: |       ----: |        ----: |
| SEQ1M Q8T1           | 1802        | 1705         | 2478        | 1789         |
| SEQ1M Q1T1           | 1603        | 1591         | 1580        | 1477         |
| RND4K Q32T1          | 551         | 445          | 318         |  366         |
| RND4K Q1T1           | 51          | 170          | 42          |   97         |
_Table 1:_ Read and write speeds of the different SSDs from the two different systems.


For a start, _Table 1_ shows some results from [PCMark 10](https://benchmarks.ul.com/pcmark10). I have performed all tests on the laptop-PC twice: once plugged in, and once running on battery.

{: .center}
| Benchmark            | Ryzen 9 3900X | i5-1135G7 plugged | i5-1135G7 battery |
| :---                 |         ----: |             ----: |             ----: |
| Firefox warm start   | 1.56 s        | 1.56 s          |  1.82 s             |
| GIMP warm start      | 2.33 s        | 2.64 s          |  2.97 s             |
| Cut and paste        | 0.33 s        | 0.32 s          |  0.31 s             |
| Recalculate Stock history CPU | 0.85 s  | 0.88 s       |  1.01 s             |
| Edit cells              | 0.79 s     |  0.83 s         |  0.85 s             |
| Save JPEG            | 1.17 s        | 1.24 s          | 1.27 s              |
| Gaussian blur        | 0.41 s        | 0.35 s       |  0.42 s             |

_Table 1:_ Comparing several selected benchmark results from PCMark 10 shows that for many every-day tasks there is not a huge performance difference between the two CPUs with a huge difference in number of cores. There were also benchmark results which clearly showed an advantage for the CPU with more cores like, e.g., "Batch transformation", but these were left out of this table. Warm start benchmarks have been selected instead of cold start benchmarks, to help decrease influences of different SSD speeds.

W.I.P. from here on:

The results from _Table 1_ shall mainly serve for the purpose of showing that indeed, there is not a huge performance difference between the two different CPUs in benchmarks which obviously do not really benefit from more cores. 

{: .center}
| Benchmark            | Ryzen 9 3900X | i5-1135G7 plugged | i5-1135G7 battery |
| :---                 |         ----: |             ----: |             ----: |
| ASSIMP                                    | 0:20.24    | 0:52.50       | 0:55.16        |
| Sascha Willems Vulkan Examples            |            | 2:26.18       | 3:06.63        |
| Gears-Vk, framework only                  | 0:22.89    | 0:26.24       | 0:29.55        |
| Gears-Vk + examples <br/> w/o custom build step | 2:12.02    | 2:18.63       | 2:31.49        |
| Gears-Vk + examples  <br/> + custom build step   | 2:36.94    | 2:52.52       | 3:09.93        |

[Gears-Vk](https://github.com/cg-tuwien/Gears-Vk) commit [08d4c97](https://github.com/cg-tuwien/Gears-Vk/commit/08d4c972944568e47b614bf99f16185563aea085).

[ASSIMP](https://github.com/assimp/assimp) commit [376b3b2](https://github.com/assimp/assimp/commit/376b3b2eff1a7b18d1ab5de0ae1d4e7901d944c5)

with -maxcpucount:8 bzw. -maxcpucount:24 set:

{: .center}
| Benchmark            | Ryzen 9 3900X | i5-1135G7 plugged | i5-1135G7 battery |
| :---                 |         ----: |             ----: |             ----: |
| ASSIMP                                    |            |               |                |
| Sascha Willems Vulkan Examples            |            | 0:56.79       | 0:57.16        |
| Gears-Vk, framework only                  |            |               |                |
| Gears-Vk + examples <br/> w/o custom build step |      |               |                |
| Gears-Vk + examples  <br/> + custom build step   |     |               |                |
