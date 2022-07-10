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
  <div style="float:left; width:20%; text-align:center; font-size:small;">
    <a href="https://johannesugb.github.io/">Johannes<br/>Unterguggenberger</a><br/>
    TU Wien
  </div>
  <div style="float:left; width:20%; text-align:center; font-size:small;">
    <a href="https://www.cg.tuwien.ac.at/staff/BernhardKerbl">Bernhard<br/>Kerbl</a><br/>
    TU Wien
  </div>
  <div style="float:left; width:20%; text-align:center; font-size:small;">
    <a href="https://www.markussteinberger.net/">Markus<br/>Steinberger</a><br/>
    TU Wien
  </div>
  <div style="float:left; width:20%; text-align:center; font-size:small;">
    <a href="https://www.tugraz.at/institute/icg/research/team-schmalstieg/">Dieter<br/>Schmalstieg</a><br/>
    TU Wien
  </div>
  <div style="float:left; width:20%; text-align:center; font-size:small;">
    <a href="https://www.cg.tuwien.ac.at/staff/MichaelWimmer">Michael<br/>Wimmer</a><br/>
    TU Wien
  </div>
</div>              

# Abstract

Efficient rendering of multiple views can be a critical performance factor for real-time rendering applications. Generating more than one view multiplies the amount of rendered geometry, which can cause a huge performance impact. Minimizing that impact has been a target of previous research and GPU manufacturers, who have started to equip devices with dedicated acceleration units. However, vendor-specific acceleration is not the only option to increase multi-view rendering (MVR) performance. Available graphics API features, shader stages and optimizations can be exploited for improved MVR performance, while generally offering more versatile pipeline configurations, including the preservation of custom tessellation and geometry shaders. In this paper, we present an exhaustive evaluation of MVR pipelines available on modern GPUs. We provide a detailed analysis of previous techniques, hardware-accelerated MVR and propose a novel method, leading to the creation of an MVR catalogue. Our analyses cover three distinct applications to help gain clarity on overall MVR performance characteristics. Our interpretation of the observed results provides a guideline for selecting the most appropriate one for various use cases on different GPU architectures.


