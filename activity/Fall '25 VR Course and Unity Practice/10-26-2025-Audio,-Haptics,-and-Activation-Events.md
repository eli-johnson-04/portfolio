**TL;DR: Exercise 7 **

# Back at it...

School has been bad. Hard. Brutal. My schedule sucks.

Let's do more VR!

> My music taste has... expanded.... lately. Anyway Bolt Thrower were awesome this riff is so crazy

<iframe width="1177" height="741" src="https://www.youtube.com/embed/iBYhcqG-NwA" title="Salvo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Part 1: Sounds and Vibrations

Unfortunately, these tutorials operate in an old version of the editor and I cannot use it with link. It makes me sad. They also have an outdated version of the XR Interaction Toolkit, so they don't directly transfer to newer versions. Nonetheless, I'm learning!

### Basic Controller Haptics

We begin by adding haptic events to the controllers. Select them both and enable haptic events for On Select Entered and On Hover Entered, so that hovering an object will produce a subtle vibration in the controller doing the hovering, and so that selecting an object (usually picking it up) will produce a slightly stronger one.

![Basic Haptics](/images/activity/10-26-2025/basic-haptics.webp)

### UI Audio

Now we choose a simple UI audio sound and add it to the Audio Events->On Select/Hover Entered references on the controllers in the XR Ray Interactor components! Now, when the user hovers on something it will make a dull sound, and when they select something it will make a slightly less dull sound.

![Basic Audio](/images/activity/10-26-2025/basic-audio.webp)
###### dude don't they sound awesome

In newer versions of the XRI Toolkit, individual objects can have their own sound effects for when they get picked up, using the affordance system. I won't go into that here, but you can check it out in one of my other topics under *Learning VR Design and Development*->*First 'Game' Complete!*

### 3D Spatial Immersive Fireplace Audio in Scene for Super Immersion

Here, we add an Audio Source component to the particle GameObject that's a child of the fireplace. Drag in the desired crackling fire loop, enable Play On Awake and Loop, adjust the volume and crank up the Spatial Blend, and we're golden! Mess around with the min and max distances to get the volume levels right depending on the user's location relative to the fireplace, and it's starting to get super immersive.

![Fireplace 3D Audio](/images/activity/10-26-2025/fireplace-3d-audio.webp)
###### Chestnuts roasting... on an open fire.... jack frost nipping.... at your nose.......
###### i miss christmas music i miss u nat king cole

### Audio Reverb Zone!

This is the first thing in a while I didn't previously know about! To give the room some reverb and make sounds bounce around (somewhat) realistically, we add a new GameObject as a child of the room and make it an Audio->Audio Reverb Zone. Adjust the distances so the min distance is slightly wider than the room and the max is big enough, change the preset to be a living room, and voilà!

![Audio Reverb Zone](/images/activity/10-26-2025/audio-reverb-zone.webp)
###### Just you wait for the demo.

### Part 1 Extensions

I added a tiny script to make this record spin:

![Spinny Record Script](/images/activity/10-26-2025/spinny-record-script.webp)

![Spinny Record](/images/activity/10-26-2025/spinny-record.gif)
###### Just look reallllly close I promise it's spinning

And I also added an audio source to the speaker prefabs!

![Working Speakers](/images/activity/10-26-2025/working-speakers.webp)
###### CHOPIN NOCTURNE NO.2 WOOO

There was a third extension activity to make it so that the volume of a sound played when a ball hits the ground is dependent upon the magnitude of its velocity - while this is definitely attainable for me I am currently in the library at 10:00 PM on the dot and I haven't been able to get this editor to work over Quest Link anyway :D

## Part 2: Activation Events

Now we get to learn how to make interactions actually do things! Meaningful things! I've kind of learned this before with Unity Timeline and similar features e.g. callbacks, but we'll see what the Unity tutorial has in store.
