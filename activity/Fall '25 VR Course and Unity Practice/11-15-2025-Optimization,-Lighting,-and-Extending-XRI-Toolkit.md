**TL;DR: This week I spent a few hours with optimizing and lighting my VR experiences, essential tools for creating performant, compelling, and immersive experiences. I was also properly taught how to extent the XRI Toolkit, a big deal for crafting custom interactions!!**

# Small Efforts, Big Differences

> The entire thesis of optimization and lighting.

This week I did some static batching, some fps improvements, lightmap baking, light probe *placing*, and I was (properly) taught how to extend the XRI Toolkit. Let's get into it!

## Optimization

VR optimization is essential to providing a quality experience. Framerate and latency are far more important than visuals, as long as they're consistent. Still though, not only is VR harder to run but the performance baseline is higher. Minimum 90 frames per second, but you can forget it if you're under 50.

I learned about the Unity Profiler and the stats overlay, as well as some basics about minimizing draw calls. To do this I marked unmoving objects as static, so they won't be drawn so often. Everything in the environment and any immovable GameObjects are statically batched.

Minimizing polycount and triangles helps too, which can be accomplished by using low-poly meshes and removing or replacing assets. Opening the stats window and looking around while in play mode can help with this, so that the number of visible triangles and vertices can be related to what is in view. Occlusion culling was not covered in this part of the exercise, but I am already familiar! Occlusion culling is the process of not rendering objects that are blocked (occluded) by another object in front of them. This helps dramatically, as it reduces the workload to only objects that can be (at least partially) seen.

Optimizing textures is a key here as well, and the exercise had me play around with the import settings on materials for some of the provided assets that I used in the room. Some of these properties include:

- Max Size
- Resize Algorithm
- Format
- Compression
- Mip-Mapping

I also learned more about anisotropic filtering and how it can play a role in improving texture visuals when those textures are viewed from shallow angles.

Optimizing particles, like this fire:

![Fire Particles](/images/activity/11-15-2025/fire-particles.gif)

Can also help when there are many particles being rendered, since they add to the poly count. The exercise didn't really cover that though, it just had me add post-processing bloom that's visible in the gif to make the particles look nice. The bloom made other things look nice too, though, which will be shown in the demo :]

Anti-aliasing is a great strategy for reducing the jagged edges of 3D objects. I had to modify my `UniversalRenderPipelineAsset` to change its properties and change the anti-aliasing from "disabled" to "4x", and then to go the camera and tell the camera to use Fast Approximate Anti-Aliasing (FXAA). It's funny that Unity Learn would have me do something that can cause a significant impact on fps in the optimization tutorial. Especially because it made me add anti-aliasing to the mirror too.

I had to turn it off.

## Lighting

Lighting is KEY to making stuff look good. Your textures and materials can look super awesome and fancy and sophisticated but you'll never be able to convince someone that a room is cozy without mood lighting.

Tell me I'm wrong.

![Before Mood Lighting](/images/activity/11-15-2025/before-mood-lighting.webp)
###### Drab!

![Mood Lighting](/images/activity/11-15-2025/mood-lighting.webp)
###### I didn't do my best here because I was strapped for time, but I made it cozy :)

The exercise had me create a new lighting asset and play around with a variety of settings, like additional lights per pixel and the limit of that, environment lighting, and how to bake lightmaps. Baking lightmaps onto static objects makes a lot of sense, something the tutorial was sure to have me do. I also removed the big foreground and background objects visible through the windows from the lightmaps to help save bake time.

I made sure to bake them with my GPU, and to use a lightmap resolution between 5-10 to make it quick and smooth. It seems to have turned out well!

I was able to play around with mixed lighting for nice baked effects without compromising on immersive VR shadows too, and I used light probes to get better real-time lighting. These things are freaky and I don't really understand how they work but they look funny when I turn gizmos on, hehe.

![Light Probes](/images/activity/11-15-2025/light-probes.webp)
###### There's so much going on!

I then pushed into a final, high-res bake and got the images you saw up there! I've also included a flythrough in the editor of my cozy room. It's a bit dim, but I'll always cave to intimate lighting.

## Playing with the XRI Toolkit

This part was pretty fun. It didn't cover as much as I was expecting, really just making this script:

![Scanner Setup](/images/activity/11-15-2025/scanner-setup.webp)

For this scanner:

![Scanner](/images/activity/11-15-2025/scanner.webp)

It's not exceptionally complex, and I've done far more difficult things (like for the group project in this class), but it was nice to get sort of an official overview of how to do it properly and how to do so well. I wanted to fully set up the scanner to do the things it said it would do, which would show the name and position of whatever object it is pointing at, but the tutorial didn't cover that part and I tragically have too much othr work to follow through on it right now. I bet I could even do it myself...

Oh well! I think this is the last exercise, but I might still come back around for it :]

Either way, here's this week's demo!

<iframe width="1339" height="753" src="https://www.youtube.com/embed/V_Mlasyd8Is" title="CIS4930   Introduction to Virtual Reality | Exercise 10 - (choose 3) | Elijah Johnson" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Cheers!
