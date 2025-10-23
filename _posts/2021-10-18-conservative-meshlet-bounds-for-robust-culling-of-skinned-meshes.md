---
title: "Conservative Meshlet Bounds for Robust Culling of Skinned Meshes"
last_modified_at: 2025-10-22T17:25:00+02:00
categories:
  - GPU-Programming
tags:
  - Vulkan
  - Paper
# header:
#   image: /assets/images/1500x500.jpg
---

This is the paper page of our paper "Conservative Meshlet Bounds for Robust Culling of Skinned Meshes" which has been accepted and presented at [Pacific Graphics 2021](https://www.pg2021.org/).

{: .center}
[![Terrain and skinned character model divided into meshlets](/assets/images/msh-header-image.png)](/assets/images/msh-header-image.png)

_Figure 1:_ Both static (terrain) and animated (skinned character) models are divided into small clusters of geometry---so called "meshlets". 

# Authors

<div style="display:block; text-align: center; padding-bottom: 1em;">
  <a href="https://www.cg.tuwien.ac.at/staff/JohannesUnterguggenberger">Johannes Unterguggenberger</a>, <a href="https://www.cg.tuwien.ac.at/staff/BernhardKerbl">Bernhard Kerbl</a>, Jakob Pernsteiner, <a href="https://www.cg.tuwien.ac.at/staff/MichaelWimmer">Michael Wimmer</a>
</div>
<div style="display:block; text-align: center;">
  TU Wien
</div>

# Abstract

Following recent advances in GPU hardware development and newly introduced rendering pipeline extensions, the segmentation of input geometry into small geometry clusters-so-called meshlets-has emerged as an important practice for efficient rendering of complex 3D models. Meshlets can be processed efficiently using mesh shaders on modern graphics processing units, in order to achieve streamlined geometry processing in just two tightly coupled shader stages that allow for dynamic workload manipulation in-between. The additional granularity layer between entire models and individual triangles enables new opportunities for fine-grained visibility culling methods. However, in contrast to static models, view frustum and backface culling on a per-meshlet basis for skinned, animated models are difficult to achieve while respecting the conservative spatio-temporal bounds that are required for robust rendering results. In this paper, we describe a solution for computing and exploiting relevant conservative bounds for culling meshlets of models that are animated using linear blend skinning. By enabling visibility culling for animated meshlets, our approach can help to improve rendering performance and alleviate bottlenecks in the notoriously performanceand memory-intensive skeletal animation pipelines of modern real-time graphics applications.

# Details

We describe an algorithm to compute conservative bounds for each meshlet of a skinned and animated 3D model, such as depicted in _Figure 2_. While computing consevative bounds for static geometry (such as the terrain in _Figure 1_) is trivial, it is more complex for animated models because the bounds of animated meshlets can change, leading to varying extents of a meshlet. Furthermore, a meshlet's face normals distribution changes, which needs to be taken into account to enable backface culling on a per-meshlet basis. _Figure 3_ shows initial bounds of one specific meshlet, which might not be true for animated states of that particular meshlet. 

<div style="display:block;">
   <div style="float:left; width:50%; padding:4% 3% 4% 5%; text-align:center; font-size:0.9em;">
    <a href="/assets/images/msh-meshlet-on-skin.png" class="image-popup"><img src="/assets/images/msh-meshlet-on-skin.png" alt="One meshlet highlighted of a skinned character model"/></a><br/>
     <em>Figure 2:</em> One meshlet of a character model's skin is highlighted.
  </div>
  <div style="float:left; width:50%; padding:4% 5% 4% 3%; text-align:center; font-size:0.9em;">
    <a href="/assets/images/msh-meshlet-bounds.png" class="image-popup"><img src="/assets/images/msh-meshlet-bounds.png" alt="Initial meshlet bounds"/></a><br/>
     <em>Figure 3:</em> Initial meshlet bounds for a selected meshlet, showing the spatial bounding box and a cone representing its face normals distribution.
  </div>
</div>

In our paper, we describe an approach that leads to conserative meshlet bounds, so that fine-grained view-frustum culling and backface culling can be enabled while avoiding rendering errors from prematurely culled meshlets, as it could occur without conservative meshlet bounds. _Figure 4_ shows the effect of fine-grained culling along some frustum planes marked in blue.

{: .center}
[![Fine-grained view frustum culling](/assets/images/msh-meshlet-culling.png)](/assets/images/msh-meshlet-culling.png)

_Figure 4:_ Based on their conservative bounds, fine-grained view frustum culling on a per-meshlet basis along frustum planes can be enabled.

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
