---
title: "Fast Multi-View Rendering for Real-Time Applications (Paper Page)"
# last_modified_at: 2022-06-10T01:20:00+02:00
categories:
  - GPU-Programming
tags:
  - OpenGL
  - Paper
# header:
#   image: /assets/images/1500x500.jpg
---

<div style="display:block;">
   <div style="float:left; width:50%; padding:4% 3% 4% 5%; text-align:center; font-size:0.9em;">
    <a href="/assets/images/fmvr-perf-ovr-multiview.png" class="image-popup"><img src="/assets/images/fmvr-perf-ovr-multiview.png" alt="Performance of OVR multiview variants examined in our paper"/></a><br/>
     <em>Figure 1:</em> Performance numbers of the (hardware-accelerated) "OVR multiview" pipeline variants examined in our paper.
  </div>
  <div style="float:left; width:50%; padding:4% 5% 4% 3%; text-align:center; font-size:0.9em;">
    <a href="/assets/images/fmvr-perf-geom-shader-inst.png" class="image-popup"><img src="/assets/images/fmvr-perf-geom-shader-inst.png" alt="Performance of geometry shader instancing variants examined in our paper"/></a><br/>
     <em>Figure 2:</em> Performance numbers of the geometry shader instancing-based pipeline variants examined in our paper.
  </div>
</div>

<div style="display:block;">
  <div style="float:left; width:20%; text-align:center; font-size:0.8em;">
    <a href="https://johannesugb.github.io/">Johannes<br/>Unterguggenberger</a><br/>
    TU Wien
  </div>
  <div style="float:left; width:20%; text-align:center; font-size:0.8em;">
    <a href="https://www.cg.tuwien.ac.at/staff/BernhardKerbl">Bernhard<br/>Kerbl</a><br/>
    TU Wien
  </div>
  <div style="float:left; width:20%; text-align:center; font-size:0.8em;">
    <a href="https://www.markussteinberger.net/">Markus<br/>Steinberger</a><br/>
    Graz University of Technology
  </div>
  <div style="float:left; width:20%; text-align:center; font-size:0.8em;">
    <a href="https://www.tugraz.at/institute/icg/research/team-schmalstieg/">Dieter<br/>Schmalstieg</a><br/>
    Graz University of Technology
  </div>
  <div style="float:left; width:20%; text-align:center; font-size:0.8em;">
    <a href="https://www.cg.tuwien.ac.at/staff/MichaelWimmer">Michael<br/>Wimmer</a><br/>
    TU Wien
  </div>
</div>
<p>&nbsp;</p>

# Abstract

Efficient rendering of multiple views can be a critical performance factor for real-time rendering applications. Generating more than one view multiplies the amount of rendered geometry, which can cause a huge performance impact. Minimizing that impact has been a target of previous research and GPU manufacturers, who have started to equip devices with dedicated acceleration units. However, vendor-specific acceleration is not the only option to increase multi-view rendering (MVR) performance. Available graphics API features, shader stages and optimizations can be exploited for improved MVR performance, while generally offering more versatile pipeline configurations, including the preservation of custom tessellation and geometry shaders. In this paper, we present an exhaustive evaluation of MVR pipelines available on modern GPUs. We provide a detailed analysis of previous techniques, hardware-accelerated MVR and propose a novel method, leading to the creation of an MVR catalogue. Our analyses cover three distinct applications to help gain clarity on overall MVR performance characteristics. Our interpretation of the observed results provides a guideline for selecting the most appropriate one for various use cases on different GPU architectures.

# Details

We investigate the performance of over 50 graphics pipeline variants for the task of rendering multiple views of a scene. To describe the different configurations efficiently, we introduce the notation shown in _Figure 3_. The "(Accelerated) OVR geometry amplification" variants (performance numbers of which are shown in _Figure 1_) turned out to be among the best-performing pipeline variants, as could be expected. However, for some setups other pipeline variants turned out to be faster. Geometry shader instancing-based pipeline configurations (performance numbers of which are shown in _Figure 2_) performed particularly well in many situations.

<p class="center">
  <a href="/assets/images/fmvr-list-of-symbols.png" class="image-popup"><img style="width:50%" src="/assets/images/fmvr-list-of-symbols.png" alt="List of symbols"/></a>
<p>
  
_Figure 3:_ List of symbols used in our paper to distinguish the different configuration parameters of graphics pipelines examined in our paper. Fundamental distinguishing features of each variant can be described in terms of the way how "Geometry Amplification" is performed and its target "Framebuffer Layout". Some variants have additional "Culling & Clipping" properties.

In our paper, we compare all variants to our selected baseline multiview variant: simple multi-pass rendering into separate framebuffers (in terms of our symbols, this is described with "Direct forwarding" and "Separate framebuffer objects"). We also provide a sequence diagram to describe our baseline, which is shown in _Figure 4_. 

<p class="center">
  <a href="/assets/images/fmvr-multipass-seqdiag.png" class="image-popup"><img style="width:50%" src="/assets/images/fmvr-multipass-seqdiag.png" alt="Sequence diagram of simple multi-pass rendering"/></a>
<p>
  
_Figure 4:_ Sequence diagram, describing our baseline multiview variant, namely simple multi-pass rendering into separate framebuffers.

# BibTeX

```tex
@inproceedings{unterguggenberger-2020-fmvr,
  title =      "Fast Multi-View Rendering for Real-Time Applications",
  author =     "Johannes Unterguggenberger and Bernhard Kerbl and Markus
               Steinberger and Dieter Schmalstieg and Michael Wimmer",
  year =       "2020",
  month =      may,
  booktitle =  "Eurographics Symposium on Parallel Graphics and
               Visualization",
  doi =        "10.2312/pgv.20201071",
  editor =     "Frey, Steffen and Huang, Jian and Sadlo, Filip",
  event =      "EGPGV 2020",
  isbn =       "978-3-03868-107-6",
  location =   "online",
  organization = "Eurographics",
  pages =      "13--23",
  keywords =   "Real-Time Rendering, Rasterization, Multi-View,
               OVR_multiview, Geometry Shader, Evaluation",
  URL =        "https://www.cg.tuwien.ac.at/research/publications/2020/unterguggenberger-2020-fmvr/",
}
```

# Links


