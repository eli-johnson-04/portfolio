**TL;DR: Activation events are at the core of VR experiences, so it was a joy to properly learn how they work here in Exercise 7! I did some cool stuff in here, even including a Beat Saber video of mine from Covid lockdown!**

# Back at it...

School has been bad. Hard. Brutal. My schedule sucks.

Let's do more VR!

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

> Update - I saved my changes last night and pushed to the repo... I had a merge conflict and chose the wrong option. Moved a bunch of stuff around in ways that don't make sense LOL. I was extremely frustrated but fortunately it was easy to fix! Yay!

Onward!

### Grabbable Remote Control

> I just noticed that my in-world room only has the walls rendered on one side and I took a moment to ascertain why - it's definitely for performance or optimization. It would make a lot of sense that the only meaningful space in this scene is the inside of the room and that the player never needs to leave, so for editing and debugging purposes it is quite sensible to only render one side of the walls! Cool!

![Invisible Walls](/images/activity/10-26-2025/invisible-walls.webp)

Let's add a remote to the world, give it a Rigidbody with Continuous Dynamic collision detection, and add an XR Grab Interactable to it. Cool. Now we make an attach transform and set it up so that the remote feels held naturally. Perfect.

![Hello Remote](/images/activity/10-26-2025/hello-remote.webp)
###### Hello remote!

### Add Sound to the Remote

Now let's add an AudioSource to the remote, cranking its Spatial Blend all the way to 3D, and give it an audio clip to play.

To make it play when the remote is picked up via the Grab Interactable, we scroll to the bottom at the Interactable Events fold-out and locate the Activated event, then add a new action, drag the Remote GameObject into the slot, and click Play Quick Sound->`Play()`. Cool! Now, when the remote is activated, it plays a sound!

Also, we can add a Unity-provided `ChangeMaterial` script that swaps the material at will (to a red glow in our case), and have the Grab Interactable toggle it when activated/deactivated. Cool!

![Interaction Events](/images/activity/10-26-2025/interaction-events.webp)

We'll see if I'm able to demo this sound in the video at the end... Quest Link hasn't worked with this editor for me yet so we will find out!

### Give the TV a Video

To give the TV audio that can be played, select the "Screen" child object of the TV and give it an Audio Source with 3D spatial audio. Then add a Video Player component, and set its material properly so that it can project video to tha material instead of the texture. Make sure the Material Property is set to _BaseMap instead of _MainTex.

Now add a Play Video component, ensuring it plays at start. Add a video from assets to the Video Clip slot (after adding a slot), and the setup should look like this, and automatically play the TV when the application is run:

![TV Playing](/images/activity/10-26-2025/tv-playing.webp)
###### Chopin's Nocturne No.2 was playing in the background when I took this screenshot LOL
###### I decided to use a Beat Saber recording of mine from years ago and happened to peak during it. 16 year-old me would be so flattered, and if you'd like to see the whole thing...

<iframe width="900" height="515" src="https://www.youtube.com/embed/SlMXiUQNhNU" title="METHAMPHETAMINE FIRST TRY COMPLETE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

###### Only missed 84 notes out of 2095? I became an animal at this game lowkey

### Make the Remote Turn on the TV

Let's uncheck the box to Play the Video at start. We want the remote to turn the TV on! It's easy too - go to the Remote's XR Grab Interactable, add an Activated event, drag in the Screen GameObject, and select `PlayVideo.TogglePlayPause`. Splendid. Now it alternates!

### Part 2 Extensions

#### Make a phone that plays video when you press the trigger \[Easy\]

I unfortunately do not have time for this one, but it's super straightforward. Basically the same setup as the TV and the Remote, just without the middleman. Put an Audio Source on the phone screen, add a Video Player and a Play Video component, an XR Grab Interactable, and give the Grab Interactable an Activation event that toggles the video. If I wanted to make it cycle through multiple videos, I could add multiple videos to the list in the Play Video component's Video Clips list, and change the Activation event to use `Play Video.NextClip` instead.

#### Add a functioning flashlight \[Medium\]

To do this one, I would create a flashlight first, then add a child SpotLight object to it, and use an Activation event on an XR Grab Interactable to call the `ToggleLight.Flip` function to turn the light source on/off.

#### Add a functional lighter and candle that can be lit with it \[Difficult\]

I've actually done something very similar to this before! Check out my post *Designing My Inaugural VR Experience* to see some cool stuff I've done with candles and lighting using hand tracking!

#### Add a dart gun or stapler projectile \[Expert\]

To do this, I would first add XR Grab Interactables to a dart gun and a stapler. Then I would use the provided LaunchProjectile script and a prefab of the dart and staple respectively. To make this work, I'll have the Grab Interactables use an Activation Event to call `LaunchProjectile.Fire` and make them launch their projectiles!

#### Add a functioning polaroid camera \[Expert\]\[Requires Programming\]

I'm actually considering doing something very similar for my term project in this class, so we'll see what happens. However, for this exercise, I would use my knowledge from making the magnifying glass in the last post to create a working viewfinder. Then I would use an Activation Event and some custom scripting to spawn a Polaroid-style prefab with a capture of the viewfinder's texture and have it drop out the bottom of the camera. I wish I had time to do this one now, but I have so many other things to do!

## Demo

And with all that, here's the demo!

<iframe width="1337" height="752" src="https://www.youtube.com/embed/8eoyzSKMhZQ" title="CIS4930 - Introduction to VR | Exercise 7 - (Haptics, Sound, Activation Events| Elijah Johnson" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
