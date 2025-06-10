**TL;DR: wow this process is slow wow this process is hard wow this process is fun wow I'm losing my mind!!! Starting this topic for my first original experience and other endeavors I explore!**

# Yikes &#128128;

I'm starting a new topic to explore a captivating idea I had for an immersive, atmospheric, hand-tracked adventure into alternative spirituality. I want to keep myself accountable and show off the small successes to enjoy the journey regardless of its destination.

I've got eight years of VR experience under my belt, so I'm not out of my depth or jumping into aphotic waters where I can't see because the light doesn't penetrate that deep.

...

However this learning experience is by no means a quick one. Determining which step to take next is hard, since I don't have a lot under my belt just yet nor do I know what I'm capable of. In spite of that I've started my first experience, hand-tracked. I developed a cool gesture that detects an open forward-facing palm and activates a custom Hover Cast Interactor, which surprisingly only took a few hours! I tweaked the hover effects of my Hoverable component the next day with a state machine and an AnimationCurve for seamless transitions, and I feel so, so accomplished. I did something meaningful and created a rich interaction that makes an experience *feel good* :D

![Hover Cast Interactor](/images/activity/06-03-2025/hover-cast-interactor.gif)
###### I think it's cool, my comp sci friends think it's cool, nobody can tell me this isn't cool.

You won't ***believe*** the ideas I have planned for this. I'm creating a cosmology, some extreme self-body horror mechanics, I'm gonna make lots more gestures, and I'm trying to keep the core mechanics relatively contained so I can use a simplistic story system that adds to the atmosphere.

## Not *all* bad

