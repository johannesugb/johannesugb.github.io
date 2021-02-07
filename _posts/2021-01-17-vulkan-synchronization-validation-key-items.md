---
title: "Vulkan Synchronization Validation - Key Items"
# last_modified_at: 2021-02-07T13:25:00+01:00
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
- For implicit subpass dependencies, still proper memory barriers are required.
- Stage/access pairs must match according to [Table 4 under 7.1.3. Access Types in the Vulkan Specification](https://www.khronos.org/registry/vulkan/specs/1.2-extensions/html/vkspec.html#synchronization-access-types)
- Image layout transitions are read _and_ write operations and therefore, require memory dependencies
- All stage/access scopes must be specified where an operation could load/store data -- i.e. "color" and "depth/stencil" are different stages within a graphics pipeline. Stage/access combinations must be specified precisely according to an application's requirements.

## Key Items from LunarG's Documentation

In the following, I'll list the key items from LunarG's [Guide to Vulkan Synchronization Validation](https://www.lunarg.com/wp-content/uploads/2021/01/Final_Guide-to-Vulkan-Synchronization-Validation_Jan_21.pdf)", i.e. it shall serve as a "TL;DR"-version of the document:

**General Information**    
Operations are executed in a massively parallel manner on modern GPUs. Whenever the _same region of memory_  is used by subsequent operations on a GPU _in different ways_ some kind of synchronization must be established to guarantee correct behavior of an application, or -- even more importantly -- to prevent undefined results/behavior.

Synchronization Validation can not only be used to find problems, but also to optimize the performance of an application by reducing the "heaviness" of an existing barrier step by step until a synchronization Validation error occurs (and then go back one step).

Currently, synchronization Validation will report hazards only **within the same command buffer**. It looks like it currently does not work across different command buffers or across different queues.

**Validation Messages**         
The messages reported from validation synchronization follow a specific naming scheme which should be an efficient representation of the problem reported. All messages start with the pattern `SYNC-<hazard name>`. In addition to such a `SYNC-` prefix-pattern, one can find `SYNC_` (now with an underscore) patterns within error descriptions which report about the previously known usage of a problematic resource. They are printed according to the pattern `SYNC_<stage>_<access-type>`, where both `<stage>` and `<access-type>` refer to only the relevant part of a stage or access enum-value:
- `<stage>` refers to the `VK_PIPELINE_STAGE_<stage>_BIT` part (e.g. the `COLOR_ATTACHMENT_OUTPUT` part of the total `VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT`)
- `<access-type>` refers to the `VK_ACCESS_<access-type>_BIT` part (e.g. the `COLOR_ATTACHMENT_WRITE` part of the total `VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT`)

**Approach For Fixing Validation Errors**    
It is advised to _first_:
- solve all errors from Standard Validation and 
- solve all errors from Thread Safety.
I.e., this would refer to enabling all features of _Core_, _Handle Wrapping_, _Object Lifetime_, _Stateless Parameter_, and _Thread Safety_ in `vkconfig`; and disabling all other features. Resolve all errors reported from that configuration before proceeding!        
_After_ that is done, enable Synchronization Validation and disable other features: I.e. only leave _Thread Safety_ enabled, enable _Synchronization_ in addition, and disable all other features (i.e. disable all features of _Core_, _Handle Wrapping_, _Object Lifetime_, and _Stateless Parameter_).

To tackle down specific Synchronization Validation errors, it is recommended to add additional heavy barriers, that means:
- Stages `VK_PIPELINE_STAGE_ALL_COMMANDS_BIT`, or `VK_PIPELINE_STAGE_ALL_GRAPHICS_BIT` for graphics pipelines, **and**
- Access masks `VK_ACCESS_MEMORY_READ_BIT | VK_ACCESS_MEMORY_WRITE_BIT` for both synchronization scopes.

**More Details**     
There are different types of hazards (where _W_ means writing to the same region of memory, and _R_ means reading from the same region of memory):
- **W -> R** a.k.a. "RAW" a.k.a. "read after write": Problem = R proceeds without waiting for the results of W, potentially reading old data.
- **R -> W** a.k.a. "WAR" a.k.a. "write after read": Problem = During R, W overwrites data. (Only for this type of hazard, execution dependencies only are sufficient. All other types of hazards require memory dependencies in addition.)
- **W -> W** a.k.a. "WAW" a.k.a. "write after write": TODO: examples?
- **W || W** a.k.a. "WRW" a.k.a. "write racing write": Problem = W and another W write in parallel. It is unclear which one "wins".
- **R || R** a.k.a. "RRW" a.k.a. "read racing write": Problem = R and W operate in parallel. It is unclear if R reads the data before or after the W.

LunarG's [Guide to Vulkan Synchronization Validation](https://www.lunarg.com/wp-content/uploads/2021/01/Final_Guide-to-Vulkan-Synchronization-Validation_Jan_21.pdf) further describes how Synchronization Validation internally recognizes hazards by keeping track of the "most recent access" which is relevant for a certain access to a given memory or image subresource range. They describe it in detail and with several examples in the section **Most Recent Access**.

Furthermore, the document describes some common mistakes and pitfalls and explains how to solve them. This is in line with the information given in the synchronization resources listed/recommended in the beginning of this blog post. Please refer to the section **Root Causing Hazards**. It is a good read, but the information is given in a somewhat denser manner than in the resources listed above. 
