---
title: "As a Programmer, You Need a CPU With Lots of Cores, Right?"
# last_modified_at: 2021-07-27T21:00:00+02:00
categories:
  - Hardware
# header:
#   image: /assets/images/1500x500.jpg
---

I currently have access to PCs which are of totally different form factors---one being a desktop-PC, the other being a laptop-PC---and actually pretty different CPUs---the former featuring a (then-high end) [AMD Ryzen AMD Ryzen 9 3900X](https://www.amd.com/en/products/cpu/amd-ryzen-9-3900x) with 12 physical cores, the latter featuring a (currently mid-tier, and mobile) [Intel Core i5-1135G7](https://ark.intel.com/content/www/us/en/ark/products/208658/intel-core-i5-1135g7-processor-8m-cache-up-to-4-20-ghz.html) with four physical cores---and during programming, I actually expected long waiting times and my patience being put to the test when programming with the mobile i5-1135G7. However, I have to say that for many tasks, I can not feel any difference between the two PCs.
Taking a closer look at how the two very different CPUs compare to each other on [UserBenchmark](https://cpu.userbenchmark.com/Compare/Intel-Core-i5-1135G7-vs-AMD-Ryzen-9-3900X/m1286124vs4044) reveals very similar single-core scores for these two CPUs, with actually the i5-1135G7 being attributed a 8% higher single-core score compared to the 3900X. 

But what about the huge difference in number of cores? Don't programmers always need a lot of cores? Let us find out by doing some compile time benchmarks, shall we?!

In this blog post, I will compare the Ryzen 9 3900X with the Core i5-1135G7 in terms of compile times across different projects. The comparisons will not be 100% fair because I will not test them with exactly the same hardware components for SSD, RAM, and suchlike. I.e., it will not exactly be an apples to apples comparison. But the hardware specifications are not too different from each other, so at least overall performance trends should become visible. _Table 1_ shows a comparison of the two systems' SSD speeds as determined with [CrystalDiskMark](https://crystalmark.info). While they are not exactly the same, they definitely play in the same ball park which should be sufficient for receiving an impression of performance trends in terms of compile times later on.

{: .center}
| Benchmark            | Desktop Read | Desktop Write | Laptop Read | Laptop Write | 
| :---                 |       ----: |        ----: |       ----: |        ----: |
| SEQ1M Q8T1           | 1802 MB/s   | 1705 MB/s    | 2478 MB/s   | 1789 MB/s    |
| SEQ1M Q1T1           | 1603 MB/s   | 1591 MB/s    | 1580 MB/s   | 1477 MB/s    |
| RND4K Q32T1          | 551  MB/s   | 445  MB/s    | 318  MB/s   |  366 MB/s    |
| RND4K Q1T1           | 51   MB/s   | 170  MB/s    | 42   MB/s   |   97 MB/s    |

_Table 1:_ Read and write speeds of the different SSDs from the two different systems.

Before studying compile times, let us take a look at benchmark results from [PCMark 10](https://benchmarks.ul.com/pcmark10) in _Table 2_. The tests were performed once on the desktoop-PC, and twice on the laptop-PC: once plugged in, and once running on battery.

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

_Table 2:_ Comparing several selected benchmark results from PCMark 10 shows that for many every-day tasks there is not a huge performance difference between the two CPUs although they feature very different numbers of cores. There were many benchmark results which clearly showed an advantage for the CPU with more cores like, e.g., "Batch transformation", but these were left out of this table to make the point of compareable single-core performance. Warm start benchmarks have been selected instead of cold start benchmarks, to help decrease influences of different SSD speeds.

# Compile Time Benchmarks

Now let us move on to the really important data for programmers: Can we see a difference in compile times with CPUs that feature higher numbers of cores?

{: .center}
| Benchmark            | Ryzen 9 3900X | i5-1135G7 plugged | i5-1135G7 battery |
| :---                 |         ----: |             ----: |             ----: |
| ASSIMP                                    | 0:20.24    | 0:52.50       | 0:55.16        |
| Sascha Willems' Vulkan Examples           | 2:17.04    | 2:26.18       | 3:06.63        |
| Gears-Vk, framework only                  | 0:23.58    | 0:26.24       | 0:29.55        |
| Gears-Vk + examples <br/> w/o custom build step | 2:12.02    | 2:18.63       | 2:31.49        |
| Gears-Vk + examples  <br/> + custom build step   | 2:36.94    | 2:52.52       | 3:09.93        |

_Table 3:_ asdf

[Gears-Vk](https://github.com/cg-tuwien/Gears-Vk) commit [08d4c97](https://github.com/cg-tuwien/Gears-Vk/commit/08d4c972944568e47b614bf99f16185563aea085).

[ASSIMP](https://github.com/assimp/assimp) commit [376b3b2](https://github.com/assimp/assimp/commit/376b3b2eff1a7b18d1ab5de0ae1d4e7901d944c5)

[Sascha Willems' Vulkan Examples](https://github.com/SaschaWillems/Vulkan) commit [ac4deed](https://github.com/SaschaWillems/Vulkan/commit/ac4deedd0c46df5c2a26f6ee180df1e6eddedc52)

with -maxcpucount:8 bzw. -maxcpucount:24 set:

{: .center}
| Benchmark            | Ryzen 9 3900X | i5-1135G7 plugged | i5-1135G7 battery |
| :---                 |         ----: |             ----: |             ----: |
| ASSIMP                                    | 0:20.60    |               |                |
| Sascha Willems' Vulkan Examples           | 0:27.25    | 0:56.79       | 0:57.16        |
| Gears-Vk, framework only                  | 0:23.50    |               |                |
| Gears-Vk + examples <br/> w/o custom build step  | 0:40.56 |               |                |
| Gears-Vk + examples  <br/> + custom build step   | 0:43.53 |               |                |

_Table 4:_ Compile time benchmark results for 

Multiple compile units in parallel:

{: .center}
| Benchmark                        | m=1, MP=1  | m=1, MP=24 | m=24, MP=1 | m=24, MP=24 | m=12, MP=12 |
| :---                             |      ----: |      ----: |      ----: |       ----: |       ----: |
| ASSIMP                           |  2:45.45   | 0:20.58    | 2:40.09    | 0:18:96     | 0:23:63     |
| Sascha Willems' Vulkan Examples  |  2:15.70   | 2:16.65    | 0:25.69    | 0:25.59     | 0:28:28     |
| Gears-Vk, framework only         |  2:18.50   | 2:18.84    | 0:39.71    | 0:39.60     | 0:39.55     |

_Table 5:_ Different compile time measurements with different settings for `-maxcpucount` (abbreviated with 'm') Build with Multiple Processes (abbreviated with 'MP') and different combinations of those two settings compared to each other.

/MP is by default off

Visual Studio appears to build multiple projects in parallel since the build times when building a solution from within Visual Studio are very close to the results measured with `MSBuild.exe` from _Table 4_.
