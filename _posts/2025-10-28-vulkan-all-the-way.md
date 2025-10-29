---
title: "Vulkan all the way: Transitioning to a modern low-level graphics API in academia"
last_modified_at: 2025-10-29T12:09:00+01:00
categories:
  - GPU-Programming
tags:
  - Vulkan
  - Paper
---

This is the paper page of our paper "Vulkan all the way", which is an extended edition of our previous paper 
[The Road to Vulkan: Teaching Modern Low-Level APIs in Introductory Graphics Courses](https://johannesugb.github.io/gpu-programming/the-road-to-vulkan/) 
and has been accepted for publication in the _Computers and Graphics_ journal in 2023.

{: .center}
[![Seak peek into our paper Vulkan all the way](/assets/images/msh-header-image.png)](/assets/images/vulkan-all-the-way-teaser.png)

_Figure 1:_ Our extended paper contains information across all real-time rendering focused courses in our curriculum, showing our approach, student numbers, and learnings from student feedback. It also introduces different Vulkan programming frameworks, explaining their main concepts and why we have used them.

# Authors

<div style="display:block; text-align: center; padding-bottom: 1em;">
  <a href="https://www.cg.tuwien.ac.at/staff/JohannesUnterguggenberger">Johannes Unterguggenberger</a>, <a href="https://www.cg.tuwien.ac.at/staff/BernhardKerbl">Bernhard Kerbl</a>, <a href="https://www.cg.tuwien.ac.at/staff/MichaelWimmer">Michael Wimmer</a>
</div>
<div style="display:block; text-align: center;">
  TU Wien
</div>

# Abstract

For over two decades, the OpenGL API provided users with the means for implementing versatile, feature-rich, and portable real-time graphics applications. Consequently, it has been widely adopted by practitioners and educators alike and is deeply ingrained in many curricula that teach real-time graphics for higher education. Over the years, the architecture of graphics processing units (GPUs) incrementally diverged from OpenGL's conceptual design. The more recently introduced Vulkan API provides a more modern, fine-grained approach for interfacing with the GPU, which allows a high level of controllability and, thereby, deep insights into the inner workings of modern GPUs. This property makes the Vulkan API especially well suitable for teaching graphics programming in university education, where fundamental knowledge shall be conveyed. Hence, it stands to reason that educators who have their students’ best interests at heart should provide them with corresponding lecture material. However, Vulkan is notoriously verbose and rather challenging for first-time users, thus transitioning to this new API bears a considerable risk of failing to achieve expected teaching goals. In this paper, we document our experiences after teaching Vulkan in both introductory and advanced graphics courses side-by-side with conventional OpenGL. A collection of surveys enables us to draw conclusions about perceived workload, difficulty, and students’ acceptance of either approach. In doing so, we identify suitable conditions and recommendations for teaching Vulkan to both undergraduate and graduate students.

# Details

Our [previous publication](https://johannesugb.github.io/gpu-programming/the-road-to-vulkan/), which was presented at Eurographics 2022 in Reims, France, focused mainly on 
our guidelines and experiences from transitioning an introductory graphics course from OpenGL to Vulkan. Our extended edition extends the information given to our 
guidelines, experiences, and recommendations from/for advanced graphics courses. Over the years, we have gradually transitioned all our graphics courses to Vulkan and
use different programming frameworks for the different courses. The reasons for using different frameworks is that they serve different purposes: Vulkan Launchpad is a very light-weight 
framework that is actually intended to learn the Vulkan API. To achieve this goal, it only abstracts a few (overly verbose) setup steps to enable students to make faster initial progress. 
Auto-Vk-Toolkit, on the other hand, requires users to "learn the framework" to a certain degree. It's purpose is to reduce overall host-side code and be an efficient tool for rapid Vulkan development.
Despite its abstractions, it sticks to the underlying Vulkan concepts.

# Links
- Paper: [Vulkan all the way: Transitioning to a modern low-level graphics API in academia](https://www.cg.tuwien.ac.at/research/publications/2023/unterguggenberger-2023-vaw/unterguggenberger-2023-vaw-paper.pdf)
- Publication in journal: [Computers & Graphics, Volume 111, April 2023, Pages 155-165](https://www.sciencedirect.com/science/article/pii/S0097849323000249)
- [Vulkan Launchpad]([https://github.com/cg-tuwien/Auto-Vk-Toolkit](https://github.com/cg-tuwien/VulkanLaunchpad)): A framework by TU Wien targeted at Vulkan beginners.
- [Auto-Vk](https://github.com/cg-tuwien/Auto-Vk): A low-level convenience and productivity layer for Vulkan
- [Auto-Vk-Toolkit](https://github.com/cg-tuwien/Auto-Vk-Toolkit): C++ framework atop Auto-Vk for rapid prototyping, research, and teaching.
# BibTeX

```tex
@article{unterguggenberger-2023-vaw,
  title =      "Vulkan all the way: Transitioning to a modern low-level
               graphics API in academia",
  author =     "Johannes Unterguggenberger and Bernhard Kerbl and Michael
               Wimmer",
  year =       "2023",
  month =      apr,
  doi =        "10.1016/j.cag.2023.02.001",
  issn =       "1873-7684",
  journal =    "Computers and Graphics",
  pages =      "11",
  volume =     "111",
  publisher =  "Elsevier",
  pages =      "155--165",
  keywords =   "GPU, Graphics API, Programming framework, Real-time
               rendering, Teaching, Vulkan",
  URL =        "https://www.cg.tuwien.ac.at/research/publications/2023/unterguggenberger-2023-vaw/",
}
```              
