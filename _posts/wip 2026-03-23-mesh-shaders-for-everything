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

## Early results 

Looked promising, see Arseny (20B/s vs 7B/s), also see our Meshlet Skinning Culling Paper (always faster by 10% even without culling).

## But what about tessellation

It was a bit hard to find good examples on this, but I got one from the book [Introduction to 3D Game Programming with Direct3D 12.0, 2nd edition](https://www.d3dcoder.net/d3d12_v2.htm) and its [accompanying source code](https://github.com/d3dcoder/d3d12book_2ed).

Comparison between the "Terrain" and "TerrainMS" examples:

| Terrain | TerrainMS |
| ----------- | ----------- |
| [![DX12 Terrain)](/assets/images/Terrain.png) |  [![DX12 TerrainMS)](/assets/images/TerrainMS.png) |
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
