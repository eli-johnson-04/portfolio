**TL;DR: Exercise 6 was a useful recap of XR Interaction Toolkit basics I learned earlier this summer, and I was even able to do some cool camera work. Check out my awesome studio apartment!**

> Press play bro

<iframe width="1339" height="753" src="https://www.youtube.com/embed/Qd3zynSctnM" title="Nexus" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

# Let's "learn" grabbables and sockets!

## Part 1 - Grabbables

This exercise is cool, its working with the same unity project as the last one (in my super cool and awesome room that I didn't show off in that post).

![Awesome Room](/images/activity/10-10-2025/awesome-room.gif)
###### Cozy apartment simulator coming soon!!!

### Hands

We begin with replacing the player's hands, a task simple enough. Drag and drop the prefab from the asset window into the inspector on the appropriate hand of the XR rig, in its Model Prefab property.

Fire.

Now do the right hand.

Fire.

I chose these guys.

![Hands](/images/activity/10-10-2025/hands.webp)
###### Asymmetry is awesome. Not always, but its awesome.

### Basic Grabbables

Place a ball on a surface. Boom. Put an XR Grab Interactable on that guy. Boom.

![Ball](/images/activity/10-10-2025/ball.webp)
###### tennis

I'd demo it but I'm in the library as I write this/do the exercise and I need my desktop for VR. It also didn't work when I tried to use my Quest for the last exercise :/ I'll never get to see my cozy cozy apartment with my own eyes!! I'm going to try again though. Keep reading to see if I succeed.

### Measuring stick?

Next I created a cube and made a measuring stick with it. To do this, I found the official size of the tennis ball (2.575 in - 2.700 in according to International Tennis Federation), and set the X- and Z-scales of the cube to 0.01 while setting the Y-scale to the length I found. I then put the measuring stick next to the ball and scaled the ball appropriately, after converting to meters (0.0654m - 0.0685m).

![Scaled Ball](/images/activity/10-10-2025/ball-scaled.webp)

I'm supposed to pick it up and throw it after adding an XR Grab Interactable to it, but it's not quite time to demo so we'll see if I can!

### Hide hands and disable anchor control

A big UX consideration in VR is how it feels to interact with things. The way that objects look in the hands when grabbed can play a major role in immersion - so much so that disabling the hand model can actually be more immersive than a weird grab. As such, we disable anchor control to prevent the player from moving or rotating the object with the joysticks when grabbing it with that hand, and hide the hand model so that only the object is visible when held.

![Hands UX](/images/activity/10-10-2025/ux-hands.webp)
###### The UX of VR is so interesting. Human minds work in amazing ways.

### Better throwing

VR is cooler when objects function in the same way our mental models say they should, right? Let's make the ball bouncy! Adding a bouncy material will make the ball have a more realistic appearance of bounciness... go figure. We can also improve collision detection to heighten the sense of realism and believability (immersion!) with higher-quality physics using Continuous Dynamic detection. More expensive, but more realistic.

We can also enable the object's physics while its being grabbed by setting its Grab Interactable's Movement Type to Kinematic. This way it interacts with other objects in the scene.

Last, we can enable the Smooth Position and Smooth Rotation properties of the Grab Interactable so it feels nicer to play with. Awesome!

### Attach Transforms and Handles

Now we want to make an object grabbable from a handle. I pulled a prefab into the scene for a ping pong paddle, gave it some pretty physics, and then did the important part. I created a child transform for an attach point and moved/rotated it inside the handle so the paddle would feel held naturally.

![Attach](/images/activity/10-10-2025/attach.webp)
###### I feel cool anytime I use attach transforms. I will not elaborate.

### Hierarchy

Last, its helpful to organize the hierarchy of objects. That's it, create empty gameobjects and move them to `(0, 0, 0)` and put your stuff in there. Kaboom.

![Hierarchy](/images/activity/10-10-2025/hierarchy.webp)
###### I had already done some organization, but I'm not stopping halfway.

### Extensions

There's an easy extension activity (Unity describes it this way) to experiment with properties of the XR Grab Interactable, of which I am already familiar. One can also create a magnifying glass, which was surprisingly difficult. I had to examine the structure of the mirror and its texturing system to make this work. I'll give a word vomit of how I did it.

*breathe in*

Go into the project window and create a new render texture using some settings I don't know about like a Depth Stencil Format of `D24_UNORM_S8_UINT` and make it use the Repeat wrap mode I think and then add a Camera as a child of the lens gameobject that's a child of the magnifying glass and rotate this camera so that it faces down relative to how the user looks through the lens and make its field of view smaller to give the illusion of magnification then go into the camera component's output properties and put the new render texture as the Output Texture and then go back to the lens gameobject and drag the new render texture from the project window onto the lens in the scene window and open the options to the shader settings on the lens gameobject and make sure it's using Universal Render Pipeline/Unlit as its shader and drag the new render texture from the project window into the Base Map property and then move the entire magnifying glass in the scene window in such a way that you can see through the lens and then rotate the camera so that it actually shows up correctly and if I didn't miss any steps the final result should look something like this:

![Magnifying Glass](/images/activity/10-10-2025/magnifying-glass.gif)
###### I'm actually really glad I tried this and that it works decently well - I've impressed myself! Camera work is so interesting, especially stuff like Sebastian Lague's portal videos on YouTube - highly recommend.

The third and expert option was to create a notebook cover that opens when you grab it - this wasn't too bad, just add some hinge joints and make sure the rigidbodies are hooked up properly :D

![Notebook](/images/activity/10-10-2025/notebook.gif)
###### I had to use two hinge joints to make it believable and not freak out, but I got it done! Surprisingly, this was far easier than the magnifying glass. I've done some stuff with hinges before while experimenting in my own VR projects though, so that probably helped.

## Part 2 - Sockets

### Basics

I made some hats in the last exercise, so adding Grab Interactables makes them, well, grabbable. Cool! The hooks don't do anything yet, though.

![Falling Hats](/images/activity/10-10-2025/hats-fall.gif)
###### hehe

Adding sockets to the wall hooks means the hats can actually hang there! All it takes is a gameobject to hold the socket, an attach transform rotated properly, a sphere collider set to be a trigger, and an XR Socket Interactor.

![Hat Hooks](/images/activity/10-10-2025/hat-sockets.webp)

### Make me giggle

I actually haven't thought of doing something like this before - Unity Learn had me put a socket on my head so I can wear hats! Cool! I followed the same process for the hat hooks, just on the gameobject containing the XR Rig's camera.

### Everything *could* be a hat... but no.

To make sure I can't wear just *anything* as a hat, I have to make a new interaction layer called Hats. I go into the XR Socket Interactor component of all my gameobjects that are hats and add a new Interaction layer called Hats, then set them to only exist on that layer. Then I go to my hat hook and head sockets and set their Socket Interactors to only work with the Hats layer. See the video to find out if I was able to demo in VR!

### Extensions

There's two extensions that I don't have time to do, so I'll just explain how I would approach them.

The first is to make rearrangeable art, where I can put "nails" in the wall and attach transforms on paintings with Grab Interactables so that I can swap their positions. I would do exactly that:

- Create nail objects that have relatively small sphere colliders, maybe 0.15 radius
- Modify painting prefabs to have XR Grab Interactables and an attach transform on the frames for where they'd be hung from
- Demo painting swaps!

The second is to make a neatly-rearrangable bookshelf. My approach would be to make the books obey physics wile also snapping into place:

- Give each book an XR Grab Interactable with an attach transform in the bottom center of the book when the book is upright
- Add evenly-spaced XR Socket Interactors to the bookshelf, with attach transforms in the center of the shelf along the line between the wall and the precipice of the shelf
- Enable mesh highlighting to see where they will snap into place

I would like to do a dynamic solution here that allows easy snapping of the books into position but disables the socket (or releases the book) right after, so that a projectile could knock them all over (similar to Tuliptastic), but that might require some extra brainpower and trial/error outside the single Pomodoro I've allocated to writing this.

## Final Demo

Overall this was a great recap of XR interaction basics and gave me a lot of insight into how the toolkit has evolved! I'm excited to see where it goes next... and how much easier it hopefully gets to make interactions like this. The newer toolkits are so much more intuitive, especially with respect to the XR Rig... wow.

<iframe width="900" height="515" src="https://www.youtube.com/embed/7vDVtD1xgFA" title="CIS4930  - Introduction to Virtual Reality | Exercise 6 - (VR Development 2) | Elijah Johnson" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Cheers!
