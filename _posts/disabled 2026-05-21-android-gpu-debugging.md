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

## Android GPU Inspector and How to Uninstall it

So, this is a shame, because this tool looks like the perfect tool for Android GPU debugging. However, it always crashed the app that I wanted to debug and worse, it left my Android device in a state so that the app would now _always_ crash with a segmentation fault, even when not being debugged. Therefore, this section is mainly an uninstall guide because uninstalling wasn't straight-forward. And without removing everything that Android GPU Inspector leaves on the Android device, your app might never run again on that device.

Android GPU Inspector installs an interceptor layer as an app called **"GAPID"** to capture GPU calls. 

**Install Instructions:** 
- Download and install the [Android GPU Inspector](https://developer.android.com/agi)
- Connect an Android device via USB and ensure that USB Debugging is enabled
- Start the Android GPU Inspector
- On the connected Android device, you will be asked to install the "harmfull" `GAPID - arm64v8a`, which you have to `Install anyway`
- _Capture a new trace_ via Android GPU Inspector:
  - As soon as the device has been successfully connected and GAPID has been installed, you'll be able to select your `Device`
  - Then, you'll also be able to select an `Application` to GPU-debug via the `...`-Button.
- If you're lucky, you can do GPU profiling. If you're not, the Android device might be configured in a way that your app never runs again.

**Uninstall Instructions:**
- Uninstall `GAPID - arm64v8a` from _Settings -> Apps_
- Execute in a terminal:
  ```
  adb shell settings delete global gpu_debug_layers
  ```
  If successful, you should see the following message printed to the console: `Deleted 1 rows`.

These should be the most important steps to get Android GPU Inspector off of your app.        
For a clean state, also perform the following actions:
- If any of these statements:       
  ```
  adb shell settings get global enable_gpu_debug_layers
  adb shell settings get global gpu_debug_app
  ``` 
  return something other than `null` or `0`, execute these respective cleanup statements:       
  ```
  adb shell settings delete global enable_gpu_debug_layers
  adb shell settings delete global gpu_debug_app
  ```
- If these statement:          
  ```
  adb shell ls /data/local/tmp/
  ```
  lists entries connected to the Android GPU Inspector, delete them:
  ```
  adb shell rm /data/local/tmp/agi_launch_producer
  adb shell rm /data/local/tmp/agi_launch_producer.pid
  ```

## RenderDoc

Good old [RenderDoc](https://renderdoc.org) by Baldur Karlsson can be used for GPU profiling on Android. Similar to Android GPU Inspector, it installs an interceptor layer on the phone: an app called **"RenderDocCmd"**. While I got an impression of RenderDoc being slightly outdated in terms of Android support, I could successfully use it for GPU profiling. RenderDoc is run on the PC and connects to a so-called _Remote Context_---namely a Debug-enabled Android device, as described on RenderDoc's [How do I use RenderDoc on Android?](https://renderdoc.org/docs/how/how_android_capture.html) page.

## Perfetto

Perfetto seems to be _the_ standard system-wide profiling layer on Android nowadays, which offers support for GPU profiling among all kinds of other profiling areas. GPU profiling seems to somewhat limited with respect to the other solutions presented above. However, there's a new tool which TBD (speaking of Sokatoa)

Citing the _Perfetto DOCS_ (available at [perfetto.dev/docs](https://perfetto.dev/docs/))

> Built into Android
Part of the platform since Android 9 Pie, runs on Linux as well

