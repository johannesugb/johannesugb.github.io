---
title: "Vulkan Synchronization Validation - Key Items"
# last_modified_at: 2021-02-06T18:00:00+01:00
categories:
  - Vulkan
tags:
  - Vulkan
  - synchronization
# header:
#   image: /assets/images/1500x500.jpg
---

Vulkan snchronization validation has reached version 1.0 as reported by [LunarG](www.lunarg.com) on January 13th, 2021. They published an official documentation of if, titled "[Guide to Vulkan Synchronization Validation](https://www.lunarg.com/wp-content/uploads/2021/01/Final_Guide-to-Vulkan-Synchronization-Validation_Jan_21.pdf)". This article contains the key items of if (sort of a "TL;DR" which might be useful for those are already somewhat familiar with Vulkan synchronization) as well as a quickstart guide how to enable it.

If you are not yet familiar with synchronization, here are two recommendations:
- My [Introduction to Vulkan lecture](https://youtu.be/isbMMIwmZes), where I start to talk about synchronization from [22:30](https://youtu.be/isbMMIwmZes?t=1350) onwards.
- The great "[Yet another blog explaining Vulkan synchronization](http://themaister.net/blog/2019/08/14/yet-another-blog-explaining-vulkan-synchronization)" blog post by [Themaister](https://themaister.net/about.html) which really got me up to speed in terms of Vulkan synchronization.

Here's a list of potential sources for common synchronization mistakes, which are also hinted from LunarG's [Guide to Vulkan Synchronization Validation](https://www.lunarg.com/wp-content/uploads/2021/01/Final_Guide-to-Vulkan-Synchronization-Validation_Jan_21.pdf):
- Memory access always has to be specified explicitly, except with Semaphore signal/wait operations
- Stage/access pairs must match according to [Table 4 under 7.1.3. Access Types in the Vulkan Specification](https://www.khronos.org/registry/vulkan/specs/1.2-extensions/html/vkspec.html#synchronization-access-types)
- For implicit subpass dependencies, still memory barriers are required.
- Image layout transitions are read _and_ write operations and therefore, require memory dependencies
- All stage/access scopes must be specified where an operation could load/store data -- i.e. "color" and "depth/stencil" are different stages within a graphics pipeline. Stage/access combinations must be specified precisely according to an application's requirements.

## Integrate Synchronization Validation - Quickstart 

## Key Items from LunarG's Documentation

In the following, I'll list the key items from LunarG's [Guide to Vulkan Synchronization Validation](https://www.lunarg.com/wp-content/uploads/2021/01/Final_Guide-to-Vulkan-Synchronization-Validation_Jan_21.pdf)", i.e. it shall serve as a "TL;DR"-version of the document:

**General Information**    
Operations are executed in a massively parallel manner on modern GPUs. Whenever the _same region of memory_  is used by subsequent operations on a GPU _in different ways_ some kind of synchronization must be established to guarantee correct behavior of an application, or -- even more importantly -- to prevent undefined results/behavior.

There are different types of hazards (where _W_ means writing to the same region of memory, and _R_ means reading from the same region of memory):
- **W -> R** a.k.a. "RAW" a.k.a. "read after write": Problem = R proceeds without waiting for the results of W, potentially reading old data.
- **R -> W** a.k.a. "WAR" a.k.a. "write after read": Problem = During R, W overwrites data. (Only for this type of hazard, execution dependencies only are sufficient. All other types of hazards require memory dependencies in addition.)
- **W -> W** a.k.a. "WAW" a.k.a. "write after write": TODO: examples?
- **W || W** a.k.a. "WRW" a.k.a. "write racing write": Problem = W and another W write in parallel. It is unclear which one "wins".
- **R || R** a.k.a. "RRW" a.k.a. "read racing write": Problem = R and W operate in parallel. It is unclear if R reads the data before or after the W.

**Approach For Fixing Validation Errors**    
It is recommended to solve all default validation errors before enabling (and tackling) synchronization validation errors. I.e.: Enable `VK_LAYER_KHRONOS_validation` with its default enablings/disablings and solve all validation layers reported by it. _After_ that is done, enable validation synchronization.

To tackle down specific validation errors, it is recommended to add additional heavy barriers, that means:
- Stages `VK_PIPELINE_STAGE_ALL_COMMANDS_BIT`, or `VK_PIPELINE_STAGE_ALL_GRAPHICS_BIT` for graphics pipelines, **and**
- Access masks `VK_ACCESS_MEMORY_READ_BIT | VK_ACCESS_MEMORY_WRITE_BIT` for both synchronization scopes.

**Validation Messages**         
The messages reported from validation synchronization follow a specific naming scheme which should be an efficient representation of the problem reported. All messages start with the pattern `SYNC-<hazard name>`. In addition to such a `SYNC-` prefix-pattern, one can find `SYNC_` (now with an underscore) patterns within error descriptions which report about the previously known usage of a problematic resource (printed according to the pattern `SYNC_<stage>_<access>`).         
TODO: Concrete examples for SYNC_stage_access

