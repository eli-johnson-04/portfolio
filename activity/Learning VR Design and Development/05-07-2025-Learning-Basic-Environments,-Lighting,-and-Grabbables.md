**TL;DR: After following a tutorial and taking notes, I've made an environment, customized an XR Rig, and added some basic grabbables (and more)!**

# Show and tell
I've made my first batch of meaningful progress. These screenshots are the result of following Valem Tutorials' wonderful 3-and-a-half hour tutorial on [VR basics in Unity](https://youtu.be/YBQ_ps6e71k), and I've been taking lots of handwritten notes, so progress has been slow. That said, I am taking the time at every step to understand the why for everything when it is not provided.

## Environment
In the section for making the environment I learned how to fit things together, duplicating on the fly, snap moving and rotating, and how to set up a panoramic skybox. As I went I gradually taught myself how to get more and more out of the editor and am beginning to scratch the surface of really how effective this tool could be for designing a compelling experience! I also followed Valem's instructions on setting up the interior, just so I could be wary of anything he chooses to do in the future of the video. I am only an hour in, and I want to follow accurately so that the things I learn are applied in the intended way (although I cannot wait to learn more and then get to doing it on my own!).

![Basic Environment with Skybox](/images/activity/05-07-2025/valem-environment.webp)
###### Using a modular sci-fi asset pack, I've put together an environment with a Milky Way skybox!


## Grabbalababbalables
Seeking to decorate the home base, I added some basic cubes and toiled to set up a direct interactor for my hands. 

![Home Base](/images/activity/05-07-2025/valem-homebase.gif)
###### The sci-fi pack featured some decorations, so I put them in the space and added some grabbable cubes and a space rock! And notice the cool shader! I did not expect to do something like this, but it encouraged me to learn about quads, Shader Graph, and node-based real-time visual editing for shaders. Super, super cool.

Anyhow, the direct interactor on each hand would allow me to pick up a grab interactable. However, Valem's video uses an older version of the XR Interaction Toolkit, and I had to figure out how to do this myself. Adding the XR Direct Interactor component to the hands didn't work like it did for him, nor did creating a child GameObject with it. It turns out, I had to manually tell the direct interactor which Input Action to use to signal that the direct interactor was selecting. This took, oh..., over an hour to figure out? I left the house and went on a walk for several blocks because I kept learning more and more about the interaction system, and not enough about the specific actions of the direct interactor. I got back and realized I missed the "Select Input" boxes under Input Configuration. I felt a little ridiculous.

![Direct Interactor](/images/activity/05-07-2025/direct-interactor.webp)
###### It was right under my nose :)

I also learned about making compelling physics interactions by changing the grab interactables to be velocity tracked, meaning their velocity is tracked while they are held so that they can be thrown like a real object. I went further with Valem and modified the physics time step in the project settings to be 1/90, since we shoot for the standard 90 FPS in-game. This way, even if the frame rate drops, calculations are still running at the ideal rate for comfort and a high-quality experience. I also changed physics settings for GameObjects like the solver iterations from 6 to 15, and the solver type from Projected Gauss Seidel to Temporal Gauss Seidel to account for time when solving physics interactions. This is more expensive and I noted this, but Valem did too and I intend to learn more, whether he covers it or not. Nonetheless, the interactions are pretty swanky.

###### I didn't think it would be this easy to create such rich interactions. The opportunity ceiling must be so, so high.
![No Intersections](/images/activity/05-07-2025/blocks-collision.gif)
###### I didn't think it would be this easy to create such rich interactions. The opportunity ceiling must be so, so high.

![Blocks on Table](/images/activity/05-07-2025/blocks-on-table.gif)
###### Delicious.

## HANDS
I was honestly the most skeptical of my ability to do hands. Valem provided the models and the animations, but he showed in the tutorial how to set it up, and I thought the 2D Cartesian Freeform Blend was the most interesting thing ever. You mean it just seamlessly interpolates the joint positions? The post-processing I learned how to do looks really nice as well, with some gorgeous bloom shining on the metal.

![Pretty Hands](/images/activity/05-07-2025/pretty-hands.gif)
###### Pretty hands.

## The trashcan works like a trashcan!
The last thing was that I set up the trashcan to have a collider inside that uses Unity Events to detect a collision and make the "trash" become inactive. I had done something similar in my initial stages of Unity tinkering, but it was far more direct. Less elegant. I can already see how powerful these events are. I love immersive sims and emergent gameplay mechanics, and while I don't know enough yet to make that happen, I can already see the inklings of unbounded possibility with event listeners and callbacks. 

![No More Space Trash!](/images/activity/05-07-2025/space-trash.gif)
###### Get deactivated, idiot.

## More coming soon to an [elijahjohnson.me](https://elijahjohnson.me) near you...
Check out your local [elijahjohnson.me](https://elijahjohnson.me) every now and then to see my latest progress. The next post will be bigger, with better things to show off. I'm starting small, but I've already been putting sticky notes on my wall for things I don't want to forget. 

Ciao.