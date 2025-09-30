**TL;DR: This week was brutal (not due to this class) so I didn't get to make my original game idea :( BUT I got another, cooler idea that turned into a lovely little VR demo!**

# "My First Unity Project"

For my "first" Unity project, I had a **small** list of requirements:

- 3D environment the player can walk around in
- At least 5 different assets
- At least 1 sound
- A "story": why is the player there? What are they doing? What does it mean?

> Notice the project doesn't demand VR support.

## Tuliptastic!

For my VR game I had an idea that was an additive puzzle game. Picture: the player presses a button to open a door. They go to the next room and there's a ball on a pedestal and a socket nearby, so the player places the ball in the socket, then has to press the button, then the door opens. Afterward they pull a rope to ring a bell, place the ball in the socket, press the button, and proceed - you get the idea. I felt this would be a novel idea and may not be too hard to implement. However, things don't always go as planned!

This week was brutal. ***B r u t a l.*** I was super busy with IPPD and plans and prepping for the career fair and personal stuff and meetings and ugh ugh ugh ugh ugh-

I did not have time to make the game, so I asked my amazing partner what she felt I should make and she said "gardening!". Gardening it is. I figured I could make a simple scene with some flowers and a watering can and have the player plant a few flowers, then use the watering can to make them grow. I combed through asset packs and procedurally-grown trees and plants and such, and ultimately decided to use scaling to denote stages of growth. I added particle effects, sounds, background music, a little post-processing, and just enough hacky programming to smoke-and-mirrors my way through the video. I placed, rotated, and scaled some prefabs to make the surrounding mountain range, and taught myself how to use PolyBrush to paint the grass and plants all over the place, although they all face the same way. Given my constraints and my time (a combined six hours over a few days, maybe), the Tuliptastic demo turned out lovely :D

I **also** finally recorded in something other than Zoom, although Nvidia ShadowPlay no longer has webcam recording as a default option. It came in super handy in like, 2019, when I was recording Beat Saber videos, but I guess they canned it for some reason that would take a lot of effort to convince me was worthy. Anyway, I had to have the Windows camera app open in my inspector (whatever its not like i cared anyway smh)

<iframe width="1177" height="662" src="https://www.youtube.com/embed/5Srx16kH8c0" title="CIS4930 - Introduction to Virtual Reality | P1 - My First Unity Project | Elijah Johnson" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

So, the hacky stuff. When the flowers (each with an XR Grab Interactable) are socketed, they were playing a sound but not changing size. I didn't even know what the problem *really* was until I added sound even though I tried so many debug logs in so many locations. Ultimately the demo has a hidden secret - shortly after the flowers are socketed (planted) the sockets are disabled so that the flowers are locked in place but no longer held there - this fixed my scaling issue. I had to re-record the video once or twice because I accidentally knocked flowers over LOL. Plus, they only stand up because they have box colliders on their bases.

Making this be more convincing also required learning about making decent ParticleSystem setups, and I learned about the `OnParticleCollision` method, which was super frustrating until I realized it had to be on *the object the particle collides with*, not the same gameobject as the ParticleSystem. Of course it works that way. That makes so much more sense. And it makes the code so much easier to write.

I wanted to use white tulips because white tulips are my favorite, but the asset pack didn't come with any! It's okay though, this demo is adorable and I'm proud of what I was able to put together :)

See you next week! Cheers!
