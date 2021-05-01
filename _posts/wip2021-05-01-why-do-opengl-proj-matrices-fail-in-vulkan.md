---
title: "Why projection matrices typically used with OpenGL fail with Vulkan"
# last_modified_at: 2021-05-01T18:00:00+02:00
categories:
  - GPU-Programming
tags:
  - Vulkan
# header:
#   image: /assets/images/1500x500.jpg
---

When programmers with an OpenGL background learn Vulkan, they often expect--or hope--that the projection matrices they have used with OpenGL continue to work with Vulkan. Everyone with such expectations is in for a bad surprise. While many sources on the internet offer quick fixes such as

- Inverting the projection matrix' y-axis: `projMat[1][1] *= -1`
- Inverting the y coordinates in the vertex shader: `gl_Position.y = -gl_Position.y;`
- Inverting the projection matrix' z-axis: `projMat[2][3] *= -1` (TODO: check!)
- Changing the front faces from [`VK_FRONT_FACE_COUNTER_CLOCKWISE`](https://www.khronos.org/registry/vulkan/specs/1.2-extensions/man/html/VkFrontFace.html) to [`VK_FRONT_FACE_CLOCKWISE`](https://www.khronos.org/registry/vulkan/specs/1.2-extensions/man/html/VkFrontFace.html)

Applying such fixes without really knowing what's going on under the hood can leave a bad feeling. This blog post tries to explain why OpenGL's projection matrices do not work in a Vulkan application without modification and what the fundamental differences are between these two APIs.



