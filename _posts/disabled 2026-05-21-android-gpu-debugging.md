---
title: "Android GPU Debugging"
# last_modified_at: 2026-05-21T02:12:00+02:00
categories:
  - GPU-Programming
tags:
  - Vulkan
  - Android
# header:
#   image: /assets/images/1500x500.jpg
---

The need for good tooling is crucial during graphics programming. On the Windows operating system, some awesome tools exist for GPU profiling, which usually manage to help you along. 
Tools that I have successfully used for GPU profiling in the last years are:
- [NVIDIA Nsight](https://developer.nvidia.com/tools-overview#get-tools)
- Baldur Karlsson's [RenderDoc](https://renderdoc.org/)
- Microsoft's [PIX](https://devblogs.microsoft.com/pix/)

Those tools all have different strengths and weaknesses. 
I think, I actually like RenderDoc best for ordinary GPU debugging sessions. However, there are some issues with respect to [ray tracing support](https://renderdoc.org/docs/behind_scenes/raytracing.html), 
so it is sometimes necessary to use NVIDIA Nsight instead. 
Sometimes, both of these tools would crash during graphics debugging, but PIX doesn't.
I.e., as developer it can be useful to juggle between all of these tools.

Currently, I'm workin with Android and I am still struggling to establish a great GPU debugging workflow. 
This post contains a few notes on my attempts to establish GPU debugging on Android and the associated struggles.

## Restore:
