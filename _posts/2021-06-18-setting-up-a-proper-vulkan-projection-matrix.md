---
title: "Setting Up a Proper Projection Matrix for Vulkan"
# last_modified_at: 2021-06-18T12:30:00+02:00
categories:
  - GPU-Programming
tags:
  - Vulkan
# header:
#   image: /assets/images/1500x500.jpg
---

In a previous post I have pointed out why projection matrices which are typically used with OpenGL do not work with Vulkan without modifications and can lead to a lot confusion.
In this post, I'd like to describe a strategy how a proper and (hopefully) easy to understand perspective projection matrix for Vulkan can be set-up manually. _Figure 1_ gives an overview of some commonly used spaces and spaces which must follow certain rules that are dictated by the graphics API---i.e. Vulkan for the scope of this blog post.

{: .center}
[![Graphics pipeline, different spaces and operations](/assets/images/different-spaces-some-user-defined.png)](/assets/images/different-spaces-some-user-defined.png)

_Figure 1:_ The spaces displayed with yellow borders and fonts (world space and view space) can be chosen freely by programmers. But for the other spaces, Vulkan dictates certain requirements s.t. its fixed-function steps backface culling, polygon clipping, and homogeneous division (marked with circular symbols) lead to the expected result. All of the spaces are required to be in a right-handed coordinate system. I.e., Vulkan's fixed-function steps operate so that they expect the input geometry to be defined with right-handed coordinates.

_Figure 2_ shows the spaces with requirements with more details. It can be observed that their basic structure is very similar and consistent: Each space is defined with a right-handed coordinate system where the x-axis points to the right, and the y-axis points down. Now, "right" and "down" might be terrible descriptions of the matter, but at least if we follow these thoughts through to the framebuffer space and imagine a framebuffer being rendered on a screen, they should hopefully get the point across. I.e. an image (in framebuffer space) is drawn to the screen s.t. its origin is assumed to be in the top-left corner, increasing x coordinates refer to pixels from left to right on the screen, and increasing y coordinates refer to pixels from top to bottom on the screen. The z-axis pointing "into" the screen shall indicate that depth values increase the further away an object is.

{: .center}
[![Clip Space, Normalized Device Coordinates, and Framebuffer Space in Vulkan](/assets/images/vulkan-spaces.png)](/assets/images/vulkan-spaces.png)

_Figure 2:_ The spaces which Vulkan works with and performs fixed-function operations in are all assumed to be given in a right-handed coordinate system with matching axes orientations. While clip space coordinates are given in homogeneous space, normalized device coordinates only contain primitives within the unit cube from $(-1, -1, 0)^T$ to $(1, 1, 0)^T$. Framebuffer space's x and y coordinates range from $ [0..w) $ and $[0..h)$, with $w$ referring to the framebuffer's horizontal resolution, and $h$ referring to the framebuffer's vertical resolution. The $z$ coordinates refer to depth values in $[0,1]$ range.

### Into View Space

Let us start with the transformation of our cooordinates into view space. You are totally free to define view space according to your requirements or preference. Let us further assume that we have already set up a matrix $V$ which transforms coordinates from world space into view space. This can be done by plugging the camera's (transformed) coordinate axes ($\mathbf{c_x}$, $\mathbf{c_y}$, and $\mathbf{c_z}$) together with its translation vector $\mathbf{c_t}$ into the columns of a matrix and computing the inverse of it, which gives view matrix $\mathbf{V}$:

$$ \mathbf{V} = \begin{pmatrix}
\mathbf{c_{x_x}} & \mathbf{c_{y_x}} & \mathbf{c_{z_x}} & \mathbf{c_{t_x}} \\
\mathbf{c_{x_y}} & \mathbf{c_{y_y}} & \mathbf{c_{z_y}} & \mathbf{c_{t_y}} \\
\mathbf{c_{x_z}} & \mathbf{c_{y_z}} & \mathbf{c_{z_z}} & \mathbf{c_{t_z}} \\
0 & 0 & 0 & 1 
\end{pmatrix}^{-1} $$  

### Prepare for Perspective Projection

For the sake of comprehensibility, I would like to propose an intermediate step between the view matrix and the (in our example: perspective) projection matrix. With this intermediate step, the projection matrix will be easy to understand and straight-forward to build. 

I am proposing to transform our coordinates into the "Vulkan form" here, meaning that we transform everything into the shape of the coordinate systems from _Figure 2_. For the sake of an example, let us assume a right-handed view space coordinate system where the y-axis points up in world space, and the camera's view direction is pointing towards the camera's local -z direction. Again, you are completely free to define view space in a different way, but this is the way chosen for this example. _Figure 3_ shows the transformation which prepares for Vulkan's clip space and further spaces.

{: .center}
[![Prepare for Vulkan spaces from view space](/assets/images/view-space-prep-for-proj-fade.gif)](/assets/images/view-space-prep-for-proj-fade.gif)

_Figure 3:_ We want to transform coordinates so that the resulting z-axis points into the camera's view direction, s.t. that part of the scene will be contained in the clip space cube. Furthermore, we must maintain a right-handed coordinate system, where x- and y-axes correspond to increasing horizontal coordinates towards the right, and increasing vertical coordinates downwards, w.r.t. framebuffer space.

From $\textbf{V}$ space, we can easily set up the required transformation by just looking at the resulting axes in _Figure 3_. The x-axis remains unchanged, y- and z-axes must be flipped to get the desired coordinate system. Plugging these transformations into a matrix and taking the inverse of it transforms into the desired intermediate space which we call $\textbf{X}$:

$$ \mathbf{X} = \begin{pmatrix}
1 & 0 &  0 & 0 \\
0 & -1 & 0 & 0 \\
0 & 0 &  -1 & 0 \\
0 & 0 & 0 & 1 
\end{pmatrix}^{-1} $$  

### Perspective Projection Into Clip Space

The final step is transforming from $\textbf{X}$ into clip space with perspective projection. Since all axes have already been aligned properly in the previous step, we can focus on the projection itself in this step and do not have to spend any thoughts on any more axis flips that might be required (as opposed to the OpenGL waythat was discussed in a previous blog post). 

$$ \mathbf{P} = \begin{pmatrix}
\frac{1}{a} \frac{1}{\tan \frac{\phi}{2}} & 0 & 0 & 0 \\
0 & \frac{1}{\tan \frac{\phi}{2}} & 0 & 0 \\
0 & 0 & \frac{f}{f - n} & -n * (f-n) \\
0 & 0 & 1 & 1 
\end{pmatrix}^{-1} $$  


