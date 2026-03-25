---
title: "Mesh Shaders as Replacement for Hardware Tessellation?"
# last_modified_at: 2026-03-23T00:46:00+01:00
categories:
  - GPU-Programming
tags:
  - Vulkan
  - DirectX
# header:
#   image: /assets/images/1500x500.jpg
---

## Introduction

Mesh shaders represent a notable evolution in modern graphics pipelines. They are often positioned as a potential “silver bullet” capable of replacing the traditional geometry processing stages—namely vertex, tessellation, and geometry shaders. For instance, the [DirectX specification](https://microsoft.github.io/DirectX-Specs/d3d/MeshShader.html) frames their role as follows:

> There will additionally be a new Amplification shader stage, which enables current tessellation scenarios. Eventually the entire vertex pipeline will be two stages: an Amplification shader followed by a Mesh shader.
> [...]
> The Amplification shader allows users to decide how many Mesh shader groups to run and passes data to those groups. The intent for the Amplification shader is to eventually replace hardware tessellators.

It was the latter claim that made me suspicious and motivated me to dive a bit into this topic. 

## Glossary

For this blog post, I have used both Vulkan and DirectX resources. Therefore, terminology is clarified upfront to avoid ambiguity: 

| Term | Explanation |
| ----------- | ----------- |
| "Graphics Pipeline" | A rasterization-based graphics pipeline with classical shader stages, such as vertex shaders and tessellation shaders |
| "Graphics Mesh Pipeline" | A rasterization-based graphics pipeline with task and mesh shaders |
| "Vertex Shading" | Rasterization using a classical graphics pipeline |
| "Mesh Shading" | Rasterization using a graphics mesh pipeline |
| "Task Shader" | First shader stage in graphics mesh pipelines (Vulkan terminology) |
| "Amplification Shader" | First shader stage in graphics mesh pipelines (DirectX terminology) |
| "Mesh Shader" | Second shader stage in graphics mesh pipelines |

_Table 1: Relevant terms, some of which are used in Vulkan, others in DirectX, some in both APIs._

## Faster than Vertex Shading

Early experiments replacing vertex shaders with mesh shaders reported highly promising results. For example, Arseny Kapoulkine demonstrated in [niagara: Tuning mesh shaders](https://www.youtube.com/live/snZkA4D_qjU?si=hun0Du-13pJcWG6R&t=7770) a throughput of **20.7B** rasterized triangles per second with mesh shading, compared to **7.4B/s** using vertex shading.

In our own work on [Conservative Meshlet Bounds for Robust Culling of Skinned Meshes](https://johannesugb.github.io/gpu-programming/conservative-meshlet-bounds-for-robust-culling-of-skinned-meshes/), we observed a less dramatic but still clear performance improvement: With culling disabled in task shaders—ensuring identical geometry workloads—vertex shading rendered the scene shown in _Figure 1_ at 27.1 FPS, whereas mesh shading achieved _32.8 FPS_, corresponding to a **21% speedup** on an RTX 3050 Laptop GPU. Although the primary focus of that work was enabling fine-grained culling for geometrically dense skinned meshes, for this comparison, it is useful to disable culling in task shaders.

![Animated, skinned 3D models)](/assets/images/meshletskinningcullingscreenshotmanyskinnedmeshes.png)   
_Figure 1: A screenshot of our evaluation scene that shows multiple different animated 3D models. Notably, instances of the same model type are _not_ rendered with instanced rendering, but all are individually animated and rendered—they just use the same animation clips and times._

The reasons for the better performance of mesh shaders seem to be the elimination of the input assembly stage and improved parallelism. I also suspected ordering guarantees being a factor, but they still apply to some degree according to the [DirectX specification](https://microsoft.github.io/DirectX-Specs/d3d/MeshShader.html).

## But What About Tessellation?

I had a bit of a hard time finding suitable examples, comparing a hardware tessellation-based implementation to a mesh shading-based implementation, but I was finally able to find one in the book [Introduction to 3D Game Programming with Direct3D 12.0, 2nd edition](https://www.d3dcoder.net/d3d12_v2.htm) and its [accompanying source code](https://github.com/d3dcoder/d3d12book_2ed).
Its example applications "Terrain" and "TerrainMS" both implement triangle subdivision for rendering terrain, using the hardware tessellator and its domain and hull shaders, or amplification and mesh shaders, respectively. _Table 2_ shows screenshots and the resulting rendering and the achieved FPS.

| Terrain | TerrainMS |
| ----------- | ----------- |
| ![DX12 Terrain](/assets/images/Terrain.png) |  ![DX12 TerrainMS](/assets/images/TerrainMS.png) |
| Hardware tessellation | Mesh shading |
| 20.4M triangles   | 20.2M triangles     |
| 144 FPS   | 119 FPS        |

_Table 2: Performance comparisons of a hardware tessellation-based implementation and its mesh shading-based counterpart, both of which subdivide the input terrain to rasterize over 20M triangles, measured on an RTX 4060 Ti._

The performance results in _Table 2_ indicate a +21% performance uplift for good old hardware tessellation.
The difference is even bigger in favor of hardware tessellation in one of own research projects: I've created a mesh shading-based alternative tessellation implementation to replace the hardware tessellation-based implementation of our paper [Fast Rendering of Parametric Objects on Modern GPUs](https://johannesugb.github.io/gpu-programming/fast-rendering-of-parametric-objects-on-modern-gpus/), resulting in a -76% performance downturn for the initial, unoptimized implementation. 
However, the path towards an optimized implementation is a bit unclear to me because even though graphics mesh pipelines offer two relatively generic compute shader-style shader stages, the data transfer between those two can be a bit unwieldy for the following reasons:

In our paper's hardware tessellation-based implementation, we are sending quads (parametric patches) one by one to the hardware rasterizer which subdivides them with factors of up to 64x64. 
The straightforward translation of this approach to task and mesh shaders would be a workgroup size of 1:     
```glsl
layout(local_size_x = 1, local_size_y = 1, local_size_z = 1) in;
```
However, then there are unused lanes in workgroup.
Workgroup size should be set to at least 32 on NVIDIA GPUs, or 64 on AMD GPUs, in order to fully utilize GPU parallelism. 
However, with larger workgroup sizes, there can still be only **one payload** between task and mesh shaders as illustrated in _Figure 2_.

|             |             |
| ----------- | ----------- |
| ![task to mesh shader payload](/assets/images/task-mesh-payload-onelane.png) |  ![task to mesh shader still only one payload](/assets/images/task-mesh-payload-twolanes.png) |
| _Figure 2.1: Data transfer from task shader to mesh shader through a payload_ | _Figure 2.2: Regardless of how many lanes, there is always only one payload per workgroup._ |

_Figure 2: These figures focus on the payload, which is data (typically small) passed from a task shader workgroup to its associated mesh shader instances._

So, we actually want something like 
```glsl
layout(local_size_x = 32, local_size_y = 1, local_size_z = 1) in;
```
but then we get into trouble of how to arrange the size-limited payload in a useful manner and we cannot have different payloads for different lanes.
It may be that an optimized solution exists and that it closes the performance gap (I shall investigate further in future), but the crucial point is that a well-performing implementation is not possible out of the box with mesh shading for all use cases. While the tessellation API is not flawless either, it was suitable quite well to our use case and delivered very fast rendering speed.

## Conclusion

I do not see amplification/task and mesh shaders as a suitable replacement for hardware tessellation in its current form---at least not for every use case. I attribute the reasons mainly to the following limits of payload data and task shader limits:
- There is only one payload per task shader workgroup
- Only the first lane of a workgroup is allowed to declare how many mesh shader instances to spawn for the entire workgroup. (See [SPIR-V registry](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_mesh_shader.html) regarding `EmitMeshTasksEXT`, and the [DirectX specification](https://github.com/microsoft/DirectX-Specs/blob/master/d3d/MeshShader.md) regarding `MeshPayload`).
- Smaller workgroup sizes can typically lead to suboptimal GPU utilization.
- Payload is recommended to be kept small (e.g., below 236 or 108 bytes in the article [Using Mesh Shaders for Professional Graphics](https://developer.nvidia.com/blog/using-mesh-shaders-for-professional-graphics/) by Christoph Kubisch).

While I do believe that heavily optimized mesh shading implementations can reach similar performance as hardware tessellation for some use cases, the tessellation programming interface seems so much simpler---achieving the same goal with much less implementation effort, since GPU vendors have spent so much time in optimally distributing workload across a GPU. This is obvious from, e.g., the description of the _Work Distribution Crossbar_ in [Fast Tessellated Rendering on Fermi](https://www.highperformancegraphics.org/previous/www_2010/media/Hot3D/HPG2010_Hot3D_NVIDIA.pdf) by Tim Purcell: Very complex parallel mechanics behind a relatively simple programming interface.

The only real benefit of amplification/task and mesh shaders I see right now are controlled and well-defined subgroup operations, just like in ordinary compute shaders. Let's see what the future has in store for mesh shading.
