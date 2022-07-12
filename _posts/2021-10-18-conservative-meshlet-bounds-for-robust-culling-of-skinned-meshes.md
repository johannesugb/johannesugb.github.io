---
title: "Conservative Meshlet Bounds for Robust Culling of Skinned Meshes (Paper Page)"
last_modified_at: 2022-07-12T12:55:00+02:00
categories:
  - GPU-Programming
tags:
  - Vulkan
  - Paper
# header:
#   image: /assets/images/1500x500.jpg
---

{: .center}
[![Terrain and skinned character model divided into meshlets](/assets/images/msh-header-image.png)](/assets/images/msh-header-image.png)

_Figure 1:_ Both static (terrain) and animated (skinned character) models are divided into small clusters of geometry---so called "meshlets". 


<div style="display:block;">
  <div style="float:left; width:25%; text-align:center; font-size:0.9em;">
    <a href="https://johannesugb.github.io/">Johannes<br/>Unterguggenberger</a><br/>
    TU Wien
  </div>
  <div style="float:left; width:25%; text-align:center; font-size:0.9em;">
    <a href="https://www.cg.tuwien.ac.at/staff/BernhardKerbl">Bernhard<br/>Kerbl</a><br/>
    TU Wien
  </div>
  <div style="float:left; width:25%; text-align:center; font-size:0.9em;">
    <a href="https://www.markussteinberger.net/">Jakob<br/>Pernsteiner</a><br/>
    TU Wien
  </div>
  <div style="float:left; width:25%; text-align:center; font-size:0.9em;">
    <a href="https://www.cg.tuwien.ac.at/staff/MichaelWimmer">Michael<br/>Wimmer</a><br/>
    TU Wien
  </div>
</div>
<p>&nbsp;</p>

# Abstract

Following recent advances in GPU hardware development and newly introduced rendering pipeline extensions, the segmentation of input geometry into small geometry clusters-so-called meshlets-has emerged as an important practice for efficient rendering of complex 3D models. Meshlets can be processed efficiently using mesh shaders on modern graphics processing units, in order to achieve streamlined geometry processing in just two tightly coupled shader stages that allow for dynamic workload manipulation in-between. The additional granularity layer between entire models and individual triangles enables new opportunities for fine-grained visibility culling methods. However, in contrast to static models, view frustum and backface culling on a per-meshlet basis for skinned, animated models are difficult to achieve while respecting the conservative spatio-temporal bounds that are required for robust rendering results. In this paper, we describe a solution for computing and exploiting relevant conservative bounds for culling meshlets of models that are animated using linear blend skinning. By enabling visibility culling for animated meshlets, our approach can help to improve rendering performance and alleviate bottlenecks in the notoriously performanceand memory-intensive skeletal animation pipelines of modern real-time graphics applications.

# Links
- Paper: [Conservative Meshlet Bounds for Robust Culling of Skinned Meshes](https://www.cg.tuwien.ac.at/research/publications/2021/unterguggenberger-2021-msh/unterguggenberger-2021-msh-paper.pdf)
- Framework used for the implementation: [github.com/cg-tuwien/Gears-Vk](https://github.com/cg-tuwien/Gears-Vk)
- Talk: [Pre-recorded talk as presented at Pacific Graphics 2021](https://youtu.be/auE3AF7B06A)
- Slides: [Conservative Meshlet Bounds for Robust Culling of Skinned Meshes](https://www.cg.tuwien.ac.at/research/publications/2021/unterguggenberger-2021-msh/unterguggenberger-2021-msh-slides.pdf)

# BibTeX

```tex
@article{unterguggenberger-2021-msh,
  title =      "Conservative Meshlet Bounds for Robust Culling of Skinned
               Meshes",
  author =     "Johannes Unterguggenberger and Bernhard Kerbl and Jakob
               Pernsteiner and Michael Wimmer",
  year =       "2021",
  month =      oct,
  doi =        "10.1111/cgf.14401",
  issn =       "1467-8659",
  journal =    "Computer Graphics Forum",
  number =     "7",
  volume =     "40",
  pages =      "57--69",
  keywords =   "real-time rendering, meshlet, mesh shader, task shader, view
               frustum culling, backface culling, Vulkan, vertex skinning,
               animation, conservative bounds, bounding boxes, Rodrigues'
               rotation formula, spatio-temporal bounds",
  URL =        "https://www.cg.tuwien.ac.at/research/publications/2021/unterguggenberger-2021-msh/",
}
```              
