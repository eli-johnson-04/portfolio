**TL;DR: wow this process is slow wow this process is hard wow this process is fun wow I'm losing my mind!!! Starting this topic for my first original game and any other little adventures I explore!**

# Yikes &#128128;

I've got eight years of VR experience under my belt, so I'm not out of my depth or jumping into aphotic waters where I can't see because the light doesn't penetrate that deep.

...

However this learning experience is by no means a quick one. Determining which step to take next is hard, since I don't have a lot under my belt just yet nor do I know what I'm capable of. In spite of that I developed a cool hand-tracking gesture that detects an open forward-facing palm and activates a custom Hover Cast Interactor, which surprisingly only took a few hours! I tweaked the hover effects of my Hoverable component the next day with a state machine and an AnimationCurve for seamless transitions, and I feel so, so accomplished. I did something meaningful and created a rich interaction that makes a game *feel good* :D

<!-- add editor+game view gif of hover cast interactor -->

You won't ***believe*** the ideas I have planned for this game. I'm creating a cosmology, some extreme self-body horror mechanics, I'm gonna make lots more gestures, and I'm trying to keep the core mechanics relatively contained so I can use a simplistic story system that adds to the atmosphere.

## Not *all* bad

I also spent most of a day working on a super cool (albeit simple) circle-casting mechanic that has the player perform hand gestures to spawn four cardinal artifacts (I'll get into these shortly), and when placed in the correct zone, all the candles will turn on. I added some delay between the flames and the smoke, as well as a delay between each candle so the lighting pattern "sweeps" across them. I worked backwards from the candles, up to the artifacts, and then to the VR integration.

### Candles
The candles went better than I thought! I found some candles in the asset store, which also came with flame and smoke shaders. Perfect. I placed them on the altar and spent some time figuring out how to manage candle state in the context of all the candles, and ultimately ended up with a GameObject containing all the candles that has a component called Candle Manager. This Candle Manager controls the collective state of the candles by managing a list of Candle component references, each of which manage the Lit state of their own flame shader, smoke shader, point light, and audio source.

<!-- insert images of CandleManager and Candle Components -->

I gave the Candle an interface for turning it on, which has a delay between the flame and the smoke shaders, and the Candle Manager has its own interface for running through its list to activate or deactivate all the Candles it has references to. I tested it, got the timing nice, and it's quite compelling!

<!-- insert gif of candles flipping on -->

### Cardinal Surface and Artifacts

The Cardinal Surface is a sort of sheet/plate that sits atop the altar, with four zones that each correspond to a Cardinal Artifact with a specified direction/element, per Wiccan tradition:

- North: Earth
- East: Air
- South: Fire
- West: Water

Each Cardinal Artifact just has a single property, a selection from an enumeration of the four Cardinal Directions. However, a Cardinal Artifact requires an XR Grab Interactable and makes one automatically when the Cardinal Artifact is added, so the artifact can be picked up by the user :p

This is because each Cardinal Artifact is to be used with a Cardinal Artifact Socket, an extension of an XR Socket Interactor that includes a Cardinal Direction property from the same enum, and only allows an object to be selected and snap into place if it matches the chosen direction. Four artifacts, four sockets, one surface. The Cardinal Surface keeps a reference to each Socket, and talks to the Candle Manager when all four sockets are selecting an object, which we have now established only happens when they match the correct direction.

I'll show you the final product in juuuuust a moment :)

### The gestures, ugh, the gestures

A **hand shape** is defined by any combination of fingers for any/all of the following, per finger:

- Full Curl: the curl of the entire finger, like when you make a fist
- Base Curl: the curl of the base of the finger, like your thumb when you hold up the number 4
- Tip Curl: the curl of the tip of the finger, the last section of a given finger
- Pinch: how close this finger's tip is to touching the tip of the thumb
- Spread: the lateral position of a finger in the plane of your palm, like when you splay your fingers flat on a table as far apart as you can

[Finger Shapes Documentation](https://docs.unity3d.com/Packages/com.unity.xr.hands@1.5/manual/gestures/finger-shapes.html)

A **hand pose** (synonymous with gesture) is a hand shape + an orientation, with a few orientation setups that are a bit harder to explain, but are listed [here](https://docs.unity3d.com/Packages/com.unity.xr.hands@1.5/manual/gestures/hand-orientation.html). It requires setting a hand axis, alignment condition, reference direction, angle tolerance, and optional exclusion of the hand's Y position, with the orientation able to be measured by any number of user-based or world-based reference frames.

This all boils down to frustration. Fortunately XR Hands provides a gesture debugger to determine and set precise shape parameters and thresholds, as well as for testing pose detection. The North and East gestures initially worked far better than South and West, but I chose characteristically unique shapes for these that took quite a while to determine thresholds for. The shapes were detected reliably, but the poses took more effort.

> As an aside, I **could** describe these poses to the player (since gestures will be important to gameplay and these four are not *cough* exceptionally *cough* complex), **or** I could find a way to reliably generate icons of hand poses, which would be better. I have no idea how to do this and spent some time trying to find a tool, but I might have to do something hacky and just make it work. I don't know :)

I updated the Cardinal Surface script to have trackers for current left/right hand direction (cardinal) and state (correct/incorrect), and to use this information to spawn the artifacts. When all four artifacts are in place, it updates the state of the Surface (occupied: all artifacts in place, complete: candles turned on, incomplete: artifacts missing). The Cardinal Surface *might* be managing a few too many things, but it works for now. The Static Gesture Detectors interface with it to provide a stream of information about hand state, and it works! It feels like actual magic. I can't believe this, and my friends were floored too!! Look!

<!-- insert gif of spawning all four artifacts and turning on the candles -->

## Daunted, not down

I feel exceptionally empowered by these successes. I'm not going to reveal too much about the game, but I am thrilled to share the technical details about making it happen.

This has been terrifying. I am going to keep the main scene pretty enclosed, since the art is not going to be my strong point, but I am constantly thinking about interactions, mechanics, and story. I am only just now grasping the full range of skills and work needed to make a complete experience, and, uh, hmm, so... uh...      uhhhhhh....

No, I'm not quitting. It's more than I initially estimated, but I'm in this for the ends, and there are no means that are beneath me. I will do whatever it takes, but I'm going to be smart about it, of course. Thankfully there's the Unity Asset Store, a variety of 3D design softwares (with educational licenses ;)) and plenty of online resources. I also have wonderful friends with more capability to realize an artistic vision than I.

This game in particular was the result of starting one game, and realizing that the first game that I had crazy ideas for was the one I really wanted to make. Lots of cool mechanics, a world, enemy factions and interlocking systems, a skill tree, and crazy, unbelievable art. **I do not have the ability to do this vision justice.** So, I can make something with the same tone and atmosphere to build up my skills while basking in the same headspace as that pseudo dream game.

I feel a little ridiculous and perhaps misguided in making what I really want to make instead of something that might sell or that people will play, but I'm not sure I could get very far in such a complex skill without passion, at least in the beginning. I know there are plenty of starry-eyed game devs out there, wanting to make the next roguelike or FPS or dungeon crawler, whatever it may be, but "VR is different" I keep telling myself, and maybe I could make something great right as it blows up, or right before, or right after, or at all...

I wanna do something cool! I have ideas! It will take a *lot* to kill my drive. I'll keep updating this feed with more about this game and any other ones I make.

Cheers!