I also spent most of a day working on a super cool (albeit simple) circle-casting mechanic that has the user perform hand gestures to spawn four cardinal artifacts (I'll get into these shortly), and when placed in the correct zone, all the candles will turn on. I added some delay between the flames and the smoke, as well as a delay between each candle so the lighting pattern "sweeps" across them. I worked backwards from the candles, up to the artifacts, and then to VR integration.

### Candles

I learned so much about state management while working on the Candles and Candle Manager, especially for how to attack things like this. I found that for now, a method that works for me is starting by thinking about a sensible interface for a given component, and building out the component from there. For example, how should another GameObject interact with a Candle? Simple. Tell the Candle to turn on or off. Okay, build a state machine and manage attributes from there; the Candles handle all their own particle systems, lights, and audio themselves, timings, etc. Now, the Candle Manager should be able to turn them all on or off, one function for each behavior. Perfect. Create a system to abstract the state of *all* the Candles, implement some timing things, and BANG!!!! Competent, cromulent state management for Candles with simple interfaces and sensible storage of information. I applied the same framework for the Cardinal Artifacts, Sockets, and Surface.

The candles went better than I was expecting! I found some candles in the asset store, which also came with flame and smoke particle systems. Perfect. I placed them on the altar and spent some time figuring out my framework, ultimately ending up with a GameObject containing all the candles that has a component called Candle Manager. This Candle Manager controls the collective state of the child candles by managing a list of Candle component references, each of which manage the Lit state of their own flame particle system, smoke particle system, point light, and audio source.

![Candle Component](/images/activity/06-03-2025/candle-component.webp)

![CandleManager Component](/images/activity/06-03-2025/candlemanager-component.webp)
###### I'm not sure how good a practice it is to have my candles as actual children of another singular GameObject, but it works for now. This just makes it so easy. Unity's ECS system is great.

After working out my interfaces and creating some debugging logic I tested it, got the timing nice for Candle and inter-Candle lighting, and it's quite compelling!

![Candles Flipping On and Off](/images/activity/06-03-2025/candles-flipping.gif)
###### Those candles in the back are static and not controlled by the Candle Manager. I also want to play with the smoke ParticleSystems to see if I can get the smoke to trail upward so that when it stops emitting, the last smoke produced continues upwards and fades instead of the entire thing disappearing. More to learn!

### Cardinal Surface and Artifacts

My Cardinal Surface is a sort of sheet/plate that sits atop the altar, with four zones that each correspond to a Cardinal Artifact with a specified direction/element, per Wiccan tradition:

- North: Earth
- East: Air
- South: Fire
- West: Water

Each Cardinal Artifact has just a single property, a selection from an enumeration of the four Cardinal Directions. However, a Cardinal Artifact requires an XR Grab Interactable and makes one automatically when the Cardinal Artifact is added, so the artifact can be picked up by the user :p

Each Cardinal Artifact is to be used with a Cardinal Artifact Socket, an XR Socket Interactor with a Cardinal Direction property. The Socket only allows an object to be selected and snap into place if the object matches the Socket's direction. Four artifacts, four sockets, one surface. The Cardinal Surface keeps a reference to each Socket and talks to the Artifact Manager, which talks to the Candle Manager when all four sockets are selecting an object, which we have now established only happens when they match the correct direction!

I'll show you the final product in juuuuust a moment :)

### The gestures, ugh, the gestures

A **hand shape** is defined by any combination of fingers for any/all of the following attributes (measured from 0-1), per finger:

- Full Curl: the curl of the entire finger, like when you make a fist
- Base Curl: the curl of the base of the finger, like your thumb when you hold up the number 4
- Tip Curl: the curl of the tip of the finger, the last section of a given finger
- Pinch: how close a given finger's tip is to touching the tip of the thumb
- Spread: the rotation of a finger in the palm plane, like when you splay your fingers flat on a table as far apart as you can

> I spent lots of time with the [Finger Shapes Documentation](https://docs.unity3d.com/Packages/com.unity.xr.hands@1.5/manual/gestures/finger-shapes.html) and the XR Hands hand shape debugger scene. I had one of my desktop screens overlayed while in the VR app so I could tweak settings for my shapes **while** in the scene, and another just below it with my webcam open so I could see myself doing these hand shapes, while in VR, to define VR hand shapes. I looked absolutely ridiculous doing this at 9pm sitting at my desk.

A **hand pose** (synonymous with gesture) is a hand shape + an orientation, with a few orientation setups that are a bit harder to explain, but are listed [here](https://docs.unity3d.com/Packages/com.unity.xr.hands@1.5/manual/gestures/hand-orientation.html). It requires setting a hand axis, alignment condition, reference direction, angle tolerance, and optional exclusion of the hand's Y position, with the orientation able to be measured by any number of user-based or world-based reference frames.

This all boils down to frustration. Fortunately, XR Hands provides a gesture debugger to determine and set precise shape parameters and thresholds, as well as for testing pose detection. The North and East gestures initially worked far better than South and West, but I chose characteristically unique shapes for the latter two that took quite a while to determine thresholds for. It was worth it though, the pinky-thumb pinch is great for Water and the most complex one, the Fire sign, is hard to track properly but feels so cool when it works. I got the shapes to be detected reliably, but the orientations were, well, *bluggh*.

> As an aside, I **could** describe these poses to the player with text (since gestures will be important to gameplay and these four are not \*exceptionally\* complex), **or** I could find a way to reliably generate icons of hand poses, which would be better. I have no idea how to do this and spent some time trying to find a tool, but I might have to do something hacky and just make it work. I don't know, but I do know that I will need some signifiers for when players are making the correct pose, and a gesture hold time to make them earn it (and to justify a cool signifier).

I created a Cardinal Artifact Manager script to have trackers for current left/right hand direction (cardinal) and state (correct/incorrect), and to use this information to spawn the artifacts. When all four artifacts are in place, the Surface updates its state (occupied: all artifacts in place, complete: candles turned on, incomplete: artifacts missing & candles off). The Artifact Manager *might* be managing things it shouldn't, but the system works for now. The Static Gesture Detectors use callbacks to provide updates about current hand pose.

![Ugly State Diagram](/images/activity/06-03-2025/ugly-state-diagram.webp)
###### This is simplifying it. I'm just glad it's not worse.

To my thorough (and deserved) satisfaction, it works! It feels like actual magic! Look!

<iframe width="560" height="315" src="https://www.youtube.com/embed/6wDjS-vpFwU?si=iI2YRSdKHYgonAbW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

###### *\*planet-sized grin\**

If I remove even one of the Artifacts, the candles turn back off. This setup is vicious. It's not perfect though, especially that last hand pose for Fire. The shape works surprisingly well (if the fingers are posed in the correct order), but the orientation has been difficult from the beginning. I was also wearing a black hoodie when I recorded that + I was wearing my watch, so my left hand's tracking is iffy (my desk is black). But wow, I'm inspiring myself! I just need to be careful to appreciate my creations from an experience standpoint if I want them to be enjoyable for others, not just the effort required to make them or the technology that makes them possible.

## Daunted, not down

I feel exceptionally empowered by these successes. I'm not going to reveal too much about this experience, but I am thrilled to share the technical details about making it happen.

I'm going to keep the main scene pretty enclosed since the art is not going to be my strong point, but I am constantly thinking about interactions, mechanics, and story. It's terrifying to go through this process. I am only just now grasping the full range of skills and work needed to make a complete experience, and, uh, hmm, so... uh...    uhhhhhh....

No, I'm not quitting. It's more than I initially estimated, but I'm in this for the ends, and there are no means that are beneath me. I will do whatever it takes, but I'm going to be smart about it, of course. Thankfully there's the Unity Asset Store, a variety of 3D design software (with educational licenses ;)) and plenty of online resources. I also have wonderful friends with more capability to realize an artistic vision than I.

This experience was spawned from starting this one arcade-style idea I had, and realizing that the first game that I had crazy ideas for, well before the arcade-style game, was the one I really wanted to make. Lots of cool mechanics, a world, enemy factions with infighting, interlocking player attribute systems, a skill tree, and crazy, unbelievable art. **I do not have the ability to do justice to this vision.** So, I can make something with the same tone and atmosphere to build up my skills while basking in the same phantasmagoric headspace as that pseudo dream game until I can *really* blow people away.

I feel a little ridiculous and perhaps misguided in making what I really want to make instead of something that might sell or that people will play. Then again, I'm not sure I could get very far in such a complex skill without passion, at least in the beginning. I know there are plenty of starry-eyed game devs out there, wanting to make the next roguelike or FPS or dungeon crawler, whatever it may be, but I keep telling myself "VR is different" and maybe I could make something great right as VR blows up, or right before, or right after, or at all...

I want to do something cool! I have ideas! It will take a *lot* to kill my drive. I'll keep updating this feed with more about this experience and any others I make or explore.

Cheers!
