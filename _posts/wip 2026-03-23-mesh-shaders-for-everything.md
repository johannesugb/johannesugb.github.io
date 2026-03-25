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

Mesh shaders are an interesting addition to graphics pipelines and sometimes, they are advocated as a sort-of silver bullet to replace all the geometry stages or graphics pipelines, like the [DirectX specification](https://microsoft.github.io/DirectX-Specs/d3d/MeshShader.html), 
which reads like this:

> There will additionally be a new Amplification shader stage, which enables current tessellation scenarios. Eventually the entire vertex pipeline will be two stages: an Amplification shader followed by a Mesh shader.
> [...]
> The Amplification shader allows users to decide how many Mesh shader groups to run and passes data to those groups. The intent for the Amplification shader is to eventually replace hardware tessellators.

It was in particular the latter argument that made me suspicious and dive a bit into this topic. 

## Terminology

For this blog post, I have used both, Vulkan resources and DirectX resources, so I'd like to clarify terminology upfront to avoid confusion:   

| Term | Explanation |
| ----------- | ----------- |
| "Graphics Pipeline" | A rasterization-based graphics pipeline with classical shader stages, such as vertex shaders and tessellation shaders |
| "Graphics Mesh Pipeline" | A rasterization-based graphics pipeline with task and mesh shaders |
| "Vertex Shading" | Rasterization using a classical graphics pipeline |
| "Mesh Shading" | Rasterization using a graphics mesh pipeline |
| "Task Shader" | First shader stage in graphics mesh pipelines (Vulkan terminology) |
| "Amplification Shader" | First shader stage in graphics mesh pipelines (DirectX terminology) |
| "Mesh Shader" | Second shader stage in graphics mesh pipelines |

## Early results 

Early results of replacing vertex shaders with mesh shaders looked very promising, like the results presented by Arseny Kapoulkine in [niagara: Tuning mesh shaders](https://www.youtube.com/live/snZkA4D_qjU?si=hun0Du-13pJcWG6R&t=7770): In his experiments, he achieved rasterizing 20.7 billion triangles per second with mesh shading vs. 7.4 billion triangles per second with vertex shading.

We saw a less pronounced, but still clear, performance uplift of mesh shading over vertex shading in our own research on [Conservative Meshlet Bounds for Robust Culling of Skinned Meshes](https://johannesugb.github.io/gpu-programming/conservative-meshlet-bounds-for-robust-culling-of-skinned-meshes/): With fine-grained culling deactivated in task shaders, i.e., with the same geometry load for both configurations, vertex shading renders the scene shown in _Figure 1_ with 27.1 FPS, while mesh shading achieves 32.8 FPS, which is +21% rendering speed (measured on an RTX 3050 Laptop GPU). The point of our paper was actually to enable fine-grained culling for geometrically dense skinned meshes, but for the sake of this comparison it is useful to disable culling.

![Animated, skinned 3D models)](/assets/images/meshletskinningcullingscreenshotmanyskinnedmeshes.png)   
_Figure 1:_ A screenshot of our evaluation scene that shows multiple different animated 3D models. It is noteworthy that instances of the same model type are _not_ rendered with instanced renderig, but all are individually animated and rendered---they just use the same animation clips and times.

## But what about tessellation

It was a bit hard to find good examples on this, but I got one from the book [Introduction to 3D Game Programming with Direct3D 12.0, 2nd edition](https://www.d3dcoder.net/d3d12_v2.htm) and its [accompanying source code](https://github.com/d3dcoder/d3d12book_2ed).

Comparison between the "Terrain" and "TerrainMS" examples:

| Terrain | TerrainMS |
| ----------- | ----------- |
| ![DX12 Terrain)](/assets/images/Terrain.png) |  ![DX12 TerrainMS)](/assets/images/TerrainMS.png) |
| 20.4M triangles   | 20.2M triangles     |
| 144 FPS   | 119 FPS        |

on an RTX 4060 Ti

but even harder in our own research, because, how do you even distribute the workload? 

Some properties (and limitations?) of task and mesh shaders:
- Maximum payload size: 16KB
- Maximum number of spawnable mesh shaders from a task shader (workgroup): 4 million
- However, _from a workgroup_ (not from individual threads!!)
- Only one payload per task shader workgroup

And that latter point is the crux of the matter. How do you even distribute workload, if only the first lane spawns? See [SPIR-V registry](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_mesh_shader.html) regarding `EmitMeshTasksEXT`: 

> The arguments are taken from the first invocation in each workgroup. Behaviour is undefined if any invocation terminates without executing this instruction, or if any invocation executes this instruction in non-uniform control flow.

But also the [DirectX specification](https://github.com/microsoft/DirectX-Specs/blob/master/d3d/MeshShader.md): 

> The arguments are treated as uniform for the group, meaning that they are read from the first thread if not group-uniform (or groupshared). The intended use is to have the whole group of threads cooperate on constructing the MeshPayload.

Naja, und Tessellator is halt suuuuper-parallel, u know.
