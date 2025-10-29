---
title: "Fast Rendering of Parametric Objects on Modern GPUs"
last_modified_at: 2025-10-29T13:12:00+01:00
categories:
  - GPU-Programming
tags:
  - Vulkan
  - Paper
---

This is the paper page of our paper "Fast Rendering of Parametric Objects on Modern GPUs", which has been accepted for 
[The Eurographics Symposium on Parallel Graphics and Visualization (EGPGV) ](https://www.egpgv.org/2024/). It was presented on May 27th, 2024, in Odense, Denmark,
where it was decorated as [Best Paper](https://www.cg.tuwien.ac.at/news/2024-06-07-Best-Paper-Award-EGPGV2024).

{: .center}
[![Various different kinds of parametric objects that can be enabled in the UI of our tool](/assets/images/fropo-ui.png)](/assets/images/fropo-ui.png)

_Figure 1:_ This is a screenshot from our application, the source code of which we have released on GitHub. It shows a variety of different parametric objects which are all just described by a parametric function with zero storage cost. Our proposed algorithm can render them with high frame rates in real time.

# Authors

<div style="display:block; text-align: center; padding-bottom: 1em;">
  <a href="https://www.cg.tuwien.ac.at/staff/JohannesUnterguggenberger">Johannes Unterguggenberger</a>, 
  <a href="https://www.cg.tuwien.ac.at/staff/LukasLipp">Lukas Lipp</a>, 
  <a href="https://www.cg.tuwien.ac.at/staff/MichaelWimmer">Michael Wimmer</a>,
  <a href="https://www.cg.tuwien.ac.at/staff/BernhardKerbl">Bernhard Kerbl</a>, 
  and <a href="https://www.cg.tuwien.ac.at/staff/MarkusSchuetz">Markus Schütz</a>, 
</div>
<div style="display:block; text-align: center;">
  TU Wien
</div>

# Abstract

Parametric functions are an extremely efficient representation for 3D geometry, capable of compactly modelling highly complex objects. Once specified, parametric 3D objects allow for visualization at arbitrary levels of detail, at no additional memory cost, limited only by the amount of evaluated samples. However, mapping the sample evaluation to the hardware rendering pipelines of modern graphics processing units (GPUs) is not trivial. This has given rise to several specialized solutions, each targeting interactive rendering of a constrained set of parametric functions. In this paper, we propose a general method for efficient rendering of parametrically defined 3D objects. Our solution is carefully designed around modern hardware architecture. Our method adaptively analyzes, allocates and evaluates parametric function samples to produce high-quality renderings. Geometric precision can be modulated from few pixels down to sub-pixel level, enabling real-time frame rates of several 100 frames per second (FPS) for various parametric functions. We propose a dedicated level-of-detail (LOD) stage, which outputs patches of similar geometric detail to a subsequent rendering stage that uses either a hardware tessellation-based approach or performs point-based softare rasterization. Our method requires neither preprocessing nor caching, and the proposed LOD mechanism is fast enough to run each frame. Hence, our approach also lends itself to animated parametric objects. We demonstrate the benefits of our method over a state-of-the-art spherical harmonics (SH) glyph rendering method, while showing its flexibility on a range of other demanding shapes.

# Details

Our techhnique proposes the usage of so-called _parametric functions_ to describe an object with arbitrary geometric precision, limited only by floating point accuracy. An object described in such a manner has almost zero initial storage cost, actually only four `float` values, describing the patch bounds plus some auxiliary data (i.e., a few bytes in total). _Patches_ are actually the new graphics primitive, so to say. They represent the surface of an object and are distorted and brought into shape through parametric functions, to form a _parametric object_. This process is illustrated in _Figure 2_. 

[![Patch into parametric object](/assets/images/fropo-patch-to-object.png)](/assets/images/fropo-patch-to-object.png)

_Figure 2:_ Patch into parametric object.

Parametric functions can be arbitrarily defined by users and our algorithm even supports dynamic and instantaneous changes to them, re-evaluating parametric functions and their associated patches with respect to the camera every frame. Hence, animated parametric objects are intrinsically supported.
Our technique allows rendering in arbitrary precision, constantly evaluating and subdividing the initial patches until user-defined quality criteria are met. Such a criterium could be that a parametric object shall be rendered with (approximately) pixel-perfect geometric precision. 
_Figure 3_ shows how our rendering pipeline evaluates patches of different parametric objects, and that it splits patches into sub-patches if it finds that quality criteria cannot be met.

[![Patch evaluation insights](/assets/images/fropo-patch-eval.png)](/assets/images/fropo-patch-eval.png)

_Figure 3:_ Patch evaluation insights.

It shall be noted that during patch subdivision, there are some temporary storage costs---namely to store the bounds of the subdivided patches. While storage cost is not zero during our overarching rendering setup, it is still very low. 
Example: Even for a million (subdivided) patches, the total storage costs are typically less than 20 megabytes.
Patch subdivision is a crucial step of our rendering technique. _Figure 4_ shows an overview of all steps of our technique.

[![Algorithm overview](/assets/images/fropo-algorithm.png)](/assets/images/fropo-algorithm.png)

_Figure 4:_ Algorithm overview.


# Links
- Paper: [Fast Rendering of Parametric Objects on Modern GPUs](https://www.cg.tuwien.ac.at/research/publications/2024/unterguggenberger-2024-fropo/unterguggenberger-2024-fropo-paper.pdf)
- [Paper page](https://www.cg.tuwien.ac.at/research/publications/2024/unterguggenberger-2024-fropo/) on the [Research Unit of Computer Graphics](https://www.cg.tuwien.ac.at/)'s website, TU Wien
- [Teaser trailer](https://youtu.be/7MRtG_Afl9Y?si=zfsxJd1W7M-wqiwK) on YouTube
- Source code: [FastRenderingOfParametricObjects](https://github.com/cg-tuwien/FastRenderingOfParametricObjects) on GitHub 

# BibTeX

```tex
@inproceedings{unterguggenberger-2024-fropo,
  title =      "Fast Rendering of Parametric Objects on Modern GPUs",
  author =     "Johannes Unterguggenberger and Lukas Lipp and Michael Wimmer
               and Bernhard Kerbl and Markus Sch\"{u}tz",
  year =       "2024",
  month =      may,
  isbn =       "978-3-03868-243-1",
  publisher =  "The Eurographics Association",
  location =   "Odense",
  event =      "Eurographics Symposium on Parallel Graphics and
               Visualization (2024)",
  doi =        "10.2312/pgv.20241129",
  booktitle =  "EGPGV24: Eurographics Symposium on Parallel Graphics and
               Visualization",
  pages =      "12",
  keywords =   "Tessellation Shaders, Point-Based Rendering, Parametric
               Objects, Fast Rendering, Modern GPUs",
  URL =        "https://www.cg.tuwien.ac.at/research/publications/2024/unterguggenberger-2024-fropo/",
}
```              
