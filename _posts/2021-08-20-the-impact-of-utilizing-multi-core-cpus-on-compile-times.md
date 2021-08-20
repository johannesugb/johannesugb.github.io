---
title: "The Impact of Utilizing Multi-Core CPUs on Compile Times"
# last_modified_at: 2021-08-20T21:00:00+02:00
categories:
  - Hardware
# header:
#   image: /assets/images/1500x500.jpg
---

I currently have access to PCs which are of totally different form factors---one being a desktop-PC, the other being a laptop-PC---and actually have pretty different CPUs---the former featuring a (then-high end) [AMD Ryzen AMD Ryzen 9 3900X](https://www.amd.com/en/products/cpu/amd-ryzen-9-3900x) with 12 physical cores, the latter featuring a (currently mid-tier, and mobile) [Intel Core i5-1135G7](https://ark.intel.com/content/www/us/en/ark/products/208658/intel-core-i5-1135g7-processor-8m-cache-up-to-4-20-ghz.html) with four physical cores---and during programming, I actually expected long waiting times and my patience being put to the test when programming with the mobile i5-1135G7. However, I have to say that for many tasks, I can not feel any difference between the two PCs.
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

Now let us move on to the really interesting data for programmers: Can we see a difference in compile times with CPUs that feature higher numbers of cores? The performance measurements shown in the following have been created from building different projects: [ASSIMP](https://github.com/assimp/assimp) (commit [376b3b2](https://github.com/assimp/assimp/commit/376b3b2eff1a7b18d1ab5de0ae1d4e7901d944c5)), [Sascha Willems' Vulkan Examples](https://github.com/SaschaWillems/Vulkan) (commit [ac4deed](https://github.com/SaschaWillems/Vulkan/commit/ac4deedd0c46df5c2a26f6ee180df1e6eddedc52)), and [Gears-Vk](https://github.com/cg-tuwien/Gears-Vk) (commit [08d4c97](https://github.com/cg-tuwien/Gears-Vk/commit/08d4c972944568e47b614bf99f16185563aea085)). The latter is a Vulkan rendering framework which I am maintaining and I've included different configurations in the performance measurements:
While the repository contains 11 example applications at the specified commit, they are referencing a common framework project. The compile times of the framework project have been measured in isolation, but also the compile times of the whole solution including all example applications. Another variant of compile time measurement includes a custom build step in the stated times. The build step compiles shaders and deploys asset files. It must be expected that the build step does not parallelize well, but nevertheless, it represents a real-world use case.

The first benchmarks are shown in _Table 3_ and have been bulit with [`MSBuild`](https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild?view=vs-2019) and its default settings. I.e. the build instruction is as simple as:

```powershell
.\MSBuild.exe path-to-solution.sln
```

{: .center}
| Benchmark            | Ryzen 9 3900X | i5-1135G7 plugged | i5-1135G7 battery |
| :---                 |         ----: |             ----: |             ----: |
| ASSIMP                                    | 0:20.24    | 0:52.50       | 0:55.16        |
| Sascha Willems' Vulkan Examples           | 2:17.04    | 2:26.18       | 3:06.63        |
| Gears-Vk, framework only                  | 0:23.58    | 0:26.24       | 0:29.55        |
| Gears-Vk + examples <br/> w/o custom build step | 2:12.02    | 2:18.63       | 2:31.49        |
| Gears-Vk + examples  <br/> + custom build step   | 2:36.94    | 2:52.52       | 3:09.93        |

_Table 3:_ Surprisingly, we cannot really see siginificant performance differences in compile times across the tests. Only in the ASSIMP test, the 12-core CPU is quite a bit faster.

The results from _Table 3_ are a bit of a disappointment from the 12-core CPU's point of view. But a quick look into the options that `MSBuild` provides, revealed an interesting parameter: `-maxcpucount`. It lets `MSBuild` compile multiple projects in parallel. Let us investigate the effect this parameter has on compile times, setting it to the maximum number of logigal CPUs on both systems. The results are presented in _Table 4_.

{: .center}
| Benchmark            | Ryzen 9 3900X | i5-1135G7 plugged | i5-1135G7 battery |
| :---                 |         ----: |             ----: |             ----: |
| ASSIMP                                    | 0:20.60    | 0:54.44       | 0:56.99        |
| Sascha Willems' Vulkan Examples           | 0:27.25    | 0:56.79       | 0:57.16        |
| Gears-Vk, framework only                  | 0:23.50    | 0:28.34       | 0:29.17        |
| Gears-Vk + examples <br/> w/o custom build step  | 0:40.56 | 1:01.54       | 1:04.99        |
| Gears-Vk + examples  <br/> + custom build step   | 0:43.53 | 1:13.03       | 1:14.29        |

_Table 4:_ Compile time benchmark results, generated with `MSBuild` and parameters `-maxcpucount:8` for i5-1135G7, and `-maxcpucount:24` for the Ryzen 9 3900X. The effect of this setting can be observed for all projects which contain _multiple projects_ when compared to the results from _Table 3_. 

The `-maxcpucount` option turned out to be a success. Compile times benefit from this setting in solutions which contain more than one projects. Since the benchmarks "ASSIMP" and "Gears-Vk, framework only" only contain a single project, those did not see improvements in compile times.

There is yet another interesting option, namely [`/MP`](https://docs.microsoft.com/en-us/cpp/build/reference/mp-build-with-multiple-processes?view=msvc-160) which can build multiple "compile units" in parallel. In a final benchmark, the effect of this option is investigated, the results are presented in _Table 5_.

{: .center}
| Benchmark                                        | m=1, MP=1  | m=1, MP=24 | m=24, MP=1 | m=24, MP=24 | m=12, MP=12 |
| :---                                             |      ----: |      ----: |      ----: |       ----: |       ----: |
| ASSIMP                                           |  2:45.45   | 0:20.58    | 2:40.09    | 0:18:96     | 0:23:63     |
| Sascha Willems' Vulkan Examples                  |  2:15.70   | 2:16.65    | 0:25.69    | 0:25.59     | 0:28:28     |
| Gears-Vk + examples <br/> w/o custom build step  |  2:18.50   | 2:18.84    | 0:39.71    | 0:39.60     | 0:39.55     |

_Table 5:_ Different compile time measurements with different settings for `-maxcpucount` (abbreviated with 'm') `/MP` (abbreviated with 'MP') and different combinations of those two settings compared to each other. All measurements taken on the Ryzen 9 3900X.

Different values for the `/MP` parameter show big effects also in the solutions which only contain one project and could therefore not be sped up by the `-maxcpucount` parameter. The performance differences of ASSIMP compile times for different `/MP` parameters leads to the conclusion that this setting is turned on by default in contrast to the `-maxcpucount` parameter. 

For solutions containing multiple projects, the `-maxcpucount` parameter resulted in a bigger speed-up than the `/MP` parameter, while the former does not help at all if there is only one project in a solution.

# Takeaways

Compilation can be parallelized to a certain degree, resulting in significant reductions of compile time. However, parallel compilation is not necessarily turned on by default.

When building solutions with multiple projects using `MSBuild`, ensure that the `-maxcpucount` parameter is set, otherwise projects will not be built in parallel. Visual Studio appears to build multiple projects in parallel by default since the build times when building a solution from within Visual Studio are very close to the results measured with `MSBuild` from _Table 4_.

The `/MP` setting can speed-up inter-project compile time by compiling multiple compile units in parallel. It appears that this setting is on by default in `MSBuild` and most likely also when building via Visual Studio. To be totally sure, check the Visual Studio setting        
`Configuration Properties -> C++ -> General -> Multi-processor Compilation`.

One last, but important point to consider is if `/MP` _can_ compile multiple compilation units in parallel, which might be prevented by high degrees of coupling between parts of the code, by excessive use of templates, and propbably a number of other situations. Avoiding such situtaions will lead to faster compile times when `/MP` is on---and then yes, you will befenefit the high number of cores in your developer-PC CPU.
