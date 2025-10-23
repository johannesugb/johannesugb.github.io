---
title: "The Road to Vulkan: Teaching Modern Low-Level APIs in Introductory Graphics Courses"
last_modified_at: 2025-10-22T17:30:00+02:00
categories:
  - GPU-Programming
tags:
  - Vulkan
  - Paper
# header:
#   image: /assets/images/1500x500.jpg
---

This is the paper page of our paper "The Road to Vulkan: Teaching Modern Low-Level APIs in Introductory Graphics Courses" which has been accepted and presented at [Eurographics 2022](https://eg2022.univ-reims.fr/) in Reims, France.

{: .center}
[![Differences between OpenGL and Vulkan](/assets/images/vlk-differences-gl-vk.png)](/assets/images/vlk-differences-gl-vk.png)

_Figure 1:_ Differences between OpenGL and Vulkan. We argue that the highlighted aspects in the middle of the slide speak in favor of using Vulkan in introductory graphics courses.

# Authors

<div style="display:block; text-align: center; padding-bottom: 1em;">
  <a href="https://www.cg.tuwien.ac.at/staff/JohannesUnterguggenberger">Johannes Unterguggenberger</a>, <a href="https://www.cg.tuwien.ac.at/staff/BernhardKerbl">Bernhard Kerbl</a>, Jakob Pernsteiner, <a href="https://www.cg.tuwien.ac.at/staff/MichaelWimmer">Michael Wimmer</a>
</div>
<div style="display:block; text-align: center;">
  TU Wien
</div>

# Abstract

For over two decades, the OpenGL API provided users with the means for implementing versatile, feature-rich, and portable real-time graphics applications. Consequently, it has been widely adopted by practitioners and educators alike and is deeply ingrained in many curricula that teach real-time graphics for higher education. Over the years, the architecture of graphics processing units (GPUs) incrementally diverged from OpenGL's conceptual design. The more recently introduced Vulkan API provides a more modern, fine-grained approach for interfacing with the GPU. Various properties of this API and overall trends suggest that Vulkan could soon replace OpenGL in many areas. Hence, it stands to reason that educators who have their students' best interests at heart should provide them with corresponding lecture material. However, Vulkan is notoriously verbose and rather challenging for first-time users, thus transitioning to this new API bears a considerable risk of failing to achieve expected teaching goals. In this paper, we document our experiences after teaching Vulkan in an introductory graphics course side-by-side with conventional OpenGL. A final survey enables us to draw conclusions about perceived workload, difficulty, and students' acceptance of either approach and identify suitable conditions and recommendations for teaching Vulkan to undergraduate students.

# Details

We argue that teaching and learning Vulkan in introductory graphics courses already comes with the benefit of a deep understanding of the underlying graphics hardware. For one thing, is it a much more modern API (as indicated in _Figure 1_) and is therefore aligned much better with modern hardware and requirements (e.g., in terms of concurrency on the host-side). Furthermore, thanks to its low-level nature, it abstracts modern GPUs on a lower level, giving more insights to what is going on under the hood, while with OpenGL a lot of that is abstracted away and handled by the drivers.
We were successfully able to transition the programming framework and lecture materials used in our course ["Introduction to Computer Graphics"](https://www.cg.tuwien.ac.at/courses/EinfCG/UE/2021W) to Vulkan. 

{: .center}
[![OpenGL framework vs. Vulkan framework in our course](/assets/images/vlk-framework-differences.png)](/assets/images/vlk-framework-differences.png)

_Figure 2:_ Overview of the differences between the two frameworks used for the OpenGL route vs. the Vulkan route in our introductory graphics course.

In order to stay within the workload boundaries for our students (which are 3 credit hours according to the [European Credit Transfer and Accumulation System](https://education.ec.europa.eu/education-levels/higher-education/inclusive-and-connected-higher-education/european-credit-transfer-and-accumulation-system)), we had to add some abstractions to our Vulkan programming framework since otherwise, the workload and the lines of code to be implemented by our students would have been too high. The overview of these differences is shown in _Figure 2_.

In particular, we abstracted the following parts of Vulkan through our framework:
- Swap chain handling and its synchronization
- Render pass creation
- Framebuffer creation
- Parts of graphics pipeline creation
- Memory management

This led to a manageable workload for our students and we got positive feedback. Students enjoyed learning a modern, relevant graphics API which gives insights into the inner workings of modern GPUs. 

In terms of lectures, we created the [Vulkan Lecture Series](https://www.youtube.com/playlist?list=PLmIqTlJ6KsE1Jx5HV4sd2jOe3V1KMHHgn), which represents the way how we think that Vulkan should be introduced properly. It has been perceived well and has even been listed on Khronos' very own [vulkan.org](https://www.vulkan.org/) under the learning resources in the [tutorials](https://www.vulkan.org/learn#vulkan-tutorials) section.

# Links
- Paper: [The Road to Vulkan: Teaching Modern Low-Level APIs in Introductory Graphics Courses](https://www.cg.tuwien.ac.at/research/publications/2022/unterguggenberger-2022-vulkan/unterguggenberger-2022-vulkan-paper.pdf)
- Talk: [Pre-recorded (backup) talk for Eurographics 2022](https://youtu.be/ZG0ct4V6c0k)
- Slides: [The Road to Vulkan: Teaching Modern Low-Level APIs in Introductory Graphics Courses Slides](https://www.cg.tuwien.ac.at/research/publications/2022/unterguggenberger-2022-vulkan/unterguggenberger-2022-vulkan-slides.pdf)

# BibTeX

```tex
@inproceedings{unterguggenberger-2022-vulkan,
  title =      "The Road to Vulkan: Teaching Modern Low-Level APIs in
               Introductory Graphics Courses",
  author =     "Johannes Unterguggenberger and Bernhard Kerbl and Michael
               Wimmer",
  year =       "2022",
  month =      apr,
  booktitle =  "Eurographics 2022 - Education Papers",
  event =      "Eurographics 2022",
  isbn =       "978-3-03868-170-0",
  issn =       "1017-4656",
  location =   "Reims",
  pages =      "31--39",
  keywords =   "vulkan, gpu, opengl",
  URL =        "https://www.cg.tuwien.ac.at/research/publications/2022/unterguggenberger-2022-vulkan/",
}
```              
